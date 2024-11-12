const dataFormatChange=require("../data/csvToJson")
const fs=require("fs")
const path=require("path");


const filePath=path.join(__dirname,"../data/deliveries.csv");
const matchFilePath=path.join(__dirname,'../data/matches.csv');


const deliveriesData=dataFormatChange(filePath);
const matchesData=dataFormatChange(matchFilePath);


const outputPath1=path.join(__dirname,"../output/matches.json");

fs.writeFileSync(outputPath1,JSON.stringify(matchesData,null,2));

const outputPath2=path.join(__dirname,"../output/deliveries.json");

fs.writeFileSync(outputPath2,JSON.stringify(deliveriesData,null,2));