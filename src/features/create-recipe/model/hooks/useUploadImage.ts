import { ChangeEvent, useRef, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { useUploadFileMutation } from '~/entities/recipe';
import { IMAGE_API } from '~/shared/constants/imageApi';

import { CreateNewRecipeFormData } from '../schemas/createNewRecipeFormSchema';

type UseUploadImage = {
    field: ControllerRenderProps<CreateNewRecipeFormData, 'steps'>;
    setIsOpenModal: (value: boolean) => void;
};
export const useUploadImage = (params: UseUploadImage) => {
    const { field, setIsOpenModal } = params;
    const [errorMessage, setErrorMessage] = useState<null | { title: string; text: string }>();
    const [imageSrc, setImageSrc] = useState<{ idx: number | null; image: string }[]>([
        { idx: null, image: '' },
    ]);
    const [file, setFile] = useState<File | null>();

    const [previewImage, setPreviewImage] = useState<string>('');

    const stepIndexForImageUpload = useRef<number>(null);

    const [trigger, { isLoading }] = useUploadFileMutation();

    const handleImageAddition = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        let newPreviewUrls = '';

        newPreviewUrls = URL.createObjectURL(selectedFile);
        setFile(selectedFile);
        setPreviewImage(newPreviewUrls);
    };

    const handleUploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await trigger(formData).unwrap();
            const newImageSrc = {
                idx: stepIndexForImageUpload.current,
                image: previewImage,
            };
            setImageSrc([...imageSrc, newImageSrc]);
            // const changedStepValue = field.value.find(
            //     (_, index) => index === stepIndexForImageUpload.current,
            // );
            const newValue = field.value.map((step, index) => {
                if (index === stepIndexForImageUpload.current) {
                    return { ...step, image: `${IMAGE_API}${res.url}` };
                }
            });
            field.onChange(newValue);
            // if (changedStepValue) {
            //     field.onChange([
            //         ...field.value,
            //         { ...changedStepValue, image: `${IMAGE_API}${res.url}` },
            //     ]);
            // }

            stepIndexForImageUpload.current = null;
            setPreviewImage('');
            setIsOpenModal(false);
        } catch {
            setErrorMessage({ title: 'Ошибка сервера', text: 'Попробуйте сохранить фото позже.' });
            setIsOpenModal(false);
        }
    };

    return {
        handleImageAddition,
        handleUploadImage,
        isLoading,
        errorMessage,
        setErrorMessage,
        previewImage,
        imageSrc,
        stepIndexForImageUpload,
        setImageSrc,
    };
};
