let nameinput= document.getElementById('name');
let emailinput= document.getElementById('email')
let idInput= document.getElementById('patientId')
let userList = document.getElementById('users')
const msg = document.querySelector('.msg');
const http= "http://localhost:3000"
window.addEventListener('DOMContentLoaded', ()=>{
userList.addEventListener('click',removeItem)
userList.addEventListener('click',EditItem)
axios.get(http+'/getPatients').then(res=>{
console.log(res.data);
 showOutput(res)
  console.log("data is here");
  } )
  .catch(err=>console.log(err))

})


let form =document.getElementById('my-form')
form.addEventListener('submit', submitdata)

async function submitdata(e){
e.preventDefault();
if(nameinput.value === '' || emailinput.value === '') {
  //alert('Please enter all fields');
  msg.classList.add('error');
  msg.innerHTML = 'Please enter all fields';

  // Remove error after 3 seconds
  setTimeout(() => msg.remove(), 3000);
}else{

let nameval= nameinput.value;
let emailval= emailinput.value;
let obj = {"name" : nameval,"email":emailval }
await axios.post(http+'/addPatient', obj).then(res=>{

  console.log('>>>>p',res.data
  );
})
.catch(err=>console.log(err))

await axios.get(http+'/getPatients').then(res=>{
  console.log("hello")
  console.log(typeof(res.data))
console.log('////',res);
showOutput(res);
} )
.catch(err=>console.log(err))
}
}


function showOutput(res) {
//clear previous items

while (userList.firstChild) {
  userList.removeChild(userList.lastChild);
  }

  let length= Object.keys(res.data).length 
  console.log(res.data[0]);

for (let i = 0; i <length; i++) {
  let destring= res.data[i];
  console.log(destring);
  // console.log(localStorage.key(i),destring.expanse, destring.category,destring.description);

//creating li object
let li= document.createElement('li');

li.id=destring.id;
li.appendChild(document.createTextNode(destring.name + ': ' ))
li.appendChild(document.createTextNode(destring.email ))
console.log(li.id);


//create span
let span = document.createElement('span');
span.appendChild(document.createTextNode('  '))
li.appendChild(span)
//delete button
let btn = document.createElement('button');
btn.className='delete'
btn.appendChild(document.createTextNode('DEL'))
li.appendChild(btn)


// edit button
let span2 = document.createElement('span');
span2.appendChild(document.createTextNode('  / '))
li.appendChild(span2)
let editbtn = document.createElement('button');
editbtn.className='edit'
editbtn.appendChild(document.createTextNode('EDIT'))
li.appendChild(editbtn)

userList.appendChild(li);


}


nameinput.value='';
emailinput.value='';

}



async function removeItem(e){
  if(e.target.classList.contains('delete')){
  var li= e.target.parentElement;
   let key = li.id;
  await axios.delete(http+"/deletePatient/"+key).
   then( (res)=>{console.log(res.data);
   }).catch(err=>{console.log(err);})
  }

 await axios.get(http+"/getPatients").then(res=>{
showOutput(res);console.log(res.data);
} )
.catch(err=>console.log(err))
}
 
//update the value,

async function EditItem(e){
if(e.target.classList.contains('edit')){
let li= e.target.parentElement;
let key = li.id;
console.log(key);
await axios.get(http+ '/getOnePatient'+ "/"+key).then( (res)=>{
console.log(res);
nameinput.value=res.data.name;
emailinput.value=res.data.email; 
idInput.value= res.data.id
} ).catch(err=>console.log(err))
form.removeEventListener('submit',submitdata)
form.addEventListener('submit', submitupdateddata)

}

}

async function submitupdateddata(e){
  e.preventDefault();
  let nameval= nameinput.value;
  let emailval= emailinput.value;
  let obj = {"name" : nameval,"email":emailval }
  await axios.put(http+'/updatePatient/'+idInput.value, obj).then(res=>{
    console.log(res.data);
  })
  .catch(err=>console.log(err))

  form.removeEventListener('submit',submitupdateddata)
  form.addEventListener('submit', submitdata)

  await axios.get(http+'/getPatients').then(res=>{
  showOutput(res);console.log(res.data);
  } )
  .catch(err=>console.log(err))
  
  }