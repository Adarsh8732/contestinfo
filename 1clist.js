const cheerio = require("cheerio");
const request = require("request");
const forcalender = require("./2clist");
const fs = require("fs");
// const { fstat } = require("fs");
let url = "https://clist.by/";
request(url,cb);
function cb(err,response,html){
    if(err){
        console.error(err);
    }
    else{
    let chSelector = cheerio.load(html);
    let ct = chSelector("#time");
    // let current_time = chSelector(ct[0]).find("#time");
     ct = chSelector(ct[0]).text().split('+')[0];
    // console.log(ct[0]);
    let cntstBlock = chSelector(".tab-content.list-calendar-views");
    // console.log(cntstBlock.length);
    let listview = chSelector(cntstBlock[0]).find("#list-view #contests");
    // console.log(listview.length);
    let running = chSelector(listview[0]).find(".row.contest.running.bg-success");
    // console.log(running.length);
    // console.log(running[1])
    let runningarr = [];
    for(let i =0;i<running.length;i++)
    {  
        // let val = chSelector(running[i]).hasClass("subcontest");
        if(!chSelector(running[i]).hasClass("subcontest")){
            runningarr.push(running[i]);
        }
    }
    //  console.log(runningarr.length);
    let comming = chSelector(listview[0]).find(".row.contest.coming");
    // console.log(comming.length);
    let commingarr=[];
    for(let i=0;i<comming.length;i++){
        if(!chSelector(comming[i]).hasClass("subcontest")){
           commingarr.push(comming[i]);
        }
    }
    // console.log(commingarr.length);
    // console.log(runningarr[0]);
    // console.log(running[0]);
      runningfn(runningarr,chSelector,ct);
      commingfn(commingarr,chSelector,ct);
    }
     forcalender.fn();
    
}
function runningfn(runningarr,chSelector,ct){
   
    //console.log(runningarr.length);
    // let path = __dirname;
    let arr = [];
    let obj={
        current_time : ct
    }
    arr.push(obj);
    let contentInfile = JSON.stringify(arr);
    fs.writeFileSync("running.json",contentInfile+"\n");
    for(let i=0;i<runningarr.length;i++){
        let endtiming = chSelector(runningarr[i]).find(".col-md-5.col-sm-12.start-time");
    //    console.log(chSelector(endtiming[0]).text().trim());
       endtiming = chSelector(endtiming[0]).text().trim();
        let contestinfo = chSelector(runningarr[i]).find(".col-md-7.col-sm-8.event .contest_title ");
        let contestinfoarr = chSelector(contestinfo[0]).find("a");

        // console.log(contestinfoarr[1])
        //console.log(chSelector(contestinfoarr[1]).text());//
        let title = chSelector(contestinfoarr[1]).text();
        let linktocontest = chSelector(contestinfoarr[1]).attr("href");
        let obj={
            endingTime: endtiming,
            title : title,
            link: linktocontest
        }
        //  console.log(obj);
        let content = fs.readFileSync("running.json");
        //console.log(content);
        let arr = JSON.parse(content);
        arr.push(obj);
        let contentInFile = JSON.stringify(arr);
        fs.writeFileSync("running.json",contentInFile+"\n");
    }
}
function commingfn(commingarr,chSelector,ct){
    // console.log(commingarr.length);
    let arr = [];
    let obj={
        current_time : ct
    }
    arr.push(obj);
    let contentInfile = JSON.stringify(arr);
    fs.writeFileSync("coming.json",contentInfile+"\n");
    for(let i=0;i<commingarr.length;i++){
    let starttiming = chSelector(commingarr[i]).find(".col-md-5.col-sm-12.start-time");
    // console.log(chSelector(starttiming[0]).text().trim());
    starttiming = chSelector(starttiming[0]).text().trim();
    let contestinfo = chSelector(commingarr[i]).find(".col-md-7.col-sm-8.event .contest_title ");
    let contestinfoarr = chSelector(contestinfo[0]).find("a");

    // console.log(contestinfoarr[1])
    // console.log(chSelector(contestinfoarr[1]).text());
    let title = chSelector(contestinfoarr[1]).text();
    let linktocontest = chSelector(contestinfoarr[1]).attr("href");
    // console.log(linktocontest);
    let obj={
        startTime: starttiming,
        title : title,
        link: linktocontest
    }
    // console.log(obj);

    let content = fs.readFileSync("coming.json");
        let arr = JSON.parse(content);
        arr.push(obj);
        let contentInFile = JSON.stringify(arr);
        fs.writeFileSync("coming.json",contentInFile+"\n");
    }
}