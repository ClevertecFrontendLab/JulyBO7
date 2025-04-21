import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';

type BreadCrumbState = { title: string; path: string };

export const BreadCrumb: FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const handleCrumb = (path: string, title: string) => {
        const index = state.findIndex((item: BreadCrumbState) => item.title === title);
        const newState = state.slice(0, index + 1);

        navigate(path, { state: newState });
    };

    return (
        <Breadcrumb
            data-test-id='breadcrumbs'
            spacing='8px'
            separator={<ChevronRightIcon color='gray.500' />}
        >
            <BreadcrumbItem>
                <BreadcrumbLink
                    color={state ? 'gray.150' : 'primaryColor'}
                    onClick={() => navigate('/')}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
            {state &&
                state.map((item: BreadCrumbState, idx: number) => {
                    const currentPage = idx === state.length - 1;
                    return (
                        <BreadcrumbItem key={idx}>
                            <BreadcrumbLink
                                color={currentPage ? 'primaryColor' : 'gray.150'}
                                isCurrentPage={currentPage}
                                onClick={() => handleCrumb(item.path, item.title)}
                            >
                                {item.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    );
                })}
        </Breadcrumb>
    );
};
