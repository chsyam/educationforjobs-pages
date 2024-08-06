import styles from "@/styles/Blogs.module.css";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";
import { realtimeDB } from "@/components/firebaseConfig/FirebaseConfig";
import { get, ref } from "firebase/database";

export default function Blogs({ blogsList }) {
    const [blogsData, setBlogsData] = useState([]);
    const [blogsFound, setBlogsFound] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function fetchData() {
            console.log("res", blogsList);
            setLoading(false);
            if (blogsList) {
                setBlogsData(blogsList);
            }
            else if (blogsList?.length == 0) {
                setBlogsFound(false);
            } else {
                setBlogsFound(false);
            }
        }
        document.title = "Blogs | EducationForJobs";
        fetchData();
    }, [blogsList])

    return (
        <div className={styles.blogContent}>
            {
                blogsFound ? (
                    loading ? (
                        <div style={{ textAlign: "center", marginTop: "20%", fontFamily: "Poppins", fontWeight: "600" }}>
                            Loading....
                        </div>
                    ) : (
                        blogsData?.map((blog, index) =>
                            <BlogCard key={index} blog={blog} />
                        )
                    )
                ) : (
                    <div style={{ textAlign: "center", marginTop: "20%", fontFamily: "Poppins", fontWeight: "600" }}>
                        No blogs found
                    </div>
                )
            }
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const blogRef = ref(realtimeDB, "blogs");
        const snapshot = await get(blogRef);
        if (snapshot.exists()) {
            console.log("res", Object.values(snapshot.val()));
            return {
                props: {
                    blogsList: Object.values(snapshot.val())
                }
            }
        } else {
            console.log("Error fetching data (or) No data available");
        }
        return {
            props: {
                blogsList: []
            }
        }
    } catch (error) {
        console.log("Error fetching data (or) No data available");
        return {
            props: {
                blogsList: []
            }
        }
    }
}