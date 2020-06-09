import { BaseMapper } from './BaseMapper'
import { Request } from 'api/dto/Request'
import { RequestVo } from "repository/vo/RequestVo";

export interface RequestMapper extends BaseMapper<RequestVo, Request> { };
