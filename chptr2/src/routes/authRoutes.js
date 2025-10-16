import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'
import db from '../db.js'



const router = express.Router()
// Register a new user ednpoint (/auth/register)
router.post('/register', (req, res) => {
  const { username, password } = req.body
   // save username and encr password 
  // alex111@gmail.com 

  // encr pw
  const hashedPassword = bcrypt.hashSync(password, 8)

  try{
    const insertUser = db.prepare(`INSERT INTO users (username, password)
        VALUES (?,?)`)
    const result = insertUser.run(username, hashedPassword)

    // now we have a user now add todo for them
    const defaultTodo = `Hello! Add your first todo!`
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
        VALUES (?,?)`)
    insertTodo.run(result.lastInsertRowid, defaultTodo)

    // create a Token
    const token = jwt.sign({
        id: result.lastInsertRowid
    }, process.env.JWT_SECRET, { expiresIn: '24h' } ) 
    res.json({ token })
  }
  catch (err){
    console.log(err.message)
    res.sendStatus(503) 
  }
  
})


router.post('/login', (req,res)=>{
    // we get a email and pw associated with that email in the db
    // we get it encrypted and cannot compare to the email 
    // one way encr the pw

    const {username, password} = req.body

    try{
      const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
      const user = getUser.get(username)
      // If we cannot find a user with that username return out from the func
      if(!user){
        return res.status(404).send({message: "User not found"})
      }
      const passwordIsValid = bcrypt.compareSync(password, user.password)
      // Password doesnt match return out the function 
      if (!passwordIsValid){
        return res.status(401).send({message: "Invalid password"})
      }
      console.log(user)
      // Successful authentication 
      const token = jwt.sign({id: user.id}, process.env.JWT_SECRET,{ expiresIn: '24h'})
      res.json({token})

  
    }
    catch (err){
      console.log(err.message)
      res.sendStatus(503)

    }
})

export default router