// create a web server that listens on port 3000
function createServer() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
  });

  server.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
  });
}