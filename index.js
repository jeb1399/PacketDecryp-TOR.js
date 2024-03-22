const http = require('http');
const https = require('https');
const url = require('url');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
console.log("Packet-Decryp-TOR.js");
const server = http.createServer((req, res) => {
    const decryptionKey = crypto.randomBytes(32).toString('hex');
    const parsedUrl = url.parse(req.url, true);
    const decryptedData = parsedUrl.query.decrypt;
    const decryptedResponse = decryptData(decryptedData, decryptionKey);
    const cacheFolder = './cache';
    const fileName = crypto.createHash('md5').update(decryptedData).digest('hex');
    const filePath = path.join(cacheFolder, fileName);
    fs.writeFile(filePath, decryptedResponse, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        } else {
            console.log('Decrypted response stored temporarily:', filePath);
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 
                        'Content-Type': 'text/html',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36'
                    });
                    res.end(data);
                }
            });
        }
    });
});
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Decryption server is running on port ${PORT}`);
});
function decryptData(data, key) {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
