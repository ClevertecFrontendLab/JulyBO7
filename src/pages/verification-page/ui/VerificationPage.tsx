import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { AppRoutes, routePaths } from '~/shared/config/router';

export const VerificationPage: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const emailVerified = location.search.split('=')[1];

    useEffect(() => {
        if (emailVerified === 'true') {
            navigate(routePaths[AppRoutes.LOGIN], { state: { isVerified: true } });
        }
        if (emailVerified === 'false') {
            navigate(routePaths[AppRoutes.SIGNUP], { state: { isVerified: false } });
        }
    }, [emailVerified, navigate]);

    return 'VerificationPage';
};
