const dataFormatChange=require("../data/csvToJson")
const fs=require("fs")
const path=require("path");


const filePath=path.join(__dirname,"../data/deliveries.csv");
const matchFilePath=path.join(__dirname,'../data/matches.csv');


const deliveriesData=dataFormatChange(filePath);
const matchesData=dataFormatChange(matchFilePath);

//MatchId 
const matchIdsArray = matchesData.reduce((acc, match) => {  
    if (match.season === "2015") {
      acc.push(match.id);
    }
    return acc;
  }, []);   
  
//FiterDeliveries  
const filteredDeliveriesData=deliveriesData.filter(delivery=>matchIdsArray.includes(delivery.match_id));

//console.log(filteredDeliveriesData.length)

//calculation no.of balls && no.of runs a bowler given in a year 2015

const bowlerStats=filteredDeliveriesData.reduce((acc,delivery)=>{
     if(!acc[delivery["bowler"]]){
        acc[delivery["bowler"]]={
            "no_of_balls":0,
            "no_of_runs":0
        }
     }
     
     acc[delivery["bowler"]].no_of_balls+=1
     acc[delivery["bowler"]].no_of_runs+=parseInt(delivery["total_runs"])
     
    return acc;
},{})

// console.log(bowlerStats)

let newObj={}

for(let bowler in bowlerStats){
    const{no_of_balls,no_of_runs}=bowlerStats[bowler];
    const overs=no_of_balls/6;
    
    const economy=no_of_balls>0?(no_of_runs/overs).toFixed(2):0;
    
    newObj[bowler]=economy;
    
}

const top10=Object.entries(newObj).sort((a,b)=>a[1]-b[1]).slice(0,10)



const outputPath=path.join(__dirname,"../output/4-topEconomyBowlers.json");

fs.writeFileSync(outputPath,JSON.stringify(top10,null,2));