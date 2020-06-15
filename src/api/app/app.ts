import express, { request, response } from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import container from '../../injector';
import { UserController } from 'api/controller/UserController';
import { User } from 'api/dto/User';
import { RequestController } from 'api/controller/RequestController';
import { Request } from 'api/dto/Request';
import { String } from 'aws-sdk/clients/batch';

export default class App {
    public app: express.Application;

    constructor(
    ) {
        const userController: UserController = container.get("UserController");
        const requestController: RequestController = container.get("RequestController");

        this.app = express();
        this.app.use(bodyParser.json());

        this.app.post('/sign-up', (request: express.Request, response: express.Response) => {
            let user = request.body;

            let signUpResultPromise: Promise<boolean> = userController.signUp(user);

            signUpResultPromise
                .then((result: boolean) => {
                    if(result) {
                        response.status(200);
                        response.send("Sign Up Success");
                    } else {
                        response.status(400);
                        response.send("Sign Up is Failed")
                    }
                })
            })

        this.app.post('/sign-in', (request: express.Request, response: express.Response) => {
            let user: User = request.body;
            let result: Promise<string> = userController.signIn(user);

            result
                .then((jwt: string) => {
                    response.status(200);
                    response.send(jwt);
                })
                .catch((err: Error) => {
                    response.status(400);
                    response.send(err.message);
                })
        })

        this.app.post('/request', (request: express.Request, response: express.Response) => {
            let requests: Request = request.body;
            // console.log(requests.userEmail)
            let requestResult: Promise<Boolean> = requestController.saveUserRequest(requests);

            requestResult
                .then((request: Boolean) => {
                    response.status(200);
                    response.send("request success");
                })
                .catch((err: Error) => {
                    response.status(400);
                    response.send("request failed");
                })
        })

        this.app.get('/requests/:email', (request: express.Request, response: express.Response) => {
            let userEmail : String = request.params.email;
            let result: Promise<Array<Request>> = requestController.getUserRequestListByEmail(userEmail);
            result
                .then((data : Array<Request>) => {
                    response.status(200);
                    response.send(data);
                })
                .catch((err: Error) => {
                    response.status(400);
                    response.send(err.message);
                })
        })
        
        this.app.get('/user-request/', (request: express.Request, response: express.Response) => {
            let userEmail = <string> request.query.userEmail;
            let ordinal = parseInt(<string> request.query.ordinal);

            let result: Promise<Request> = requestController.getUserRequest(userEmail, ordinal);
            result
                .then((getresult : Request) => {
                    console.log(getresult)
                    response.status(200);
                    response.send(getresult);
                })
                .catch((err: Error) => {
                    response.status(400);
                    response.send(err.message);
                })
        })
    }
}