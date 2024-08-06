import { IoMdTime } from "react-icons/io";
import styles from "./RecentBlogs.module.css"

export default function RecentBlogs({ blogs }) {
    const printFullDate = (date) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var date = new Date(date);
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }

    const backgoundGradient = [{
        background: "#FE964C",
        background: "-webkit-linear-gradient(to bottom, #FE964C, #EBC9C0)",
        background: "linear-gradient(to bottom, #FE964C, #EBC9C0)",
    }, {
        background: "#F0E2F0",
        background: "-webkit-linear-gradient(to bottom, #F0E2F0, #289B3C)",
        background: "linear-gradient(to bottom, #F0E2F0, #289B3C)",
    }, {
        background: "#AFC4F6",
        background: "-webkit-linear-gradient(to bottom, #a0baf8, #ffa694)",
        background: "linear-gradient(to bottom, #a0baf8, #ffa694)",
    }, {
        background: "#F4E68A",
        background: "-webkit-linear-gradient(to bottom, #F4E68A, #24AE99)",
        background: "linear-gradient(to bottom, #F4E68A, #24AE99)",
    }]

    return (
        <div className={styles.recentBlogSection}>
            <div className={styles.sectionHead}>All the Latest</div>
            <div className={styles.cardSection}>
                {
                    blogs.map((post, index) => (
                        <div
                            style={backgoundGradient[index % blogs?.length]}
                            key={index}
                            className={styles.card}
                            onClick={() => window.open(`/blogs/${post.id}`, "_blank")}
                        >
                            <div className={styles.title}>{post.title}</div>
                            <div>
                                <div className={styles.date}>
                                    <div className={styles.timeIcon}><IoMdTime /></div>
                                    <div>{printFullDate(post?.postedAt)}</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}