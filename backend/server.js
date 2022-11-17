import express from 'express'
import data from './data.js'

const app = express()
const port = process.env.PORT || 2000

app.get('/api/products', (req,res) => {
    res.send(data.products)
})



app.listen(port, () => {
    console.log(`Backend Server Listening at http://localhost:${port}`)
})