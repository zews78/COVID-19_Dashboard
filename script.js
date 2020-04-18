const express =require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.static('public'));
// to recognise incoming request object as array/string
app.use(express.urlencoded({extended: false}));




app.get('/',(req, res)=>{

    // fetch("https://api.covid19india.org/data.json", { method: "Get" })
    // .then(res => res.json())
    // .then((json) => {
    //     console.log(json.statewise.length);
    //     console.log(json.statewise[0]);
    //     res.render({india:json.statewise[0]});
        
    // });

    //display this page
    fetch("https://api.covid19india.org/data.json", { method: "Get" })
        .then(res => res.json())
        .then((json) => {
            // do something with JSON
            // console.log(json.statewise[0]);
            // for(let i=1;i<=json.statewise.length;i++){
            //     var state= json.statewise[i];
            //     console.log(state);
            // }
            
            json.statewise.push(json.statewise[0]);
            json.statewise.splice(0,1);
            console.log(json.statewise.length);
            res.render('zews.ejs',{items:json.statewise});
            
            
        });
});






// for(var i=0;i<10;i++){
// var x = document.getElementsByTagName('td');
// x[i].innerHTML="beta";
// }

// var row1= document.getElementById("row1");
// var x = row1.document.getElementsByTagName('td');
// x[1].innerHTML="INDIA";

// var table= document.getElementById("mytable");
// var newRow= table.insertRow();
// var newCell= newRow.insertCell(-1);
// var newText= document.createTextNode("helllo");
// newCell.appendChild(newText);

// z= document.createElement('td');
// y=document.createTextNode("hola");
// z.appendChild(y);
// x= document.getElementById("row1").appendChild(z);


app.listen(3001);


//statewise, no. of cases tested
//  https://api.covid19india.org/data.json
//district wise
//  https://api.covid19india.org/state_district_wise.json

