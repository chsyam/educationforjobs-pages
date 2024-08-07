"use client"
import styles from "@/styles/createPost.module.css"
import { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import { TagsInput } from "react-tag-input-component";
import { getDownloadURL, uploadBytesResumable, ref as storageRef } from "firebase/storage";
import { realtimeDB, storage } from "@/components/firebaseConfig/FirebaseConfig";
import { push, set, ref as dbRef } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false
});

function AddPost() {
    const editor = useRef(null);
    const [publishing, setPublishing] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [tags, setTags] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const editorData = useRef("");
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        content: "",
        videoUrl: "",
        resourceUrl: "",
        tagsList: "",
        postedAt: ""
    })



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const config = {
        readonly: false,
        height: 250,
        toolbarSticky: false,
        uploader: {
            insertImageAsBase64URI: true
        },
        toolbarButtonSize: 'middle',
    };

    const handleFileUpload = () => {
        if (!file) return;
        const fileRef = storageRef(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Error uploading file:", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setFormData({
                        ...formData,
                        "resourceUrl": url
                    })
                });
            }
        );
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (uploadProgress < 100) {
            setErrorMessage("Please wait for the file to upload");
            return;
        }
        function generateUniqueId() {
            return uuidv4();
        }
        formData.id = generateUniqueId();
        const getISTtimeStamp = () => {
            let now = new Date();
            let time = now.getTime();
            let offset = now.getTimezoneOffset() * 60000;
            let istOffset = 5.5 * 60 * 60 * 1000;
            let istTime = new Date(time + offset + istOffset);
            return istTime.toISOString();
        };

        const postedAt = getISTtimeStamp();
        formData.postedAt = postedAt;

        setPublishing(true);
        console.log(formData);
        try {
            const newDocumentRef = push(dbRef(realtimeDB, 'blogs/'));
            set(newDocumentRef, formData)
                .then(() => {
                    console.log("Document written successfully");
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Error writing document: ", error, "Please try again later");
                });
        } catch (error) {
            console.log(error);
        }
        setPublishing(false);
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleBlur = newContent => {
        setFormData({ ...formData, content: newContent });
    };

    const handlePreview = () => {
        console.log(editorData.current);
        setFormData({ ...formData, content: editorData.current });
    }

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            tagsList: tags.join("#")
        }));
    }, [tags]);

    return (
        <div className={styles.addPost}> {
            publishing ? (
                <div style={{ textAlign: "center", marginTop: "20%", fontFamily: "Poppins", fontWeight: "600" }}>
                    Publishing your Content
                </div>
            ) : (
                <form className={styles.form}
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <div className={styles.heading}>Publish a Post</div>
                    <div className={styles.divSection}>
                        <div className={styles.label}>Blog Title (required)</div>
                        <textarea rows={3} name="title" onChange={(e) => handleChange(e)} type="text" id="title" required />
                    </div>
                    <div className={styles.divSection}>
                        <div className={styles.label}>Blog Content (required)</div>
                        <JoditEditor
                            ref={editor}
                            value={formData.content}
                            config={config}
                            tabIndex={1}
                            onBlur={handleBlur}
                            onChange={(newContent) => { editorData.current = newContent }}
                        />
                        <div className={styles.divSection}>
                            <div onClick={() => { handlePreview }} className={`${styles.label} ${styles.previewButton}`}>Click here for Refresh</div>
                            <div className={styles.preview}>
                                <div className={styles.previewContent} dangerouslySetInnerHTML={{ __html: formData.content }}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.divSection}>
                        <div className={styles.label}>Video ID ({`Optional`})</div>
                        <input name="videoUrl" onChange={(e) => handleChange(e)} type="text" id="videoUrl" />
                    </div>
                    <div className={styles.fileUpload}>
                        <div className={styles.label}>Material ({`Optional`}) </div>
                        <div className={styles.fileContent}>
                            <div className={styles.inputFile}>
                                <input
                                    id="resourceUrl"
                                    type="file"
                                    onChange={(event) => handleFileChange(event)}
                                />
                            </div>
                            {
                                (uploadProgress > 0 && uploadProgress < 100) && (
                                    <div className={styles.uploadStatus}>
                                        <div>{`0%`}</div>
                                        <div><progress value={uploadProgress} max="100" /></div>
                                        <div>{`${uploadProgress}%`}</div>
                                    </div>
                                )
                            }
                            {
                                (uploadProgress === 100) && (
                                    <div style={{ color: "green", fontWeight: "500" }}>
                                        File Uploaded Successfully
                                    </div>
                                )
                            }
                            <div className={styles.uploadButton} onClick={() => handleFileUpload()}>
                                Upload
                            </div>
                        </div>
                    </div>
                    <div className={styles.divSection}>
                        <div className={styles.label}>Tags</div>
                        <TagsInput
                            value={tags}
                            onChange={setTags}
                            name="tags"
                            placeHolder="Enter tags here..."
                        />
                    </div>
                    {
                        (tags.length >= 1 && (tags.length < 3 || tags.length > 5)) && (
                            <div style={{ color: "red" }}>Number of Tags should be {`< 5`} and {`> 3`}</div>
                        )
                    }
                    {uploadProgress < 100 && (
                        <div style={{ color: "red" }}>{errorMessage}</div>
                    )}
                    <div className={styles.divSection}>
                        <button className={styles.submitButton}>
                            Publish Blog
                        </button>
                    </div>
                </form>
            )
        }
        </div>
    );
}

export default AddPost;