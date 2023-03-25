const express= require('express');
const path = require('path')
const bodyParser = require('body-parser')
const sequelize = require('./util/database');
const patientcontroller= require('./controllers/patient');
const { urlencoded } = require('body-parser');
var cors = require('cors')
const app = express();

app.use(cors())
app.use(bodyParser.json(),urlencoded({extended:true}))

app.get('/getPatients',patientcontroller.getPatients)
app.post('/addPatient',patientcontroller.postaddPatients)
app.get('/getOnePatient/:patientId',patientcontroller.getOnePatient)
app.delete('/deletePatient/:patientId',patientcontroller.deletePatient)
app.put('/updatePatient/:patientId',patientcontroller.updatePatient)
sequelize.sync().then(result=>{console.log(result);}).catch(err=>{console.log(err);})
app.listen(3000,()=>{console.log("seerver running on port 3000");})