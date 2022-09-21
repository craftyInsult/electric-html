
// var static = require('node-static');
// const crypto = require('crypto');
// var file = new static.Server(`${__dirname}/public`)

// require('http').createServer(function (request, response) {
//   // console.log(request)
//     request.addListener('end', function () {
//         request.id = crypto.randomUUID()
//         process.send({url : request.url, requestId : request.id}); 
//         // file.serve(request, response);
//         process.on("message", function(html) {
//           response.body = html; 
//           file.serve(request, response)
//         })
//         response.write = "Mukul"
//         file.serve(request, response)
//     }).resume()
// }).listen(7000)

const http = require("http");
const crypto = require('crypto');
const port = 7000;

const init = function(err) {
  if(err) {
    console.log("HTTP Error : ", err);
  } else {
    console.log("HTTP Server running on port : ", port);
  }
}

const server = http.createServer(function(request, response) {
  const id = crypto.randomUUID();
  const renderUrl = request.url.split("?url=")[1] ? request.url.split("?url=")[1] : "null";
  // console.log("Reached server with >> ", renderUrl);
  console.log("Reached server with " , " => ", renderUrl);
  request.id = id; 

  if(renderUrl) { 
    process.send({url : renderUrl, requestId : request.id});
    process.once("message", function(html) {
      response.writeHead(200, {"Content-Type" : "text/html"}); 
      response.write(html);
      response.end();
    }); 
  } 
});  



server.listen(port, init);