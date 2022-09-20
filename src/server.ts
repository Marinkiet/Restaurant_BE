import express from "express"
import cors from "cors"
import { sample_foods, sample_tags } from "./data";

const app = express();
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

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
//create port
const port = 5000;

app.listen(port,()=>{
    console.log("Website served on http://localhost:"+port);
})