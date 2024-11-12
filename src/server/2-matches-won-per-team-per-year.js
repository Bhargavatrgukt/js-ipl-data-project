const dataFormatChange=require("../data/csvToJson")
const fs=require("fs")

const path=require("path");

const filePath=path.join(__dirname,"../data/matches.csv");

const matchesData=dataFormatChange(filePath);


const result=matchesData.reduce((acc,match)=>{
  if(!acc[match["season"]]){
    acc[match["season"]]={}
  }
  
  acc[match["season"]][match["winner"]]=(acc[match["season"]][match["winner"]] || 0 )+1

  return acc 
},{}
)



const outputPath=path.join(__dirname,"../output/2-matches-won-per-team-per-year.json");

fs.writeFileSync(outputPath,JSON.stringify(result,null,6));