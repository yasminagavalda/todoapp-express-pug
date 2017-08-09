const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const moment = require('moment')
const app = express()

app.set('view engine', 'pug')

app.use( express.static( path.join(__dirname,'public')) )

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let todoTasks = []
let tasks = []
let counter = 0

app.get('/', (req,res) => {
  tasks = []
  todoTasks.forEach(function(item){
    if (item.done === false) {
      tasks.push(item)
    }
  })
  res.render('pages/tasks', { tasks })
})

app.get('/completed', (req,res) => {
  res.render('pages/completed', { todoTasks })
})

app.post('/tasks', (req,res) => {
  let todo = {id: counter++, name: req.body.task, done: false, dateCreated: 'Created at ' + moment().format('MMMM Do YYYY, h:mm:ss a')}
  todoTasks.push(todo)
  res.redirect('/')
})

app.delete('/task/:id', (req,res) => {
  todoTasks.forEach(function(item, index) {
  	if (item.id === parseInt(req.params.id)) {
  		todoTasks.splice(index, 1)
  		return
  	}
  })
  res.render('pages/tasks', { tasks })
})

app.put('/completed/:id', (req, res) => {
  todoTasks.forEach(function(item, index) {
  	if (item.id === parseInt(req.params.id)) {
  		item.done = true
      item.dateCompleted = 'Completed at ' + moment().format('MMMM Do YYYY, h:mm:ss a')
  		return
  	}
  })
  res.render('pages/tasks', { tasks })
})

app.put('/done-all', (req, res) => {
  todoTasks.forEach(item => {
    item.done = true
    item.dateCompleted = 'Completed at ' + moment().format('MMMM Do YYYY, h:mm:ss a')
  })
  res.render('pages/tasks', { tasks })
})


app.put('/edited/:id/:taskname', (req, res) => {
  let id = req.params.id
  let taskname = req.params.taskname
  todoTasks.forEach(function(item) {
    if (item.id === parseInt(id)) {
      item.name = taskname
      return
    }
  })
  res.render('pages/tasks', { tasks })
})


app.listen(3001)
