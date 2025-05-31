import { ChangeEvent, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { useUploadFileMutation } from '~/entities/recipe';

import { CreateNewRecipeFormData } from '../schemas/createNewRecipeFormSchema';

type UseUploadImage = {
    field: ControllerRenderProps<CreateNewRecipeFormData, 'steps'>;
    setIsOpenModal: (value: boolean) => void;
    stepIndexForImageUpload: React.RefObject<number | null>;
    setImage: (value: string) => void;
};
export const useUploadImage = (params: UseUploadImage) => {
    const { field, setIsOpenModal, stepIndexForImageUpload, setImage } = params;

    const [errorMessage, setErrorMessage] = useState<null | { title: string; text: string }>();

    const [file, setFile] = useState<File | null>();
    const [previewImage, setPreviewImage] = useState<string>('');

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

            if (stepIndexForImageUpload.current !== null) {
                const newValue = field.value.map((step, index) => {
                    if (index === stepIndexForImageUpload.current) {
                        return { ...step, image: res.url };
                    } else {
                        return step;
                    }
                });

                field.onChange(newValue);
                stepIndexForImageUpload.current = null;
            } else {
                setImage(res.url);
            }

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
        stepIndexForImageUpload,
        setPreviewImage,
    };
};
