const fs = require('fs');
const http = require('http');

const createDir = (dirName) => {
  if (!fs.existsSync(`${__dirname}/${dirName}`)){
    fs.mkdirSync(`${__dirname}/${dirName}`);
  }
}

const createFile = (filePath, fileName, content) => {
  fs.writeFile(`${filePath? filePath : __dirname}/${fileName}.txt`, content, 'utf-8', () => {
    console.log('written')
  });
}

const sample = {
  "filePath": "path",
  "fileName": "name",
  "content": "content"
}

const server = http.createServer((req, res) => {
  if(req.method === 'POST' && req.url === '/createnote') {
    let data = []
    req.on('data', chunk => {
      data.push(chunk)
      const {filePath, fileName, content} = JSON.parse(data) 
      if(!filePath) {
        createFile(null, fileName, content)
      }
      createFile(filePath, fileName, content)
      res.end(`Note saved`)
    })
  }
  if(req.method === 'POST' && req.url === '/createdir') {
    let data = []
    req.on('data', chunk => {
      data.push(chunk)
      const {dirName} = JSON.parse(data) 
      createDir(dirName)
    })
    res.end('folder created successfully')
  }
  if(req.method === 'POST' && req.url === '/read') {
    let data = []
    req.on('data', chunk => {
      data.push(chunk)
      const {dirName, fileName} = JSON.parse(data) 
      let content
      if(!dirName) {
        content = fs.readFileSync(`${__dirname}/${fileName}.txt`, 'utf-8')
      }
      content = fs.readFileSync(`${dirName}/${fileName}.txt`, 'utf-8')

      res.end(content)
    })
  }
})

server.listen(8000, 'https://glacial-taiga-31626.herokuapp.com/', () => {
  console.log('Listening to requests on port 8000');
});

// var dir = './tmp';



// fs.mkdirSync('./temp')
// fs.Dir()

// fs.readdir(`${__dirname}/`, (err, files) => {
//   if(err) console.log('unable to read directory')
//   files.forEach(file => console.log(file))
// })