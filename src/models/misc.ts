import { IMasterCategory } from './master-category-mdl';

enum MASTER_CATEGORY_NAME {
    COUNTRY = "COUNTRY",
    LANGUAGE = "LANGUAGE"
}

interface IMasterCategoryApiObject {
    [k: string]: IMasterCategory[];
}


export {
    MASTER_CATEGORY_NAME
};

export type {
    IMasterCategoryApiObject
};