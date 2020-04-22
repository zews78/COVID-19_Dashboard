const express =require('express');
const app = express();
const fetch = require('node-fetch');
const request = require('request');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('9ea7641448834c92a17de8c4cadc50f7');


app.use(express.static('public'));
// to recognise incoming request object as array/string
app.use(express.urlencoded({extended: false}));

// function update(){
//     console.log('hello boy');
// };
    

app.get('/india',(req, res)=>{

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
            console.log(json.statewise[0]);

            res.render('zews.ejs',{items:json.statewise});
            // var india = json.statewise[37];
            // var value= document.getElementById("confirmed");
            // value.innerHTML= india.confirmed;
            // console.log(india.confirmed);

        });
});

app.get('/world1',(req,res)=>{
    fetch("https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search", { method: "Get" })
    .then(res => res.json())
    .then((json) => {
        // do something with JSON
        // json.data.rows.push(json.data.rows[0]);
        // json.data.rows.splice(0,1);
        // console.log(json.Countries);
        res.render('world1.ejs',{items:json.data});
        console.log(json.data.rows.length);
    });
})


app.get('/world',(req,res)=>{
    fetch("https://api.covid19api.com/summary", { method: "Get" })
    .then(res => res.json())
    .then((json) => {
        // do something with JSON
        // json.data.rows.push(json.data.rows[0]);
        // json.data.rows.splice(0,1);
        // console.log(json.Countries);
        res.render('world.ejs',{items:json});
        console.log(json.Countries.length);
    });
})

app.get('/',(req, res)=>{
    res.render('ui.ejs');
});

app.get('/zone',(req, res)=>{
    res.render('zone.ejs');
});






app.get('/news',(req, res)=>{

    // To query /v2/top-headlines
    // All options passed to topHeadlines are optional, but you need to include at least one of them
    newsapi.v2.topHeadlines({
        // sources: 'bbc-news,the-verge',
        // q: 'bitcoin',
        category: 'health',
        language: 'en',
        country: 'in',
    }).then(response => {
        console.log(response);
        /*
        {
            status: "ok",
            articles: [...]
        }
        */
       res.render('news.ejs',{items:response.articles});
       console.log(response.articles[1]);
    });
});

    // To query sources
    // All options are optional
    // newsapi.v2.sources({
    //     // category: 'technology',
    //     language: 'en',
    //     sortBy: 'relevancy',
    //     sources: 'google-news-in',
    //     domains: 'https://news.google.com',

      
    //     // category: 'covid19',
    //     country: 'in'
    // }).then(response => {
    //     console.log(response);
    //     /*
    //     {
    //         status: "ok",
    //         sources: [...]
    //     }
    //     */
    // });
    
// function percentage(index){
//     var num=(items[index].confirmed)/(items[37].confirmed)*100;
//     n=num.toFixed(2);
//     return(n);

// }


        


// // app.get('/news',(req, res)=>{
// var url = 'http://newsapi.org/v2/top-headlines?' +
//           'country=in&' +
//           'apiKey=9ea7641448834c92a17de8c4cadc50f7';
// var req = new request(url);

// fetch(req)
//     .then(function(response){
//         console.log(response);
//     });
// // });





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
//country
//https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search

