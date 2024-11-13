const dataFormatChange=require("../data/csvToJson")
const fs=require("fs");
const path=require("path");

const filePath=path.join(__dirname,"../data/deliveries.csv");



const deliveriesData=dataFormatChange(filePath);


//step 1 :- calcutaing Bowler stats

const bowlerStat={}

for(let delivery of deliveriesData){
    if(delivery["is_super_over"]==="1"){
        if(!bowlerStat[delivery["bowler"]]){
            bowlerStat[delivery["bowler"]]={no_of_balls:0,runs_given:0}
        }else{
            bowlerStat[delivery["bowler"]].no_of_balls+=1
            bowlerStat[delivery["bowler"]].runs_given+=parseInt(delivery["total_runs"])
        }
    }
}


//step 2 : - calculating bowler economy and lowest economy_bower 

let lowestEconomyBowlerName=""
let lowestEconomy=100000000000;

for (let bowler in bowlerStat){
    const overs=bowlerStat[bowler].no_of_balls/6
    const economy=(bowlerStat[bowler].runs_given/overs).toFixed(2)
    bowlerStat[bowler]["economy"]=economy;
    const economyNum=parseFloat(economy)
    if(economyNum<lowestEconomy){
        lowestEconomy=economyNum;
        lowestEconomyBowlerName=bowler
    }
    
}

let result={lowestEconomyBowlerName,stats:bowlerStat[lowestEconomyBowlerName]}


const outputPath=path.join(__dirname,"../output/9-bestEconomySuperOver.json");
fs.writeFileSync(outputPath,JSON.stringify(JSON.stringify(result),null,2));

