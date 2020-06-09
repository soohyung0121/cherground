import { RequestMapper } from 'mapper/RequestMapper';
import { Request } from '../../api/dto/Request';
import { RequestVo } from '../../repository/vo/RequestVo';
import { injectable } from 'inversify';

@injectable()
export class RequestMapperImpl implements RequestMapper {

    convert(vo: RequestVo): Request { 
        let requests = new Request();
        requests.name = vo.name;
        requests.ordinal = vo.ordinal;
        requests.userEmail = vo.userEmail;
        return requests;
    }

    revert(dto: Request): RequestVo {
        let requestsVo = new RequestVo();
        requestsVo.name = dto.name;
        requestsVo.ordinal = dto.ordinal;
        
        requestsVo.userEmail = dto.userEmail;
        return requestsVo; 
    }
}
