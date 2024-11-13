const dataFormatChange=require("../data/csvToJson")
const fs=require("fs");
const path=require("path");

const filePath=path.join(__dirname,"../data/deliveries.csv");



const deliveriesData=dataFormatChange(filePath);



const result={}

for(let delivery of deliveriesData ){
    if(delivery["batsman"]===delivery["player_dismissed"] && delivery["dismissal_kind"]!=="run out"){
        let batman=delivery["batsman"];
        let bowler=delivery["bowler"]
        let batsmanBowlerPair=batman+"--vs--"+bowler 
        if(!result[batsmanBowlerPair]){
            result[batsmanBowlerPair]=1
        }else{
            result[batsmanBowlerPair]+=1
        }

    }
}

console.log(Math.max(...Object.values(result))); //I got highest as 7

console.log( Object.keys(result).length)  // length of a result is  5494

//step2 --->getting highest from this pair 

// Convert the object to an array of [key, value] pairs
let sortedArray = Object.entries(result).sort((a, b) => b[1] - a[1]);



const outputPath=path.join(__dirname,"../output/8-batsmenVSBowler.json");

fs.writeFileSync(outputPath,JSON.stringify(JSON.stringify(sortedArray[0]),null,2));



