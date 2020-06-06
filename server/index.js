const express = require('express')
const ytdl = require('ytdl-core')
const fs = require('fs')
const app = express()

const port = 5000

app.get('/api', (req,res) => res.status(200).send({ 'data': 'success' }))

app.get('/api/stream', (req,res) => {
  const readStream = fs.createReadStream(`${__dirname}/lorem.txt`,'utf8')
  readStream.pipe(res)
})


app.listen(port, () => console.log(`express server listening on http://localhost:${port}`))