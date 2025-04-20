import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbProps } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router';

export type BreadCrumbItem = { text: string; path: string };
type BreadCrumbProps = BreadcrumbProps & { items: BreadCrumbItem[] };

export const BreadCrumb: FC<BreadCrumbProps> = ({ items, ...rest }) => (
    <Breadcrumb
        data-test-id='breadcrumbs'
        spacing='8px'
        separator={<ChevronRightIcon color='gray.500' />}
        {...rest}
    >
        {items.map((item, idx) => {
            const currentPage = idx === items.length - 1;
            return (
                <BreadcrumbItem key={idx}>
                    <BreadcrumbLink
                        color={currentPage ? 'primaryColor' : 'gray.150'}
                        as={Link}
                        isCurrentPage={currentPage}
                        to={item.path}
                    >
                        {item.text}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            );
        })}
    </Breadcrumb>
);
