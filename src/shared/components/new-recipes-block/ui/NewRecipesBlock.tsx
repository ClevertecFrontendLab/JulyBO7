import 'swiper/scss';

import { Box, Button, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Recipe, useGetRecipesQuery } from '~/entities/recipe';
import ArrowLeftIcon from '~/shared/assets/icons/components/ArrowLeft';
import ArrowRightIcon from '~/shared/assets/icons/components/ArrowRight';
import { VerticalCard } from '~/shared/components/card/ui/vertical-card/VerticalCard';
import { CAROUSEL, CAROUSEL_BACK, CAROUSEL_CARD, CAROUSEL_FORWARD } from '~/shared/constants/tests';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { Category, SubCategory } from '~/shared/types/categories';

import { useSlider } from '../model/useSlider';

type NewRecipesBlockProps = {
    categories: Category[];
};
export const NewRecipesBlock: FC<NewRecipesBlockProps> = ({ categories }) => {
    const { handleNext, handlePrev, handleSwiperInit, breakpoints } = useSlider();
    const navigate = useNavigate();

    const { data: newRecipes } = useGetRecipesQuery({
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
    });

    const newRecipeCards = newRecipes?.data.map((recipe: Recipe, idx: number) => {
        const subcategory = categories.find(
            (category) => category._id === recipe.categoriesIds[0],
        )!;
        const category = categories.find(
            (category) => category._id === subcategory.rootCategoryId,
        )!;
        const handleCard = getRecipeCardHandler(
            recipe,
            navigate,
            category,
            subcategory as SubCategory,
        );

        return (
            <SwiperSlide
                data-test-id={`${CAROUSEL_CARD}-${idx}`}
                key={idx}
                style={{ flexShrink: 1 }}
            >
                <VerticalCard recipe={recipe} onClick={handleCard} />
            </SwiperSlide>
        );
    });

    return (
        <Box w='100%' position={{ base: 'static', lg: 'relative' }}>
            <Heading
                variant={{ base: 's', lg: 'lm', '2xl': 'xl' }}
                mb={{ base: '12px', lg: '24px' }}
            >
                Новые рецепты
            </Heading>
            <Swiper
                data-test-id={CAROUSEL}
                speed={200}
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
                data-test-id={CAROUSEL_BACK}
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
                data-test-id={CAROUSEL_FORWARD}
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
