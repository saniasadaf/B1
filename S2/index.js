// import http from 'http';


// const server = http.createServer(function(req, res){
//     console.log("req", req);
//     // console.log("res", res);
//     res.end('hello world!')
// })

// server.listen(4000);

import express from "express";
const app = express()

app.get("/", (req, res) => res.send(" hello express "))
    
    

    app.get("/api/Characters", function(req, res){
        return res.send({
            results: [{
                name: "jake"
            }],
            success: true

        })
    })




app.listen(4000);