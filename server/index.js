const express = require('express')
const app = express()

app.get('/api', (req,res) => res.status(200).send({ 'data': 'success' }))

app.get('/api/videos/:id', (req, res) => {
  console.log('these are the request params =>',req.params)
  res.send({ 'success': true })
})

app.listen(5000, () => console.log('express server listening on port 5000'))