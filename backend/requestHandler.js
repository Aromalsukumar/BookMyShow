import movieSchema from "./models/movies.model.js"
import userSchema from "./models/user.model.js"
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const {sign} = pkg

export async function addmovie(req,res){
    try{
        console.log(req.body);
        const { name,category,Likes,profile,banner } = req.body;
        await movieSchema 
        .create({name,category,Likes,profile,banner})
        .then(()=>{
            res.status(201).send({msg:"successully created"});
        })
        .catch((error)=>{
            res.status(404).send({error:error});
        });
        }catch(error){
            res.status(500).send(error)
        }
}

export async function getmovie(req,res){
    try {
        const data=await movieSchema.find();
        res.status(200).send(data)
        console.log(data);
    } catch (error) {
        res.status(500).send(error)
    }
}


export async function getforedit(req,res) {
    try {
        const {id}=req.params;
        console.log(id);
        const data = await movieSchema.findOne({_id:id})
        console.log(data);
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}
export async function getdataforedit(req,res) {
    try {
        const {id}=req.params;
        console.log(id);
        const data = await movieSchema.findOne({_id:id})
        console.log(data);
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}
export async function deletemovie(req, res) {
    try {
        const { id } = req.params;
        console.log(id);    

      await movieSchema.deleteOne({_id:id});
       res.status(200).send({msg:"successfully deleted"})
    } catch (error) {
        console.error(error);
        res.status(400).send({ error});
    }
}


export async function updatemovie(req,res) {
    try {
        const {id}=req.params;
        console.log(id);
    const {...movie}=req.body
    await movieSchema.updateOne({_id:id},{$set:{...movie}})
        res.status(201).send({msg:"updated"})
    } catch (error) {
        res.status(400).send(error)
    }
}
export async function userRegister(req,res) {

    const {username,password,cpassword}=req.body
console.log(password);
    if(!(username&&password&&cpassword))
        return res.status(404).send("fields are empty")

    if(password!==cpassword)
        return res.status(404).send("password not matched")

bcrypt.hash(password,10).then(async(hpassword)=>{
    userSchema.create({username,password:hpassword}).then(()=>{
        return res.status(201).send({msg:"successfully created"})

    })
    .catch((error)=>{
        return res.status(400).send({error:error})
    })
}).catch((error)=>{
    res.status(400).send({error:error})
})
    
}
export async function userLogin(req,res){
    try {
        const {username, password}=req.body;
        const user=await userSchema.findOne({username})
        if(user == null)return res.status(404).send({msg:"user not found"})
            const id = user._id
        const success= await bcrypt.compare(password,user.password);
        if(success!==true) return res.status(400).send({msg:"password not matched"})
            const token=await sign ({id,username},process.env.JWT_KEY,{expiresIn:"24h"})
        return res.status(200).send({token})
    } catch (error) {
        res.status(400).send({error:error})
    }
}

export async function Home(req,res){
    const {id,username}=req.user
    console.log(req.user);
    res.status(200).send({username})
}
