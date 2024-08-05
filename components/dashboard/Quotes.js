import styles from "./../../styles/index.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y, Autoplay } from 'swiper/modules';
import SwiperNavButtons from "@/components/SwiperNavButtons";
import { useState } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Quotes() {
    const [activeSlide, setActiveSlide] = useState(1);

    return (
        <div className={styles.bodySection}>
            <div className={styles.sectionHead}>
                Quotes on Education
            </div>
            <div className={styles.sliderSection}>
                <Swiper
                    modules={[Scrollbar, A11y, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={3}
                    onSlideChange={(swiper) => {
                        setActiveSlide(swiper.activeIndex + 1);
                    }}
                    breakpoints={
                        {
                            0: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }
                    }
                >
                    <SwiperSlide>
                        <div className={styles.cardItem}>
                            <div className={styles.quoteText}>
                                {"\"Education is the most powerful weapon which you can use to change the world.\""}
                            </div>
                            <div className={styles.quoteAuthour}>— Nelson Mandela</div>
                        </div>
                    </SwiperSlide>
                    {/* <SwiperSlide>
                        <div className={styles.cardItem}>
                            <div className={styles.quoteText}>
                                {"\"The roots of education are bitter, but the fruit is sweet.\""}
                            </div>
                            <div className={styles.quoteAuthour}>—Aristotle</div>
                        </div>
                    </SwiperSlide> */}
                    <SwiperSlide>
                        <div className={styles.cardItem}>
                            <div className={styles.quoteText}>
                                {"\"The only limit to our realization of tomorrow is our doubts of today.\""}
                            </div>
                            <div className={styles.quoteAuthour}>— Franklin D. Roosevelt</div>
                        </div>
                    </SwiperSlide>
                    {/* <SwiperSlide>
                        <div className={styles.cardItem}>
                            <div className={styles.quoteText}>
                                {"\"Learning is not a spectator sport.\""}
                            </div>
                            <div className={styles.quoteAuthour}>—D. Blocher</div>
                        </div>
                    </SwiperSlide> */}
                    {/* <SwiperSlide>
                        <div className={styles.cardItem}>
                            <div className={styles.quoteText}>
                                {"\"Education is the key to unlock the golden door of freedom.\""}
                            </div>
                            <div className={styles.quoteAuthour}>—George Washington Carver</div>
                        </div>
                    </SwiperSlide> */}
                    {/* <SwiperSlide>
                        <div className={styles.cardItem}>
                            <div className={styles.quoteText}>
                                {"\"The beautiful thing about learning is that nobody can take it away from you.\""}
                            </div>
                            <div className={styles.quoteAuthour}>—B.B. King</div>
                        </div>
                    </SwiperSlide> */}
                    <SwiperSlide>
                        <div className={styles.cardItem}>
                            <div className={styles.quoteText}>
                                {"\"In the end, we will remember not the words of our enemies, but the silence of our friends.\""}
                            </div>
                            <div className={styles.quoteAuthour}>— Martin Luther King Jr.</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={styles.cardItem}>
                            <div className={styles.quoteText}>
                                {"\"Education is the passport to the future, for tomorrow belongs to those who prepare for it today.\""}
                            </div>
                            <div className={styles.quoteAuthour}>— Malcolm X</div>
                        </div>
                    </SwiperSlide>
                    <div>
                        <SwiperNavButtons activeSlide={activeSlide} totalSlides={4} />
                    </div>
                </Swiper>
            </div>
        </div>
    );
}

export default Quotes;