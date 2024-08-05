import React, { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import styles from "./StatisticInfo.module.css";

export default function StatisticInfo() {
    const [counterOn, setCounterOn] = useState(false);

    return (
        <ScrollTrigger
            onEnter={() => { setCounterOn(true); }}
            onExit={() => { setCounterOn(false); }}
        >
            <div className={styles.statInfoSection}>
                <div className={styles.statCard}>
                    <div className={styles.counter}>
                        {counterOn && <CountUp start={0} end={100} delay={0} duration={4} />}+
                    </div>
                    <div className={styles.cardDescription}>Blogs published on the website for Aspirants</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.counter}>
                        {counterOn && <CountUp start={0} end={215} delay={0} duration={1} />}+
                    </div>
                    <div className={styles.cardDescription}>Aspirants visited our Website till now</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.counter}>
                        {counterOn && <CountUp start={0} end={56} delay={0} duration={1} />}+
                    </div>
                    <div className={styles.cardDescription}>Aspirants subscribed to our NewsLetter</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.counter}>
                        {counterOn && <CountUp start={0} end={400} delay={0} duration={1} />}+
                    </div>
                    <div className={styles.cardDescription}>Downloadable Materials downloaded by Aspirants</div>
                </div>
            </div>
        </ScrollTrigger >
    );
}