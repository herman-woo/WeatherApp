/*----------- 1. SERVER -----------*/

  /* EXPRESS */
    //Express to run server and routes
    const express = require('express');
    //Start up an instance of app
    const app = express();

  /* DEPENDENCIES */
    const bodyParser = require('body-parser')

  /* Middleware*/
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  const cors = require('cors');
  app.use(cors());

  /* Initialize the main project folder*/
  app.use(express.static('website'));
  
  /* Spin up the server */
  const port = 3000;
  const server = app.listen(port, listening);
  function listening(){
      // console.log(server);
      console.log(`running on localhost: ${port}`);
    }; 
/*----------- END OF SERVER -----------*/





/*----------- 2. ROUTES -----------*/
/* Empty JS object to act as endpoint for all routes */
const projectData = [];
//Telling the server how to respond to HTTPS requests

app.post('/addData', addData)

function addData (req, res){

  newEntry = {
    city: req.body.city,
    temp: req.body.temp,
    notes: req.body.notes,
    date: req.body.date
  }
  projectData.push(newEntry)
  console.log(newEntry);
  res.send(projectData);
}

//tell express to send appData when a GET request is made
app.get('/all', getData)  //request is made from client side '/all'

  function getData(req,res){
    res.send(projectData);
  }
