const express = require('express')
const ytdl = require('ytdl-core')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()


const port = process.env.PORT || 5000


app.get('/api/stream/:id', (req,res) => {
  const { id } = req.params

  if(!id) return res.status(400).send({ error: 'id parameter is required' })

  if(typeof(id) !== 'string') return res.status(400).send({ error: 'parameter id must be of type string' })

  if(!ytdl.validateID(id)){
    return res.status(400).send({ error: 'invalid youtube id' })
  }
  
  ytdl(`http://www.youtube.com/watch?v=${id}`)
    .on('response', ({ headers }) => res.setHeader('Content-Length', headers['content-length'] ))
    .pipe(res)
  
})

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


app.listen(port, () => console.log(`express server listening on http://localhost:${port}`))