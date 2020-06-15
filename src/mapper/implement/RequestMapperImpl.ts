import { RequestMapper } from 'mapper/RequestMapper';
import { Request } from '../../api/dto/Request';
import { RequestVo } from '../../repository/vo/RequestVo';
import { injectable } from 'inversify';

import { RequestStatus, Category } from '../../api/dto/Request';

@injectable()
export class RequestMapperImpl implements RequestMapper {


    convert(vo: RequestVo): Request {
        let requests = new Request();

        requests.userEmail = vo.userEmail;
        requests.ordinal = vo.ordinal;
        requests.brandname = vo.brandName;
        requests.stylename = vo.styleName;
        requests.color = vo.color;
        requests.quantity = vo.quantity;
        requests.memo = vo.memo;
        requests.image = vo.image;
        requests.categoryName = Category[vo.categoryName];
        requests.requestStatusName = RequestStatus[vo.requestStatusName]
        return requests;
    }

    revert(dto: Request): RequestVo {
        let requestsVo = new RequestVo();
        requestsVo.userEmail = dto.userEmail;
        requestsVo.ordinal = dto.ordinal;
        requestsVo.brandName = dto.brandname;
        requestsVo.styleName = dto.stylename;
        requestsVo.color = dto.color;
        requestsVo.quantity = dto.quantity;
        requestsVo.memo = dto.memo;
        requestsVo.image = dto.image;
        requestsVo.categoryName = Category[dto.categoryName];
        requestsVo.requestStatusName = Category[dto.requestStatusName]
        return requestsVo; 
    }
}
