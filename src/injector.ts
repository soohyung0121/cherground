import { Container } from 'inversify';

import { UserController } from 'api/controller/UserController';
import { UserControllerImpl } from './api/controller/implement/UserControllerImpl';
import { UserService } from 'service/UserService';
import { UserServiceImpl } from './service/implement/UserServiceImpl';
import { UserDao } from 'repository/dao/UserDao';
import { UserDaoImpl } from './repository/dao/implement/UserDaoImpl';
import { UserMapper } from 'mapper/UserMapper';
import { UserMapperImpl } from './mapper/implement/UserMapperImpl';

import { RequestController } from 'api/controller/RequestController';
import { RequestControllerImpl } from './api/controller/implement/RequestControllerImpl';
import { RequestService } from 'service/RequestService';
import { RequestServiceImpl } from './service/implement/RequestServiceImpl';
import { RequestDao } from 'repository/dao/RequestDao';
import { RequestDaoImpl } from './repository/dao/implement/RequestDaoImpl';
import { RequestMapper } from 'mapper/RequestMapper';
import { RequestMapperImpl } from './mapper/implement/RequestMapperImpl';

const container: Container = new Container();

container.bind<UserController>("UserController").to(UserControllerImpl);
container.bind<UserService>("UserService").to(UserServiceImpl);
container.bind<UserDao>("UserDao").to(UserDaoImpl);
container.bind<UserMapper>("UserMapper").to(UserMapperImpl);
container.bind<RequestController>("RequestController").to(RequestControllerImpl);
container.bind<RequestService>("RequestService").to(RequestServiceImpl);
container.bind<RequestMapper>("RequestMapper").to(RequestMapperImpl);
container.bind<RequestDao>("RequestDao").to(RequestDaoImpl);

export default container;