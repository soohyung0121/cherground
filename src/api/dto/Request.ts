export class Request {
    userEmail: string;
    ordinal: number;
    brandname: string;
    stylename: string;
    color: string;
    wantedorder: number;
    memo: string;
    image: string;
    category: Category;
    requestStatus: RequestStatus;
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