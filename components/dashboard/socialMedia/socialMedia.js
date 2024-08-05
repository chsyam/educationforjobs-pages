import Gmail from "@/components/icons/Gmail";
import Instagram from "@/components/icons/Instagram";
import Telegram from "@/components/icons/Telegram";
import Youtube from "@/components/icons/Youtube";
import styles from "./socialMedia.module.css";

export default function ShareLinks() {
    const socialMediaLinks = {
        instagram: "https://www.instagram.com/education_with_entertainment7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        telegram: "https://t.me/educationforjobs",
        youtube: "https://youtube.com/@educationwithentertainment7?si=AA5ToaQ007TLIJl_"
    };
    return (
        <div className={styles.socialMediaSection}>
            <div className={styles.shareText}>follow us at</div>
            <div className={styles.icons}>
                <div
                    onClick={() => window.open(socialMediaLinks.instagram, "_blank")}
                >
                    <Instagram />
                </div>
                <div
                    onClick={() => window.open(socialMediaLinks.telegram, "_blank")}
                ><Telegram /></div>
                <div
                ><Gmail /></div>
                <div
                    onClick={() => window.open(socialMediaLinks.youtube, "_blank")}
                ><Youtube /></div>
            </div>
        </div>
    );
}