import styles from "./../styles/index.module.css";
import { useSwiper } from "swiper/react";
import HorizontalLine from "./icons/HorizontalLine";
import RightArrowSvg from "./icons/RightArrow";
import LeftArrowSvg from "./../components/icons/BackwardArrow";

const SwiperNavButtons = ({ activeSlide, totalSlides }) => {
    const swiper = useSwiper();
    return (
        <div className={styles.swiperNavButtons}>
            <div className={styles.pageNumbers}>
                <div>{activeSlide}</div>
                <div><HorizontalLine /></div>
                <div>{totalSlides}</div>
            </div>
            <div className={styles.buttons}>
                <div className={styles.swiperButtonPrev} onClick={() => swiper.slidePrev()}>
                    {
                        activeSlide > 1 && (
                            <LeftArrowSvg />
                        )
                    }
                </div>
                <div className={styles.swiperButtonNext} onClick={() => swiper.slideNext()} >
                    {
                        activeSlide < totalSlides && (
                            <RightArrowSvg />
                        )
                    }
                </div>
            </div>
        </div >
    );
}

export default SwiperNavButtons;