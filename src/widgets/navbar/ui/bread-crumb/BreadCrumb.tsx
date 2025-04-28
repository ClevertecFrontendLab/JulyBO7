import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbProps as ChakraBreadcrumbProps,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { routePaths } from '~/shared/config/route-config/router';
import { Category } from '~/shared/types/categories';

import { getCrumbHandler } from '../../model/getCrumbHandler';
import cls from './BreadCrumb.module.scss';

export type CrumbState = { title: string; path: string; category?: Category };

type BreadcrumbProps = ChakraBreadcrumbProps & { className?: string };

export const BreadCrumb: FC<BreadcrumbProps> = ({ className, ...props }) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    console.log('BreadCrumb: ', pathname);

    const handleCrumb = getCrumbHandler(navigate, state);

    return (
        <Breadcrumb
            data-test-id='breadcrumbs'
            spacing='8px'
            separator={<ChevronRightIcon color='gray.500' />}
            // className={className}
            className={cls.breadCrimb}
            {...props}
        >
            <BreadcrumbItem>
                <BreadcrumbLink
                    color={state ? 'gray.150' : 'primaryColor'}
                    onClick={() => navigate(routePaths.main)}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
            {pathname === routePaths.juiciest && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        color={state ? 'gray.150' : 'primaryColor'}
                        onClick={() => navigate(routePaths.juiciest)}
                    >
                        Самое сочное
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {state &&
                state.map((item: CrumbState, idx: number) => {
                    const currentPage = idx === state.length - 1;
                    return (
                        <BreadcrumbItem key={idx}>
                            <BreadcrumbLink
                                color={currentPage ? 'primaryColor' : 'gray.150'}
                                isCurrentPage={currentPage}
                                onClick={() => handleCrumb(item.path, item.title, item.category)}
                            >
                                {item.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    );
                })}
        </Breadcrumb>
    );
};
