const express=require("express");
const app=new express();
const fs=require("fs");
app.use(express.json());

const data=require("./db.json");

app.get("/hospitals",(req,res)=>{
    res.send(data);
    })

app.post("/hospitals",(req,res)=>{
    data.push(req.body);
    fs.writeFile("db.json",JSON.stringify(data),(err,resp)=>{
        if(err){
            res.send("Data couldn't be written.");
            }
        else{
            res.send("Data entry successful.");
            }
        })
    })

app.put("/hospitals/:name",(req,res)=>{
    let name=req.params.name;
    data.forEach((item)=>{
        if(item.hospital==name){
            item.location=req.body.location;
            item.patients=req.body.patients;
            }
    })

fs.writeFile("db.json",JSON.stringify(data),(err,resp)=>{
    if(err){
        res.send("Data could not be updated.");
        }
    else{
        res.send("Successfully updated.");        
        }
    })
})

app.delete("/hospitals/:name",(req,res)=>{
    let name=req.params.name;
    let value=data.filter(item=>item.hospital!==name);
    fs.writeFile("db.json",JSON.stringify(value),(err,resp)=>{
        if(err){
            res.send("Unsuccessful delete attempt.");
            }
        else{
            res.send("Data deleted successfully.");
            }
    })
})

app.listen(3000);
console.log("Server listening to port 3000 now");