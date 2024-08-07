"use client";
import { useEffect } from "react";
import styles from "./../../styles/Feedback.module.css"
import FeedbackForm from "./FeedbackForm";

function Feedback({ relatedBlogId }) {
    useEffect(() => {
        if (relatedBlogId === undefined)
            document.title = "Feedback | EducationForJobs";
    })
    return (
        <div className={styles.feedbackForm}>
            <FeedbackForm relatedBlogId={relatedBlogId} />
        </div>
    )
}

export default Feedback;