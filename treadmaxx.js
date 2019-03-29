
    
var treadmaxxData = require("./public/Treadmaxx2.json");
const fs = require('fs');


formattedData = () => {
    var result = [];
    treadmaxxData.map(tire => {
        const price = Number(tire.price);
        var descriptionPattern = /r[0-9][0-9]/i;
        
        let description = '';
        let size = tire.size;
            
        let splitIndex = size.search(descriptionPattern) + 3;
        
        
        const splitAt = splitIndex => size => [size.slice(0, splitIndex), size.slice(splitIndex)]
        const seperatedValues = splitAt(splitIndex)(size);
        
        size = seperatedValues[0];
        description = seperatedValues[1];
        const tread = "[" + tire.tread + "]";
        const load = "[" + tire.load + "]";
        description = description + tread + load;
        tire.distributor = "Treadmaxx"
        tire.description = description;
        tire.size = size;
        tire.price = price.toFixed(2);
        
        result += JSON.stringify(tire, null, 1) + ',\n';     
    })

    return result;
    
}


var data = [];
data.push([formattedData()]);

fs.writeFile('./public/treadMaxxFixed.json', data, (err) => {  
    if (err) throw err;
    console.log('Data written to file');
});





    
