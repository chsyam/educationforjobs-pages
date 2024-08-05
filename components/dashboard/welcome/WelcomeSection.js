import ShareLinks from "../socialMedia/socialMedia";
import styles from "./WelcomeSection.module.css";

export default function WelcomeSection() {
    return (
        <div className={styles.welcomeSection}>
            <div className={styles.sectionHead}>
                Welcome to <br /><span style={{ fontSize: "35px" }}>EducationforJobs</span>
            </div>
            <div className={styles.paragraph}>
                {"We are thrilled to have you here at Education for Jobs, your one-stop destination for career advancement and professional growth. Whether you're a recent graduate, a seasoned professional, or someone looking to make a career change, our platform is designed to support you on your journey towards achieving your career goals."}
            </div>
            <div>
                <ShareLinks />
            </div>
        </div>
    );
}