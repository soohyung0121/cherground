import { BaseMapper } from './BaseMapper';
import { UserVo } from "repository/vo/UserVo";
import { User } from "api/dto/User";

export interface UserMapper extends BaseMapper<UserVo, User> { };