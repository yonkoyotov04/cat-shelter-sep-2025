import http from 'http';
import fs from 'fs/promises';

const server = http.createServer(async (req, res) => {
    

    switch (req.url) {
        case '/': 
            const homeHtml = await fileRead('./src/pages/home/index.html');
            res.writeHead(200, {"content-type": "text/html"});
            res.write(homeHtml);
            break;

        case '/styles/site.css':
            const css = await fileRead('./src/styles/site.css');
            res.writeHead(200, {"content-type": "text/css"});
            res.write(css);
            break
    }
    
    res.end();
})

server.listen(5000);
console.log('Server is listening on http://localhost:5000...');

async function fileRead(url) {
    const html = await fs.readFile(url, {encoding: 'utf-8'});
    return html;
}