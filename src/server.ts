import express from "express"
import cors from "cors"
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from 'jsonwebtoken';

const app = express();

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use(express.json());

//get all foods data
app.get("/api/foods",(req,res)=>{
     res.send(sample_foods); 
})

//get foods by search term
app.get("/api/foods/search/:searchTerm",(req,res)=>{
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods
    .filter((food)=>{
        return food.name.toLowerCase()
        .includes(searchTerm.toLowerCase())});
    res.send(foods);
})

//get all tags
app.get("/api/foods/tags",(req,res)=>{
    res.send(sample_tags);
})

//get foods tagnames
app.get("/api/foods/tags/:tagName",(req,res)=>{
    const tagName = req.params.tagName;
    const foods = sample_foods
    .filter(food=>{
        return food.tags?.includes(tagName)
      });
      res.send(foods);
})
//get food based in id

app.get("/api/foods/:id",(req,res)=>{
    const foodId = req.params.id;
    const food =  sample_foods.find(food =>{
        return food.id === foodId 
      });
    res.send(food);
})

app.post("/api/users/login",(req,res)=>{
    const {email,password} = req.body;
    const user = sample_users.find(user=>
         user.email === email && 
        user.password === password);

        if(user){
            res.send(generateTokenRes(user));
        }else{
            res.status(400).send("User name or Password invalid!")
        }
    })
   

    const generateTokenRes = (user:any)=>{
        const token = jwt.sign({
            email:user.email, isAdmin:user.isAdmin
        },"Some text for token",{
            expiresIn:"30d"  //options
        });

        user.token = token;
        return user;
    }
//create port
const port = 5000;

app.listen(port,()=>{
    console.log("Website served on http://localhost:"+port);
})