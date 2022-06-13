var express = require('express')
var cors = require('cors')
require('dotenv').config()

var app = express()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
})

let shorturl = {}
app.post('/api/shorturl', (req, res) => {
  if (req.body.url.includes('http')) {
    shorturl.url = req.body.url
    shorturl.shorturl = (Math.random() * 10).toFixed() // 假的shortener
    res.json({
      original_url: req.body.url,
      short_url: shorturl.shorturl
    })
  } else {
    res.json({
      error: 'invalid url'
    })
  }
})

app.use('/api/shorturl/:redirect', (req, res) => {
  res.redirect(shorturl.url) // 重定向
})
