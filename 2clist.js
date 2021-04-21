const puppeteer = require("puppeteer");

const prompt = require("prompt");

let cTab;
async function fn(){
    try{
        console.log("Do you want to save it google calender Or you want to download it");
        console.log("if you want to download it press d or D ");
        console.log("press s if you want to save it");
        console.log("press both if you want to do both press ds or DS");
        console.log("press N or n if you want nothing to do")
        var result = await new Promise(function (resolve, reject) {
            prompt.get('input', function (err, result) {
                resolve(result);
            });
        });
        if(result.input == 's'|| result.input =='S'||result.input =='ds'||result.input =='DS'){
            var result2 = await new Promise(function (resolve, reject) {
                prompt.get('email', function (err, result) {
                    resolve(result);
                });
            });
            var result3 = await new Promise(function (resolve, reject) {
                prompt.get('passward', function (err, result) {
                    resolve(result);
                });
            });
        }
        if(result.input=='n'|| result.input=='N'){
            return ;
        }
        let browserOpenPromise = puppeteer.launch({
            headless:false,
             executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
            //executablePath: 'C:\\Users\\joe\\AppData\\Local\\Microsoft\\Edge SxS\\Application\\msedge.exe',
            defaultViewport:null,
            args:["--start-maximized"]

        });
        let browser = await browserOpenPromise;
        let allTabArr= await browser.pages();
        cTab = allTabArr[0];
       
        await cTab.goto("https://www.hackerrank.com/calendar");
      
        if(result.input == 'd'||result.input =='D')
        {
          //await cTab.click(".btn.btn-text.fullcalendar.calendar_separator");
          await download(".btn.btn-text.fullcalendar.calendar_separator");
          // console.log("d pressed");
        }
        else if(result.input == 's'|| result.input =='S')
        { 
            cTab = await browser.newPage();
            await save(result2.email,result3.passward,cTab);
        }
        else if(result.input == 'ds'||result.input == 'DS'){
            // await cTab.click(".btn.btn-text.fullcalendar.calendar_separator");
            await download(".btn.btn-text.fullcalendar.calendar_separator");
            cTab = await browser.newPage();
            await save(result2.email,result3.passward,cTab);

        }
        else{
            console.log('please input valid input');
        }

    }
    catch(err){
       console.error(err);
    }
}
async function download(selector){
    await cTab.click(selector);
    // await cTab.waitfor(500);
}
async function save(email,password,cTab){
       cTab.goto("http://www.google.com/calendar/render?cid=http://www.hackerrank.com/calendar/cal.ics")
    //    cTab = allTabArr[1];
       await cTab.waitForSelector("input[type='email']");
       await cTab.type("input[type='email']",email,{delay:200});
       await cTab.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
       await cTab.waitForSelector("input[type='password']");
       await cTab.type("input[type='passwaord']",password,{delay:200});
       await cTab.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b")
       await cTab.waitForSelector(".uArJ5e.UQuaGc.kCyAyd.l3F1ye.ARrCac.HvOprf.M9Bg4d");
       await cTab.click(".uArJ5e.UQuaGc.kCyAyd.l3F1ye.ARrCac.HvOprf.M9Bg4d");
}

module.exports={
    fn
}


// const puppeteer = require('puppeteer');
// (async () => {
//   const browser = await puppeteer.launch({ headless: false})
//   const page = await browser.newPage()

//   const navigationPromise = page.waitForNavigation()

//   await page.goto('https://accounts.google.com/')

//   await navigationPromise

//   await page.waitForSelector('input[type="email"]')
//   await page.click('input[type="email"]')

//   await navigationPromise

//   //TODO : change to your email 
//   await page.type('input[type="email"]', email,{delay:100})

//   await page.waitForSelector('#identifierNext')
//   await page.click('#identifierNext')

// //   await page.waitFor(500);

//   await page.waitForSelector('input[type="password"]')
//   await page.click('input[type="email"]')
// //   await page.waitFor(500);

//   //TODO : change to your password
//   await page.type('input[type="password"]', password,{delay:100})

//   await page.waitForSelector('#passwordNext')
//   await page.click('#passwordNext')

//   await navigationPromise

//   //await browser.close()
// })()