const dataFormatChange=require("../data/csvToJson")
const fs=require("fs")
const path=require("path");



const matchFilePath=path.join(__dirname,'../data/matches.csv');



const matchesData=dataFormatChange(matchFilePath);


let result=matchesData.reduce((acc,elem)=>{
  if(elem["toss_winner"]===elem["winner"]){
    if(!acc[elem["toss_winner"]]){
        acc[elem["toss_winner"]]=0
    }
    acc[elem["toss_winner"]]+=1
  
  }
  return acc 
},{})


const outputPath=path.join(__dirname,"../output/5.tossAndMatchWinner.json");

fs.writeFileSync(outputPath,JSON.stringify(result,null,6));

