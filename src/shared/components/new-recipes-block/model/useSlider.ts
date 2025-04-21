import { useMemo, useRef } from 'react';
import { SwiperClass } from 'swiper/react';

export const useSlider = () => {
    const swiperRef = useRef<null | SwiperClass>(null);

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleSwiperInit = (swiper: SwiperClass) => {
        swiperRef.current = swiper;
    };

    const breakpoints = useMemo(
        () => ({
            350: {
                slidesPerView: 2,
                spaceBetween: 12,
                allowTouchMove: true,
            },

            760: {
                slidesPerView: 4,
                spaceBetween: 12,
                allowTouchMove: true,
                loopAdditionalSlides: 3,
            },

            1440: {
                slidesPerView: 3,
                spaceBetween: 12,
                allowTouchMove: false,
                loopAdditionalSlides: 2,
            },
            1900: {
                slidesPerView: 4,
                spaceBetween: 24,
                allowTouchMove: false,
            },
        }),
        [],
    );
    return {
        handleNext,
        handlePrev,
        handleSwiperInit,
        breakpoints,
    };
};
