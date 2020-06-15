import { UserMapper } from "mapper/UserMapper";
import { User } from "../../api/dto/User";
import { UserVo } from "../../repository/vo/UserVo";
import { injectable } from "inversify";

@injectable()
export class UserMapperImpl implements UserMapper {

    convert(vo: UserVo): User {
        let user = new User();
        user.name = vo.name;
        user.phoneNumber = vo.phoneNumber;
        user.address = vo.address;
        user.email = vo.email;
        user.password = vo.password;
        return user;
    }

    revert(dto: User): UserVo {
        let userVo = new UserVo();
        userVo.name = dto.name;
        userVo.phoneNumber = dto.phoneNumber;
        userVo.address = dto.address;
        userVo.email = dto.email;
        userVo.password = dto.password;
        return userVo;
    }
}