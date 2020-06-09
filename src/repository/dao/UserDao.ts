import { UserVo } from "repository/vo/UserVo";
import { User } from "api/dto/User";

export interface UserDao {
    save(User: UserVo): Promise<UserVo>;
    findUserVoByEmail(email: string): Promise<UserVo>;
    existsByEmail(email: string): Promise<boolean>;
} 