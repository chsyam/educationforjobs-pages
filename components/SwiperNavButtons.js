import styles from "./../styles/index.module.css";
import { useSwiper } from "swiper/react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { GoHorizontalRule } from "react-icons/go";
import { IoArrowBackOutline } from "react-icons/io5";

const SwiperNavButtons = ({ activeSlide }) => {
    const swiper = useSwiper();
    return (
        <div className={styles.swiperNavButtons}>
            <div className={styles.pageNumbers}>
                {activeSlide}
                <div><GoHorizontalRule /></div>
                {"4"}
            </div>
            <div className={styles.buttons}>
                <div className={styles.swiperButtonPrev}>
                    {
                        activeSlide > 1 && (
                            <IoArrowBackOutline onClick={() => swiper.slidePrev()} />
                        )
                    }
                </div>
                <div className={styles.swiperButtonNext}>
                    {
                        activeSlide < 4 && (
                            <IoArrowForwardOutline onClick={() => swiper.slideNext()} />
                        )
                    }
                </div>
            </div>
        </div >
    );
}

export default SwiperNavButtons;