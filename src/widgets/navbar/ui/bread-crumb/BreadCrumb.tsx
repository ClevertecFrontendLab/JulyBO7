import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbProps as ChakraBreadcrumbProps,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useLocation } from 'react-router';

import { AppRoutes, routePaths } from '~/shared/config/router';
import { BREADCRUMBS } from '~/shared/constants/tests';

import { useBreadcrumbs } from '../../model/hooks/useBreadcrumbs';
import cls from './BreadCrumb.module.scss';

type BreadcrumbProps = ChakraBreadcrumbProps & { className?: string };

export const BreadCrumb: FC<BreadcrumbProps> = ({ className, ...props }) => {
    const { pathname } = useLocation();

    const { state, crumbHandler, navigate } = useBreadcrumbs();

    return (
        <Breadcrumb
            data-test-id={BREADCRUMBS}
            spacing='8px'
            separator={<ChevronRightIcon color='gray.500' />}
            className={cls.breadCrimb}
            {...props}
        >
            <BreadcrumbItem>
                <BreadcrumbLink
                    color={state ? 'gray.150' : 'primaryColor'}
                    onClick={() => navigate(routePaths[AppRoutes.MAIN])}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
            {pathname === routePaths[AppRoutes.THE_JUICIEST] && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        color={state ? 'gray.150' : 'primaryColor'}
                        onClick={() => navigate(routePaths[AppRoutes.THE_JUICIEST])}
                    >
                        Самое сочное
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {state &&
                state.breadcrumb.map((item, idx: number) => {
                    const currentPage = idx === state.breadcrumb.length - 1;

                    return (
                        <BreadcrumbItem key={idx}>
                            <BreadcrumbLink
                                color={currentPage ? 'primaryColor' : 'gray.150'}
                                isCurrentPage={currentPage}
                                onClick={() => crumbHandler(item.path, item.title, item.category)}
                            >
                                {item.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    );
                })}
        </Breadcrumb>
    );
};
