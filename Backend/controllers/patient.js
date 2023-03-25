const Patient= require('../models/patient');
const path=require('path');
exports.getPatients=async (req,res,next)=>{
    let patients= await Patient.findAll();
  console.log('><><',patients);
res.send(patients)
   // res.send(patients);

}
exports.postaddPatients=(req,res,next)=>{
console.log(req.body);


Patient.create({
    name:req.body.name,
    email:req.body.email}
).then(result=>{console.log('>>>>',result);res.send(result)}).catch(err=>{console.log(err)})
}


exports.getOnePatient=(req,res,next)=>{
let patientId = req.params.patientId;
Patient.findByPk(patientId).then(patient=> res.json(patient)).catch(err=>{console.log(err);})
}


exports.updatePatient=(req,res,next)=>{
    const patientId= req.params.patientId;
    if(patientId){
    Patient.findByPk(patientId).then(patient=>{
    patient.name= req.body.name;
    patient.email= req.body.email;
    return patient.save()
    }).then(result=>{console.log("product updated");res.json(result)}).catch(err=>{console.log(err);})
    }else{
        res.send("product not found")
    }

}



exports.deletePatient=(req,res,next)=>{
    const patientId= req.params.patientId;
    Patient.findByPk(patientId).then(patient=>{return patient.destroy()}).then((result)=>{console.log("DELETE OBJECT") ;res.send(result)}).catch(err=>{console.log(err);});
}

