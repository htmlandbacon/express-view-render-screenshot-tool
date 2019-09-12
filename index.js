
const recursive = require("recursive-readdir");
const puppeteer = require('puppeteer');


// const dirFull = "cmg-app/sprint_12/sprint_12_main_prototype/";
// const dirBase = "app/views/";

const url = process.env.URL || "http://localhost:3000/";
const dirBase = process.env.REPLACEMENT_URL ||  "app/views/";
const screenshotFolder = process.env.SCREENSHOT_FOLDER || '/';
const dirFull = process.env.DIR;
const ignoreFolders = process.env.IGNORE;

if (dirFull === undefined) {
    console.log('===> Directory not set');
    process.exit(1);
}

function urlCleanUp(file) {
    return file.replace(dirBase, url);
}

recursive(dirBase + dirFull, function (err, files) {
    (async function() {
        for (var i = 0; i < files.length; i++) {
            let file = urlCleanUp(files[i]);
            let fileName = file.split("/");
            if (file.includes(".html") && (ignoreFolders && !file.includes(ignoreFolders))) {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.goto(file);
                    await page.screenshot({
                        fullPage: true,
                        path:`${screenshotFolder}${fileName[fileName.length-2]}-${fileName[fileName.length-1]}.png`
                    });
                    await browser.close();
            }
        }
    })();
  });