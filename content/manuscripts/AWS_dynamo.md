


# 全レコード取得（scan）
```js
var aws = require('aws-sdk');
var dynamo = new aws.DynamoDB();

exports.handler = async (event) => {

    let res= await dynamoscan();//データスキャン
    
    return res;
};

function dynamoscan(){
    return new Promise((resolve, reject) => {
        let params = {
            "TableName": "TableName",//テーブル名を指定
            "ReturnConsumedCapacity": "NONE"
        };
        dynamo.scan(params,function(err, data) {
            if (err) {
                reject(err, err);
            } else {
                //console.log("data count:",data.Count);
                resolve(data.Items);
            }
        });
    });
}
```

<br>

# 特定のレコード取得（query）
```js
var aws = require('aws-sdk');
var dynamo = new aws.DynamoDB();

exports.handler = async (event) => {
    let prm={
        tablename:"tablename",//テーブル名
        pk_name:"pk_name",//pkの名称
        pk_prm:{S:"pk_prm"},//検索pkの指定
        sk_name:"sk_name",//skの名称
        sk_prm:{S:"sk_prm"},//検索skの指定
    };
    let res= await dynamoquery_pksk(prm);
    
    return res;
};

function dynamoquery_pksk(obj){
    return new Promise((resolve, reject) => {
        let params = {
            "TableName": obj.tablename,
            "KeyConditionExpression": "#pk_name = :pk_prm and #sk_name = :sk_prm",//検索条件
            "ExpressionAttributeNames":{
                "#pk_name": obj.pk_name,
                "#sk_name": obj.sk_name,
            },
            "ExpressionAttributeValues": {
                ":pk_prm": obj.pk_prm,
                ":sk_prm": obj.sk_prm,
            }
        };
        dynamo.query(params,function(err, data) {
            if (err) {
                reject(err, err);
            } else {
                resolve(data.Items);
            }
        });
    });
}
```

<br>

# レコードの新規・更新(putItem)
```js
var aws = require('aws-sdk');
var dynamo = new aws.DynamoDB();

exports.handler = async (event) => {

    let Item_row = {
        column1:{S:"column1"},
        column2:{S:"column2"},
        column3:{S:"column3"}
    };
    let prm={
        "TableName":"tablename",//テーブル名
        "Item":Item_row//書き込みアイテム
    };

    let res= await dynamoPutItem(prm);
    
    return res;
};

function dynamoPutItem(obj){
    return new Promise((resolve, reject) => {
        let params = obj;
        dynamo.putItem(params,function(err, data) {
            if (err) {
                reject(err, err);
            } else {
                resolve("updated");
            }
        });
    });
}

```

# レコードの新規・更新(updateItem)
```js
var aws = require('aws-sdk');
var dynamo = new aws.DynamoDB();

exports.handler = async (event) => {

    let prm = {
        TableName: "tablename",
        Key: {
            pk_name:{S:"pk_prm"},
            sk_name:{S:"sk_prm"},
        },
        UpdateExpression: "set #v1=:v1,#v2=:v2",
        ExpressionAttributeNames:{
            "#v1":"datetime",//カラム名
            "#v2":"value",//カラム名
        },
        ExpressionAttributeValues: {
            ":v1": {S:"2021-03-10T10:10:10"},//カラムの値
            ":v2": {N:"2.34"},//カラムの値
        }
    };

    let res= await dynamo_update(prm);
    
    return res;
};

function dynamo_update(params){
    return new Promise((resolve, reject) => {
        dynamo.updateItem(params,function(err, data) {
            if (err) {
                reject(err, err);
            } else {
                //console.log(data);
                resolve("updated");
            }
        });
    });
}
```

# レコードの削除(deleteItem)
```js
var aws = require('aws-sdk');
var dynamo = new aws.DynamoDB();

exports.handler = async (event) => {

    let prm={
        TableName:"tablename",
        Key:{
            pk_name: {S: "pk_prm"},
            sk_name: {S: "sk_prm"}
        }
    };

    let res= await dynamoDeleteItem(prm);
    
    return res;
};

function dynamoDeleteItem(params){
    return new Promise((resolve, reject) => {
        dynamo.deleteItem(params,function(err, data) {
            if (err) {
                reject(err, err);
            } else {
                resolve("deleted");
            }
        });
    });
}
```

- [Amazon DynamoDB](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/APIReference/API_Operations_Amazon_DynamoDB.html)
- [ロクイチラボのメモ帳](https://roku-ichi.com/lambda2dynamo_basic/)