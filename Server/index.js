const http = require("http");
const fs = require("fs");
const url = require("url")

const server = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New Request Recieved\n`;
    const urlDetails = url.parse(req.url, true);
    console.log(urlDetails);
    fs.appendFile("logs.txt", log, (err) => {
        switch (urlDetails.pathname) { 
            case "/":
                res.end("This is HomePage");
                break;
            case "/about":
                const username = urlDetails.query.name;
                res.end(`Hey, ${username}`);
                break;
            default:
                res.end("404 Page Not Found!")
        }
    });
});

const port = 8000;

server.listen(port, () => { 
    console.log(`Server is Listening! Port: ${port}`);
})

// url :uniform resource locator
// https://www.youtube.com/watch?v=Nt-AsZh5woE&list=PLinedj3B30sDby4Al-i13hQJGQoRQDfPo&index=8
// 1: protocol - https hypertext protocol secure
// 2: Domain - user friendly name of Ip of server
// 3: path - routes
// 4: Query Parameter separated by ?
// In qp & - separate queries ... + - use instead of space
