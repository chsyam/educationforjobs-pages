import styles from "@/styles/Blogs.module.css";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";
import { getAllBlogs } from "../api/blogs/getAllBlogs";

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
    const blogsList = await getAllBlogs();

    return {
        props: {
            blogsList
        }
    }
}