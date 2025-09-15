import http from 'http';
import fs from 'fs/promises';

import { getCats, getCatById, saveCat } from './data.js';

const server = http.createServer(async (req, res) => {
    let html;

    switch (req.url) {
        case '/': 
            html = await fileRead('./src/pages/home/index.html');
            const cats = await getCats();
            let catsHtml = '';

            if (cats.length > 0) {
                catsHtml = cats.map(cat => catTemplate(cat)).join('\n');
            } else {
                catsHtml = '<span>There are no cats</span>';
            }

            html = html.replaceAll('{{cats}}', catsHtml);
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

function fileRead(url) {
    return fs.readFile(url, {encoding: 'utf-8'});
}

function catTemplate(cat) {
    const template = `
    <li>
        <img src="${cat.imageUrl}" alt="${cat.name}">
        <h3></h3>
        <p><span>Breed: </span>${cat.breed}</p>
        <p><span>Description: </span>${cat.description}</p>
        <ul class="buttons">
            <li class="btn edit"><a href="">Change Info</a></li>
            <li class="btn delete"><a href="">New Home</a></li>
        </ul>
    </li>
    `
    return template;
}