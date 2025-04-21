import 'swiper/scss';

import { Box, Button, Heading } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowLeftIcon from '~/shared/assets/icons/components/ArrowLeft';
import ArrowRightIcon from '~/shared/assets/icons/components/ArrowRight';
import { BadgeColor } from '~/shared/components/badge/ui/Badge';
import { VerticalCard } from '~/shared/components/card/ui/vertical-card/VerticalCard';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { Recipe } from '~/shared/types/recipe';

import { useSlider } from '../model/useSlider';

type NewRecipesBlockProps = {
    items: Recipe[];
};
export const NewRecipesBlock: FC<NewRecipesBlockProps> = ({ items }) => {
    const { handleNext, handlePrev, handleSwiperInit, breakpoints } = useSlider();
    const navigate = useNavigate();

    const newRecipeCards = useMemo(
        () =>
            items.map((data: Recipe, idx: number) => {
                const handleCard = getRecipeCardHandler(data, navigate);

                return (
                    <SwiperSlide key={idx} style={{ flexShrink: 1 }}>
                        <VerticalCard
                            id={data.id}
                            title={data.title}
                            category={data.category[0]}
                            text={data.description}
                            image={data.image}
                            bookmarkCount={data.bookmarks}
                            likesCount={data.likes}
                            badgeColor={BadgeColor.SECONDARY}
                            onClick={handleCard}
                        />
                    </SwiperSlide>
                );
            }),
        [items],
    );

    return (
        <Box w='100%' position={{ base: 'static', lg: 'relative' }}>
            <Heading
                variant={{ base: 's', lg: 'lm', '2xl': 'xl' }}
                mb={{ base: '12px', lg: '24px' }}
            >
                Новые рецепты
            </Heading>
            <Swiper
                onSwiper={handleSwiperInit}
                modules={[Navigation]}
                navigation
                loop
                loopAdditionalSlides={1}
                breakpoints={breakpoints}
            >
                {newRecipeCards}
            </Swiper>

            <Button
                display={{ base: 'none', lg: 'flex' }}
                alignItems='center'
                h={{ lg: '40px', '2xl': '48px' }}
                w={{ lg: '40px', '2xl': '48px' }}
                bg='primaryColor'
                position='absolute'
                zIndex={100}
                bottom={{ lg: '213px', '2xl': '219px' }}
                left='-8px'
                onClick={handlePrev}
            >
                <ArrowLeftIcon fill='lime.50' />
            </Button>
            <Button
                display={{ base: 'none', lg: 'flex' }}
                alignItems='center'
                h={{ lg: '40px', '2xl': '48px' }}
                w={{ lg: '40px', '2xl': '48px' }}
                bg='primaryColor'
                position='absolute'
                zIndex={100}
                bottom={{ lg: '213px', '2xl': '219px' }}
                right='-8px'
                onClick={handleNext}
            >
                <ArrowRightIcon fill='lime.50' />
            </Button>
        </Box>
    );
};
