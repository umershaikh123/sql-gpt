const express = require('express')
const fs = require('fs')
const app = express()

// Define the endpoint for saving chats
app.post('/api/chats', (req:any, res:any) => {
  const chats = req.body
  const jsonChats = JSON.stringify(chats, null, 2)

  fs.writeFile('chats.json', jsonChats, err => {
    if (err) {
      console.error(err)
      res.status(500).json({ message: 'Error saving chats' })
    } else {
      res.json({ message: 'Chats saved successfully' })
    }
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
