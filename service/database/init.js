const mongoose = require('mongoose')
const db='mongodb://localhost/smile-db'
const glob=require('glob')
const {resolve}=require('path')

exports.initSchemas=()=>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}

let maxConnectTime=0
exports.connect = ()=>{
     //链接数据库
     mongoose.connect(db)
    return new Promise((resolve,reject)=>{
        //增加监听事件
        mongoose.connection.on('disconnected',()=>{
            console.log('链接数据库断开')
            if(maxConnectTime<=3){
                maxConnectTime++;
                mongoose.conntect(db)
            }else{
                reject()
                throw new Error('数据库链接断开,程序无法完成，请认为处理')
            }
        })

        mongoose.connection.on('error',(err)=>{
            console.log("链接数据库失败")
            if(maxConnectTime<=3){
                maxConnectTime++;
                mongoose.connect(db)
            }else{
                reject(err)
                throw new Error('链接错误')
            }
           
        })
        //链接成功时打开
        mongoose.connection.once('open',()=>{
            console.log('mongoose connect db successfully')
            resolve()
        })
    })

    
}