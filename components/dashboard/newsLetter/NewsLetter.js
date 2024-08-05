import { useState } from "react";
import styles from "./newsLetter.module.css"

export default function NewsLetter() {
    const [newsLetterData, setNewsLetterData] = useState({
        fullName: "",
        email: ""
    })

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(newsLetterData);
    }

    return (
        <div className={styles.newsLetterSection}>
            <div className={styles.sectionHead}>Subscribe to EducationforJobs Newsletter</div>
            <div className={styles.sectionLabel}>
                Your source for industry leading video tips, tricks, and news delivered bi-weekly to your inbox.
            </div>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <div className={styles.formSection}>
                    <div>
                        <label htmlFor="name">Full Name <span style={{ color: "red" }}>*</span></label><br />
                        <input type="text" name="fullName"
                            value={newsLetterData.fullName}
                            onChange={(e) => setNewsLetterData({ ...newsLetterData, fullName: e.target.value })}
                            placeholder="Full Name" required
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Email <span style={{ color: "red" }}>*</span></label><br />
                        <input type="email" name="email"
                            value={newsLetterData.email}
                            onChange={(e) => setNewsLetterData({ ...newsLetterData, email: e.target.value })}
                            placeholder="Email" required
                        />
                    </div>
                </div>
                <div className={styles.formSubmit}>
                    <button>Subscribe</button>
                </div>
            </form>
        </div >
    );
}