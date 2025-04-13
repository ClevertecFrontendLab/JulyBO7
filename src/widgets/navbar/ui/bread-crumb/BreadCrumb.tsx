import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router';

export type BreadCrumbItem = { text: string; path: string };
type BreadCrumbProps = {
    items: BreadCrumbItem[];
};
export const BreadCrumb: FC<BreadCrumbProps> = ({ items }) => (
    <Breadcrumb
        display={{ base: 'none', lg: 'block' }}
        spacing='8px'
        separator={<ChevronRightIcon color='gray.500' />}
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
