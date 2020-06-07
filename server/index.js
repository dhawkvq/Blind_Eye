const express = require('express')
const ytdl = require('ytdl-core')
const fs = require('fs')
const app = express()

const port = 5000

app.get('/api', (req,res) => res.status(200).send({ 'data': 'success' }))

app.get('/api/stream/:id', (req,res) => {
  const { id } = req.params

  if(!id) return res.status(400).send({ error: 'id parameter is required' })

  if(typeof(id) !== 'string') return res.status(400).send({ error: 'parameter id must be of type string' })

  if(!ytdl.validateID(id)){
    return res.status(400).send({ error: 'invalid youtube id' })
  }
  
  ytdl(`http://www.youtube.com/watch?v=${id}`).pipe(res)
  
})


app.listen(port, () => console.log(`express server listening on http://localhost:${port}`))