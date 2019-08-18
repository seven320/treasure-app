var express = require('express');
const fetch = require('node-fetch');
const csp = require('express-csp-header');
const router = require('express-promise-router')();
const { createCanvas, Image } = require('canvas');
const QRCode = require('qrcode');
const twitter = require('twitter')
const fs = require('fs')

var app = express();


app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

app.use(csp({
    'img-src':['data:','images.com']
}))

app.get('/test', function(req, res){
    console.log("3000")
    res.send("3000 is fine")
})

app.get('/qr/:query', async function(req, res){ // get QR code 

    let requesturl = req.params.query
    // console.log("request url is ",requesturl)

    // let requesturl = `https://api.qrserver.com/v1/create-qr-code/?data=https://google.com&size=200x200`
    // const response = await fetch(requesturl)
    // let buf = await response.buffer()
    // let base64 = buf.toString('base64')
    // res.send(base64)

    let result = await makeQRcode(requesturl)
    res.send(result)
});

app.get('/profile/', async function(req, res){
    console.log(req.params.name)

    let url = require(req.params.name)
    console.log("profile server")

})

app.listen(3000, function(){
    console.log('Example app listening on port!')
})

function Test(){
    console.log("test")
}


// QRコード生成
async function makeQRcode(url){
    console.log("in functions")
    return new Promise(function(resolve, reject){

        // canvas準備
        let canvas_size = 400
        const canvas = createCanvas(canvas_size, canvas_size)

        // QRコードの設定準備
        const segment = [
        { data:"AR名刺\n", mode:"kanji"},
        { data:url, mode:"byte"}  //alphanumericだと怒られる
        ];
        const options = {
        width:1000,
        errorCorrectionLevel: 'H'
        };

        QRCode.toCanvas(canvas, segment, options, (error) => {
            let icon = new Image();

            icon.onload = ()=>{
            const left = Math.floor((canvas.width - icon.width) / 2);    // x
            const top  = Math.floor((canvas.height - icon.height) / 2);  // y
                
            // 画像を載せる
            const ctx = canvas.getContext('2d');
            
            ctx.drawImage(icon, left, top);

            // 出力
            resolve(canvas.toDataURL())
            };
            icon.src = './QRlogo/pattern-treasure_100.png';  // 上に載せる画像
        });
        resolve(`${canvas.toDataURL()}`)
    })
}


function 