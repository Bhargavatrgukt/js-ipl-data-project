const dataFormatChange=require("../data/csvToJson")
const fs=require("fs")
const path=require("path");

//Find a player who has won the highest number of Player of the Match awards for each season



const matchFilePath=path.join(__dirname,'../data/matches.csv');



const matchesData=dataFormatChange(matchFilePath);

let result=matchesData.reduce((acc,match)=>{
  if(!acc[match["season"]]){
    acc[match["season"]]={}
  }
  
  if (!acc[match["season"]][match["player_of_match"]]){
    acc[match["season"]][match["player_of_match"]]=1
  }else{
    acc[match["season"]][match["player_of_match"]]+=1
  }
  return acc
},{})

let filteredResult={}

for(let season in result){

    let player_of_match="";
    let count=0
  
    for (let player in result[season] ){
       if(result[season][player]>count){
         count=result[season][player];
         player_of_match=player;
       }
    }
    filteredResult[season]={"player":player_of_match,"no_of_times":count};

}



const outputPath=path.join(__dirname,"../output/6-playerOfTheMatch.json");

fs.writeFileSync(outputPath,JSON.stringify(filteredResult,null,6));