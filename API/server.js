require('@google-cloud/debug-agent').start({serviceContext: {enableCanary: true}});
const express = require ('express')
const fs = require('fs');

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

const MongoClient = require('mongodb').MongoClient;
//Extract into config file 
const uri = "mongodb+srv://readOnly:readOnlyP455word@cluster0.csogb.mongodb.net/fwdsec?retryWrites=true&w=majority"; 
const client = new MongoClient(uri,{newUserUrlParser:false,useUnifiedTopology: true});



// Controllers - aka, the db queries
const main = require('./controllers/main')

// App
const app = express()
/*

*/
// App Middleware 
//'http://localhost:3000','http://localhost:3001',
const whitelist = ['https://react-293106.wn.r.appspot.com','https://reactfrontend-293718.wl.r.appspot.com']
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
 
    },
    }


app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined' 

app.get('/', (req, res) => res.send('ehlo world you\'ve got mail.'))

app.get('/getEHLO',cors(corsOptions), (req, res) => main.getEHLO(req, res, client))
app.get('/crud', cors(corsOptions),(req, res) => main.getTableData(req, res, client))
app.post('/crud', cors(corsOptions),(req, res) => main.postTableData(req, res, client))
app.put('/crud', cors(corsOptions),(req, res) => main.putTableData(req, res, client))
app.delete('/crud', cors(corsOptions),(req, res) => main.deleteTableData(req, res, client))

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})