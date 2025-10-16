const express = require('express')
const app = express()
const PORT = 8383

let data = ['James'] // store names directly in an array

// Middleware
app.use(express.json())

// Website endpoints
app.get('/', (req, res) => {
    console.log('User requested the home page website')
    res.send(`
        <body style="background:pink; color:blue;">
            <h1>DATA:</h1>
            <p>${JSON.stringify(data)}</p>
            <a href="/dashboard">Dashboard</a>
        </body>
        <script>console.log('This is my script')</script>
    `)
})

app.get('/dashboard', (req, res) => {
    res.send(`
        <body>
        <h1>dashboard</h1>
        <a href="/"> home </a>
        </body>
        `)
})

// API endpoints
app.get('/api/data', (req, res) => {
    console.log('Fetching data')
    res.status(599).send(data)
})

app.post('/api/data', (req, res) => {
    const newName = req.body.name

    if (!newName) {
        return res.status(400).send({ error: 'Name is required' })
    }

    data.push(newName)
    console.log('Updated data:', data)
    res.status(201).send(data)
})

app.delete('/api/data', (req,res)=>{
    data.pop()
    console.log('We deleted the last element')
    res.sendStatus(203)
})

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`))
