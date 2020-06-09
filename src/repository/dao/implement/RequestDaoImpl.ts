import { RequestDao } from '../RequestDao';
import { RequestVo } from 'repository/vo/RequestVo';
import { injectable } from 'inversify';
import * as AWS from 'aws-sdk';
import * as awsConfig from '../../../../aws-config.json';

@injectable()
export class RequestDaoImpl implements RequestDao {
    private aws = AWS;

    saveUserRequest(requests: RequestVo): Promise<RequestVo> {
        this.aws.config.update(awsConfig.config);

        let docClient = new this.aws.DynamoDB.DocumentClient();

        // save change

        let params = {
            TableName: "request",
            Item: requests
        }

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

    // DB에 저장된 특정 유저의 주문 내역들을 뽑아내기
    loadUsersRequest(userEmail: string): Promise<Array<RequestVo>> {
        this.aws.config.update(awsConfig.config)

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
        console.log(userEmail)

        return new Promise((resolve, reject) => {
            docClient.query(params, (err, data) => {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    reject(new Error("AWS Error"))
                } else {

                    if(data.Items.length < 1) {
                        reject(new Error("User Email Does Not Exists"))
                    } else {
                        data.Items.forEach(item => {
                            // console.log("Good:", JSON.stringify(data,null,2));
                            resolve(<Array<RequestVo>> data.Items)
                        })
                    }
                }
            })
        })
    }
}   
