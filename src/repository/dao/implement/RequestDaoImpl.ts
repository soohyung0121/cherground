import { RequestDao } from '../RequestDao';
import { RequestVo } from 'repository/vo/RequestVo';
import { injectable } from 'inversify';
import * as AWS from 'aws-sdk';
import * as awsConfig from '../../../../aws-config.json';

@injectable()
export class RequestDaoImpl implements RequestDao {
    private aws = AWS;
    private testConfig = awsConfig.config;
    private deployConfig = awsConfig.remoteDatabaseConfig;

    private selectConfig() {

    }

    save(requests: RequestVo): Promise<RequestVo> {
        this.aws.config.update(awsConfig.remoteConfig);

        let docClient = new this.aws.DynamoDB.DocumentClient();
        let params = {
            TableName: "request",
            Item: requests
        }
        console.log(params)

        return new Promise((resolve, reject) => {
            docClient.put(params, (err, data) => {
                if(err) {
                     console.error("Unable to orders add", JSON.stringify(err, null, 2))
                     reject(false)
                } else {
                    console.log("Add Request", JSON.stringify(data, null, 2))
                    resolve(requests)
                }
            })
        })
    }
    getUserRequest(userEmail: string, ordinal: number): Promise<RequestVo> {
        this.aws.config.update(awsConfig.remoteConfig);

        let docClient = new this.aws.DynamoDB.DocumentClient();

        let params = {
            TableName: "request",
            Key: {
                userEmail: userEmail,
                ordinal: ordinal
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
                        reject(new Error("Not Exist Request"));
                    }
                    console.log(data.Item)
                    resolve(<RequestVo> data.Item);
                }
            })
        })
    }

    // DB에 저장된 특정 유저의 주문 내역들을 뽑아내기
    getUsersRequest(userEmail: string): Promise<Array<RequestVo>> {
        this.aws.config.update(awsConfig.remoteConfig)

        let docClient = new this.aws.DynamoDB.DocumentClient();
        let params = {
            TableName: "request",
            KeyConditionExpression: '#email = :email',
            ExpressionAttributeNames:{
                '#email': "userEmail",
            }, 
            ExpressionAttributeValues: {
                ':email': userEmail,
            }
        }

        return new Promise((resolve, reject) => {
            docClient.query(params, (err, data) => {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    reject(new Error("AWS Error"))
                } else {
                    if(data.Items.length < 1) {
                        resolve(<Array<RequestVo>> data.Items)
                    } else {
                        data.Items.forEach(item => {
                            resolve(<Array<RequestVo>> data.Items)
                        })
                    }
                }
            })
        })
    }
}   
