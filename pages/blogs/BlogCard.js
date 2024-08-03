import Image from "next/image";
import styles from "./../../styles/Blogs.module.css"
import BlogImage from "./../../components/images/eduaction_future.jpeg"
import { IoMdTime } from "react-icons/io";
import { useRouter } from "next/router";

function BlogCard({ blog }) {
    const router = useRouter();

    const handleRoute = (id) => {
        router.push(`/blogs/${id}`, {
            pathname: `/blogs/${id}`,
        });
    }

    const printFullDate = (date) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var date = new Date(date);
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }

    return (
        <div className={styles.card} onClick={() => { handleRoute(blog?.id) }}>
            <div className={styles.logoImage}>
                <Image priority="high" className={styles.image} src={BlogImage} width="auto" height="auto" alt="Blog image" />
            </div>
            <div className={styles.cardFooter}>
                <div className={styles.title}>
                    <p>
                        {blog.title}
                    </p>
                </div>
                <div className={styles.content}>
                    <p>
                        <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
                    </p>
                </div>
                <div className={styles.date}>
                    <div className={styles.timeIcon}><IoMdTime /></div>
                    <div>{printFullDate(blog?.postedAt)}</div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard;