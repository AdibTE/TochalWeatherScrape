const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');
const cors = require('cors');

app.use(cors());

app.get('/:range', (req, res) => {
	request(
		`https://www.snow-forecast.com/resorts/Tochal/forecasts/feed/${req.params.range}/m`,
		(err, response, html) => {
			if (!err && response.statusCode == 200) {
				const $ = cheerio.load(html);
				let allData = [];
				for (i = 0; i < 5; i++) {
                    let day = $('#table-day').find('td').eq(i).children().text();
					let outlook = $('#table-outlook').find('td').eq(i).find('img').attr('alt');
					let Data = $('#table-temp').find('td').eq(i);
					let temp = Data.text().split('|');
					let data = {
						min: parseInt(temp[1]),
						max: parseInt(temp[0]),
                        outlook,
                        day
					};
					allData.push(data)
				}
				res.json(allData);
			}
		}
	);
});

// Listen port
let port = process.env.PORT || 10;
app.listen(port, () => {
	console.log(`[ LISTENING ON PORT ${port} ]`);
});
