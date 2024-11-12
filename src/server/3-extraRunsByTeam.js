const dataFormatChange=require("../data/csvToJson")
const fs=require("fs")

const path=require("path");

const filePath=path.join(__dirname,"../data/deliveries.csv");
const matchFilePath=path.join(__dirname,'../data/matches.csv');

const deliveriesData=dataFormatChange(filePath);
const matchesData=dataFormatChange(matchFilePath);

const matchIdsArray = matchesData.reduce((acc, match) => {
    if (match.season === "2016") {
      acc.push(match.id);
    }
    return acc;
  }, []);
  

const filteredDeliveriesData=deliveriesData.filter((delivery)=>matchIdsArray.includes(delivery["match_id"]))

//to find extra_runs per team in year 2016

const result=filteredDeliveriesData.reduce((acc,ball)=>{
   if(!acc[ball["bowling_team"]]){
    acc[ball["bowling_team"]]=Number(ball["extra_runs"])
   }else{
    acc[ball["bowling_team"]]+=Number(ball["extra_runs"])
   }
   return acc

},{})




const outputPath=path.join(__dirname,"../output/3-extraRunsByTeam.json");

fs.writeFileSync(outputPath,JSON.stringify(result,null,6));