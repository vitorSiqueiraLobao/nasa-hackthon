const csvFilePath='cleaned_data.csv'
const csv=require('csvtojson');
const fs = require('fast-csv');
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})
 
// Async / await usage
const jsonArray=csv().fromFile(csvFilePath).then(function(objteste){
   fs.writeFile('novo.json',JSON.stringify(objteste))
})

