import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

// Environment variables
dotenv.config()

// App
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Routes
const ftxRouter = express.Router()
ftxRouter.get('/api/ftx/markets', async (req, res) => {
    try {
        const response = await axios.get('https://ftx.com/api/markets')
        res.status(200).json(response.data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
app.use(ftxRouter)

// Deployment configuration
const NODE_ENV = process.env.NODE_ENV || 'development'
if (NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
}

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running in ${NODE_ENV} mode on port: ${PORT}`))