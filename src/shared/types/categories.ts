export type SubCategory = {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
};

export type Category = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: SubCategory[];
    rootCategoryId?: string;
};

// type SubcategoryData = SubCategory & { path: string };

// export type CategoryData = Omit<Category, 'subCategories'> & {
//     subCategories: SubcategoryData[];
//     path: string;
// };
