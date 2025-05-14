import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { setSuccessMessage } from '~/app/store/app-slice';
import { useAppDispatch } from '~/app/store/hooks';
import { AppRoutes, routePaths } from '~/shared/config/router';

export const VerificationPage: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const emailVerified = location.search.split('=')[1];

    if (emailVerified === 'true') {
        navigate(routePaths[AppRoutes.LOGIN]);
        dispatch(setSuccessMessage('Верификация прошла успешно'));
    }
    if (emailVerified === 'false') {
        navigate(routePaths[AppRoutes.SIGNUP], { state: { isVerified: false } });
    }
    return null;
};
