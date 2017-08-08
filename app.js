const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'pug')

app.use( express.static( path.join(__dirname,'public')) )

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let todoTasks = []
let completedTasks = []
let counter = 0

app.get('/tasks', (req,res) => {
  res.render('pages/tasks', { todoTasks })
})

app.get('/tasks/completed', (req,res) => {
  res.render('pages/completed', { completedTasks })
})

app.post('/tasks', (req,res) => {
  let todo = {id: counter++, name: req.body.task, done: false, date: new Date().toString()}
  todoTasks.push(todo)
  res.redirect('/tasks')
})

app.delete('/tasks/:id', (req,res) => {
  todoTasks.forEach(function(item, index) {
  	if (item.id === parseInt(req.params.id)) {
  		todoTasks.splice(index, 1)
  		return
  	}
  })
  res.render('pages/tasks', { todoTasks })
})

app.put('/tasks/completed/:id', (req, res) => {
  todoTasks.forEach(function(item, index) {
  	if (item.id === parseInt(req.params.id)) {
  		completedTasks.push(item)
  		todoTasks.splice(index, 1)
  		return
  	}
  })
  res.render('pages/tasks', { todoTasks })
})

app.put('/tasks/done-all', (req, res) => {
  console.log(todoTasks, completedTasks)
  todoTasks.forEach(item => {
    completedTasks.push(item)
  })
  todoTasks = []
  res.render('pages/tasks', { todoTasks })
})
app.listen(3001)
