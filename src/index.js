import http from 'http';
import fs from 'fs/promises';

const server = http.createServer(async (req, res) => {
    let html;

    switch (req.url) {
        case '/': 
            html = await fileRead('./src/pages/home/index.html');
            break;

        case '/cats/add-breed':
            html = await fileRead('./src/pages/addBreed.html');
            break;
        
        case '/cats/add-cat':
            html = await fileRead('./src/pages/addCat.html');
            break;

        case '/styles/site.css':
            const css = await fileRead('./src/styles/site.css');
            res.writeHead(200, {"content-type": "text/css"});
            res.write(css);
            return res.end();
        
        default:
            return res.end();
    }

    res.writeHead(200, {"content-type": "text/html"});
    res.write(html);
    
    res.end();
})

server.listen(5000);
console.log('Server is listening on http://localhost:5000...');

async function fileRead(url) {
    const html = await fs.readFile(url, {encoding: 'utf-8'});
    return html;
}