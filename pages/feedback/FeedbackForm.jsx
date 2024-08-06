"use client";
import { useState } from "react";
import styles from "./../../styles/Feedback.module.css"
import app from "./../../components/firebaseConfig/RealtimeDBConfig";
import { getDatabase, push, ref, set } from "firebase/database";

function FeedbackForm({ relatedBlogId }) {
    const [formData, setFormData] = useState({
        comment: "",
        username: "",
        email: "",
        relatedBlogId: "NA"
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        relatedBlogId && (formData.relatedBlogId = relatedBlogId);
        try {
            const db = getDatabase(app);
            const newDocumentRef = push(ref(db, 'feedback/'));
            set(newDocumentRef, formData)
                .then(() => {
                    alert("Feedback submitted successfully");
                    window.location.reload();
                })
                .catch(() => {
                    alert("error", error.message);
                    window.location.reload();
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.heading}>Leave a Comment</div>
            <div>
                <label htmlFor="name">Full Name</label><br />
                <input name="username" placeholder="Full Name *" onChange={(e) => handleChange(e)} type="text" id="name" required />
            </div>
            <div>
                <label htmlFor="email">Email</label><br />
                <input name="email" placeholder="example@domain.com *" onChange={(e) => handleChange(e)} type="email" id="email" required />
            </div>
            <div>
                <label htmlFor="comment">Comment</label><br />
                <textarea placeholder="Type your message *" name="comment" onChange={(e) => handleChange(e)} id="comment" rows="6" cols="70" />
            </div>
            <div>
                <button className={styles.submitButton}>Submit Comment</button>
            </div>
        </form>
    )
}

export default FeedbackForm;