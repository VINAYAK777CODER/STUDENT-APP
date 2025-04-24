const http=require('http');
const fs=require('fs').promises;
const PORT=3005
const server=http.createServer((req,res)=>{

    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-method','GET,POST,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');

    if(req.method=="OPTIONS"){
        res.statusCode=200;
        return res.end();
    }


    if(req.url=="/register" && req.method=="POST"){
        try{
        let body='';
        let arr=[];

        req.on('data',chunk=>{
            body+=chunk;
        })

        req.on('end',async()=>{
          const {name,email,password}=JSON.parse(body);
          console.log("Name="+name);
                const data1=await fs.readFile('student.json',{encoding:'utf-8'});
                arr=JSON.parse(data1);
                console.log("data from file:")
                console.log(arr);
                const result=arr.find(ele=>ele.email==email);
               console.log(result);
               if(result){
                console.log("Inside statue true");
                res.setHeader('Content-Type','application/json');
                return res.end(JSON.stringify({msg:"Email is already registerd"}))
               }
         else{
               arr.push({name,email,password});
               console.log(arr);
           fs.writeFile('student.json',JSON.stringify(arr,null,2));
           res.end(JSON.stringify({msg:"User successfully register"}));
         }
           
        })
    }catch(err){
        res.end(JSON.stringify({msg:"Error is:"+err}));
    }
    }

    if(req.url=="/login" && req.method=="POST"){
        try{
        let body='';
        let arr=[];

        req.on('data',chunk=>{
            body+=chunk;
        })
        req.on('end',async()=>{
       console.log(body);
       const {email,password}=JSON.parse(body);
       const data1=await fs.readFile('student.json',{encoding:'utf-8'});
       arr=JSON.parse(data1);
       const result=arr.find(ele=>ele.email==email && ele.password==password);
       if(result){
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify({msg:"Success"}));
       }
       else{
        res.setHeader('Content-Type','application/json');
       res.end(JSON.stringify({msg:"User is invalid"}));
       }
        })
    }catch(err){
        res.end(JSON.stringify({msg:"Error is:"+err}));
    }
    }

   
})

server.listen(PORT,()=>{
    console.log("Serve is running on::"+PORT);
    
})