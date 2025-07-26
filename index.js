import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//"https://api.openweathermap.org/data/2.5/weather?q=London&APPID=2e8f035478dff1e2d39f7897232b18b2"
const API_URL="https://api.openweathermap.org/data/2.5/weather?q="

const id="&APPID=2e8f035478dff1e2d39f7897232b18b2";

app.post("/loc", async (req, res) => {
  console.log(req.body);
  
    const place=req.body["location"];
console.log(API_URL+place+id);
    try{
    const result = await axios.get(API_URL+place+id);
   const data=result.data;
   var temp =data.main.temp;  
   var Ctemp=(temp - 273.15);
   var c=Ctemp.toFixed(2);
   var iconcode = data.weather[0].icon;
   var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      var humidity=data.main.humidity;
   
   res.render("weatherDisplay.ejs", {temp:c+"C",img:iconurl,location: place ,hum:humidity});
} catch (error) {
  console.log(error);
    res.status(500);
  
}
});


app.get("/",(req,res)=>{
res.render("index.ejs");
});

app.get("/mainn",(req,res)=>{
res.render("index.ejs");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  