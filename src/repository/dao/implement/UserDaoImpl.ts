import { UserDao } from "../UserDao";
import { UserVo } from "repository/vo/UserVo";
import { injectable } from "inversify";
import * as AWS from 'aws-sdk';
import * as awsConfig from '../../../../aws-config.json';
import { User } from "api/dto/User";


@injectable()
export class UserDaoImpl implements UserDao {
    
    private aws = AWS;

    save(user: UserVo): Promise<UserVo> {
        this.aws.config.update(awsConfig.remoteConfig);

        let docClient = new this.aws.DynamoDB.DocumentClient();

        let params = {
            TableName: "user",
            Item: user
        } 

        return new Promise((resolve, reject) => {
            docClient.put(params, (err, data) => {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    reject(false);
                } else {
                    console.log("Added item:", JSON.stringify(data, null, 2));
                    resolve(user);
                }
            })
        })
    }

    findUserVoByEmail(email: string): Promise<UserVo> {
        this.aws.config.update(awsConfig.remoteConfig);

        let docClient = new this.aws.DynamoDB.DocumentClient();

        let params = {
            TableName: "user",
            Key: {
                email: email
            }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data) => {
                if(err) {
                    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                    reject(new Error("AWS Error"));
                } else {
                    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                    if(data.Item == null) {
                        reject(new Error("Not Exist User"));
                    }
                    resolve(<UserVo> data.Item);
                }
            })
        })
    }

    existsByEmail(email: string): Promise<boolean> {
        this.aws.config.update(awsConfig.remoteConfig);

        let docClient = new this.aws.DynamoDB.DocumentClient();

        let params = {
            TableName: "user",
            Key: {
                email: email
            }
        }
        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data) => {
                if(err) {
                    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                    reject(new Error("AWS Error"));
                } else {
                    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                    if(data.Item == null) {
                        //없다
                        //존재하지 않는 다고 서비스에 알려준다.
                        // resolve(true)
                        // rejecct(null)
                        resolve(false)
                    } else {
                        //이메일이 존재하는 거니까 already exist
                        // reject("already exist")
                        resolve(true)
                    }
                }
            })
        })
    }     
}