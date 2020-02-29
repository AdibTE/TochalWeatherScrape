const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');
const cors = require('cors');

app.use(cors())

app.get('/:range', (req, res) => {
    request(`https://www.snow-forecast.com/resorts/Tochal/forecasts/feed/${req.params.range}/m`, (err, response, html) => {
        if (!err && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const botData = $('#table-temp').find('td').first();
            let temp = botData.text().replace(/\D+/gm, '').split('');
            let outlook = $('#table-outlook').find('td').first().find('img').attr('alt');
            let data = {
                min: temp[1],
                max: temp[0],
                outlook
            };
            res.json(data)
        }
    });
});

// Listen port
let port = process.env.PORT || 10;
app.listen(port, () => {
    console.log(`[ LISTENING ON PORT ${port} ]`);
});