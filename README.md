# express-view-render-screenshot-tool

This is meant to sit aside a prototype - it will get all the .html files in a folder (with sub folders), convert them to urls and take a screenshot of them using puppeteer

The following vars can be set

```
URL= // set to default to http://localhost:3000
REPLACEMENT_URL= // the part of the url you want to replace 
SCREENSHOT_FOLDER= // where you want the screenshots to go
DIR= // place where you want to get the views from

```

Example:

```
DIR=app/view/new REPLACEMENT_URL=app/view/new node index.js
```

This will find anything in the new folder and append it with the default url so for example file app/view/new/page/index.html becomes http://localhost:3000/page/index.html

Currently this will only look at html files.