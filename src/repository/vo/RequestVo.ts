export class RequestVo {
    userEmail: string;
    ordinal: number;
    brandName: string;
    styleName: string;
    color: string;
    quantity: number;
    memo: string;
    image: string;
    categoryName: string;
    requestStatusName: string;
}

// enum Category {
//     OUTER = "OUTER",
//     TOP = "TOP",
//     BOTTOM = "BOTTOM",
//     ACCESSORIES = "ACCE",
//     OTHERS = "OTHERS"
// }

// enum RequestStatus {
//     WAIT,
//     SELECTMATERIALS,
//     MAKESAMPLE,
//     DELIVER,
//     PRODUCTION,
//     COMPLETE
// }