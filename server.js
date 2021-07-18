import express from 'express';
import htmlToImage from "./lib/htmlToImage.js";


const app = express();



app.use(express.json());

app.get('/', (_,res,__) => {
    res.send(`
    
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Poster APi</title>
</head>
<body>
        <h5>Welcome </h5>
</body>
</html>
`)
})

app.get('/image', async (req,res) => {
    try {
        const {text,color, logo} = req.query;
    if(!text){
       return res.json({
            status:false,
            message:"Query Text is Required"
        })
    }else if(!color){
      return  res.json({
            status:false,
            message:"Query Color is Required"
        })
    }else if(!logo){
      return  res.json({
            status:false,
            message:"Logo Url is Required"
        })
    }
    

    const imageBuffer = await htmlToImage(`
    <html>
    <head>
    <style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500;900&display=swap');
</style>
    </head>

    <body>
   <div id="body" style="height:1024px;width:1024px;">
    
    <div style="    height: 716;
    max-height: 716;
    background-color: #${color};
    display: flex;
    align-items: center;
    align-content: center;
    padding: 25px;
    overflow: hidden;">

    
    <h1 style="word-break: break-word;font-size:110pt; color:white; font-weight:bold;font-family: 'Roboto', sans-serif;    line-height: 140px;">${text}</h1>
    </div>
    <div style="padding-left: 25px;
    background:white;
    height: 308px;
    max-height: 258px;
    display: flex;
    align-items: center;">
        <img src="${logo}" style="    height: 105px" />
    </div>
   </div>
</body>
</html>
    `);



    res.set("Content-Type", "image/png");
  return  res.send(imageBuffer);
    } catch (error) {
            res.send("Something went wrong..");
            console.log(error);
    }
})


app.listen(3000, () => {
    console.log("Server running");
})