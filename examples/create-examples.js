const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const xmlRenderer = require('../src/index');

const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');

rimraf.sync(outputDir + '**/*.html');

const xmlFiles = fs.readdirSync(inputDir);
xmlFiles.forEach(async (filename) => {
    console.log(`Processing ${filename}...`);

    const name = filename.split('.')[0];
    const xml = fs.readFileSync(path.join(inputDir, filename)).toString();

    let html = await xmlRenderer.renderXml(xml);

    // For the examples we are going to wrap them in a body tag so UTF8 symbols display correctly
    // and add some default styling to the whole page.
    html = `<html lang="en">
        <head>
            <meta charset="UTF-8" />
            <style type="text/css">
                body {
                    margin: 0;
                    padding: 0;
                }
            </style>
        </head>
        <body>${html}</body>
    </html>`;

    fs.writeFileSync(
        path.join(outputDir, name + '.html'),
        html
    );
});
