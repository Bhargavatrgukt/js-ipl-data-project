const dataFormatChange=require("../data/csvToJson")
const fs=require("fs")
const path=require("path");


const filePath=path.join(__dirname,"../data/deliveries.csv");
const matchFilePath=path.join(__dirname,'../data/matches.csv');


const deliveriesData=dataFormatChange(filePath);
const matchesData=dataFormatChange(matchFilePath);



// Strike rate of a batsman for each season

//first-step is to filter the ids'by season

let years={}

for(let match of matchesData){
    if(!years[match["season"]]){
        years[match["season"]]=[];
    }
    years[match["season"]].push(match["id"])
}

//Step1 completed to extract id's from the matchesData with respective to year



//Step2 ectracting bat'sMen stats  with respective to year
let batsmenStats={}

for (let eachYear in years) {
    let eachYearDeliveries = deliveriesData.filter(delivery => years[eachYear].includes(delivery["match_id"]));
    
    if (!batsmenStats[eachYear]) {
        batsmenStats[eachYear] = {};
    }
  
    for(let eachDelivery of eachYearDeliveries){
        let batsman=eachDelivery["batsman"]
        let batsman_runs=parseInt(eachDelivery["batsman_runs"])
        if(!batsmenStats[eachYear][batsman]){
            batsmenStats[eachYear][batsman]={runs_played:0,balls_played:0}
        }
        batsmenStats[eachYear][batsman]["runs_played"]+=batsman_runs
        batsmenStats[eachYear][batsman]["balls_played"]+=1
    } 
}



//calculating StrikeRate  --->Final Step
for(let eachYear in batsmenStats){
    for(let player in batsmenStats[eachYear]){
        let runsPlayed = batsmenStats[eachYear][player].runs_played;
        let ballsPlayed = batsmenStats[eachYear][player].balls_played
        let strike_rate=((runsPlayed/ballsPlayed)*100).toFixed(2)
        batsmenStats[eachYear][player].strike_rate=strike_rate;
    }
}



const outputPath1=path.join(__dirname,"../output/7-strikeRateOfBatsmen.json");

fs.writeFileSync(outputPath1,JSON.stringify(batsmenStats,null,2));




