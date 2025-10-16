import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authMiddleware from './middleware/authMiddleware.js'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'


const app = express()
const PORT = process.env.PORT || 5000

// Get the file path from the URL to use the current module
const __filename = fileURLToPath(import.meta.url)

// Get the dir name from the file path
const __dirname = dirname(__filename)

// Middleware 
app.use(express.json())

// Servers the HTML file from the public dir
// Tells express to serve all files from the public folder as static assets

app.use(express.static(path.join(__dirname,'../public')))


// Serving up the HTML file from the public dir
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))

})

// Routes
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware , todoRoutes)

app.listen(PORT, ()=>{
    console.log(`Server has started listening on port ${PORT}`)
})



