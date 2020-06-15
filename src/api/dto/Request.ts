export class Request {
    userEmail: string;
    ordinal?: number;
    brandName: string;
    styleName: string;
    color: string;
    quantity: number;
    memo: string;
    image: string;
    categoryName: Category;
    requestStatusName: RequestStatus;
}

export enum Category {
    OUTER,
    TOP,
    BOTTOM,
    ACCESSORIES ,
    OTHERS
}

export enum RequestStatus {
    PENDING,
    MATERIAL_SELECT,
    SAMPLE_MAKING,
    DELIVERY,
    PRODUCT_MAKING,
    COMPLETE
}