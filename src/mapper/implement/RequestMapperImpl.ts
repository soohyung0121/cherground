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
        requests. = vo.quantity;
        requests.memo = vo.memo;
        requests.image = vo.image;
        requests.category = Category[vo.category];
        requests.requestStatus = RequestStatus[vo.requestStatus]
        return requests;
    }

    revert(dto: Request): RequestVo {
        let requestsVo = new RequestVo();
        requestsVo.userEmail = dto.userEmail;
        requestsVo.ordinal = dto.ordinal;
        requestsVo.brandname = dto.brandname;
        requestsVo.stylename = dto.stylename;
        requestsVo.color = dto.color;
        requestsVo.wantedorder = dto.wantedorder;
        requestsVo.memo = dto.memo;
        requestsVo.image = dto.image;
        requestsVo.category = Category[dto.category];
        requestsVo.requestStatus = Category[dto.requestStatus]
        return requestsVo; 
    }
}
