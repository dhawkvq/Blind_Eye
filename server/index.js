const express = require('express')
const app = express()

app.get('/api', (req,res) => res.status(200).send({ 'data': 'success' }))

app.get('/api/videos/:id', (req, res) => {
  res.send({ 
    'success': true,
    'params': req.params
  })
})

app.listen(5000, () => console.log('express server listening on port 5000'))