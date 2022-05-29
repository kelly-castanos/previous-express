const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('views'))

let todos = {} // temp DB

app.get('/', (req, res)=>{
  res.render('index.ejs', {todos})

})

app.post('/addToDo', (req, res)=> { //req from browser, res is what will be sent back via ejs aka html
  const newToDo = {name: req.body.toDo, isCompleted: false, id: new Date().toString()}

  todos[newToDo.id] = newToDo
  console.log(newToDo);
  res.redirect('/') // anytime you land on homepage you render index.ejs file w data already
}) 

app.delete('/messages', (req, res) => {
  let plsDelete = req.body.id.split(";")
  plsDelete.forEach(elementToDelete => {
    delete todos[elementToDelete]
  })
  // delete todos[req.body.id]
  // console.log(todos);
    res.send('Message deleted!')
})



// DO THESE TWO ON THE BACK END
// function eraseTask(){
//   let removeElems = document.querySelectorAll(".strikeThrough")
//   for(let i=0; i<removeElems.length; i++){
//     removeElems[i].remove()
//   }   
// }

// function removeWholeList(){
//   console.log(3);
//   ul.innerText =""
// }







app.listen(7030, () => console.log('running port 7030'))
