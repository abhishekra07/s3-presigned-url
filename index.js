const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/_presigned_post_url', (req, res) => {
    
})

app.post('/_presigned_get_url', (req, res) => {
   
})

app.listen(port, () => {
    console.log(`S3 Example app listening on port ${port}`)
  });