const http = require("http");

http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("<h1>Home Page</h1>");
  } else if (req.url === "/about") {
    res.write("<h1>About Page</h1>");
  } else if (req.url === "/contact") {
    res.write("<h1>Contact Page</h1>");
  } else if (req.url === "/api") {
    res.write(JSON.stringify([1, 2, 3, 4, 5]));
  } else {
    res.write("<h1>404 Page Not Found</h1>");
  } 
  res.end();
}).listen(8000, () => console.log("Server is running on port 8000"));