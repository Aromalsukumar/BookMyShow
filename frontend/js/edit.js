const url=window.location.href
const search = new URLSearchParams(url.split('?')[1])
const id=search.get('id');
console.log(id);
let profile;
async function getdataforedit() {
    const res =await fetch(`http://localhost:3000/api/getforedit/${id}`)
    const data  = await res.json()
    profile=data.profile
    console.log(res);
    document.getElementById('name').value=data.name
    document.getElementById('category').value=data.category
    document.getElementById('Likes').value=data.Likes
    document.getElementById('img').src=profile 
}
getdataforedit()

async function updatemovie() {
    const name=document.getElementById('name').value;
  const category=document.getElementById('category').value;
  const Likes=document.getElementById('Likes').value;
  
  
 

const res=await fetch(`http://localhost:3000/api/update/${id}`,{
method:"PATCH",
headers:{"content-Type":"application/json"},
body:JSON.stringify({name,category,Likes,profile})

})
if( res.status==201){
    const data=await res.json()
    alert(data.msg)
    window.location.href='../index.html'
}

}

document.getElementById("profile").addEventListener('change',async(e)=>{
    profile=await convertToBase64(document.getElementById('profile').files[0])
document.getElementById('img').src=profile
console.log(profile);
})


function convertToBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
      
    })
}
 