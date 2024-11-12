const dataFormatChange=require("../data/csvToJson")
const fs=require("fs")

const path=require("path");

const filePath=path.join(__dirname,"../data/matches.csv");

const matchesData=dataFormatChange(filePath);


const result=matchesData.reduce((acc,element)=>{
  if(acc[element["season"]]){
    acc[element["season"]]+=1
  }else{
    acc[element["season"]]=1
  }
  return acc 
},{}
)

console.log(result)

const outputPath=path.join(__dirname,"../output/1-matches-per-year.json");

fs.writeFileSync(outputPath,JSON.stringify(result,null,4));