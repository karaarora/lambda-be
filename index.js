const express = require('express')
const app = express()

app.get('/ping', (req, res) => {
    res.send('pong')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up...')
})