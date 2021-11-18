const googleTrends = require('google-trends-api');
const { google } = require("googleapis");

var express = require('express');
var cors = require('cors');
var app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//-------------------------------------------
//-------------------------------------------

app.get("/", (req, res) => {
    res.render("index");
  });
//-------------------------------------------
app.get("/:keyword/:keyword2/:keyword3", async (req, res) => {
    try {

        //console.log('reached')
        var result = [];
        var result2 = [];
        var result3 = [];
        var result4 = []

        googleTrends.interestOverTime({
                keyword: req.params.keyword
            })
            .then(function(results) {
                // console.log((JSON.parse(results).default.timelineData[0]));

                JSON.parse(results).default.timelineData.map((data, i) => {
                    result.push({
                        'date': data.formattedTime,
                        'value': data.value[0]
                    })

                })

            }).then(function() {
                googleTrends.interestOverTime({
                        keyword: req.params.keyword2
                    })
                    .then(function(results) {
                        // console.log((JSON.parse(results).default.timelineData[0]));

                        JSON.parse(results).default.timelineData.map((data, i) => {
                            result2.push({
                                'date': data.formattedTime,
                                'value': data.value[0]
                            })

                        })

                    })
                    .then(function() {
                        googleTrends.interestOverTime({
                                keyword: req.params.keyword3
                            })
                            .then(function(results) {
                                // console.log((JSON.parse(results).default.timelineData[0]));
        
                                JSON.parse(results).default.timelineData.map((data, i) => {
                                    result3.push({
                                        'date': data.formattedTime,
                                        'value': data.value[0]
                                    })
        
                                })
        
                            })
                            .then(function() {
                               googleTrends.interestOverTime({
                                keyword: req.params.keyword + " " + req.params.keyword2 + " " + req.params.keyword3
                            })
                            .then(function(results) {
                                // console.log((JSON.parse(results).default.timelineData[0]));

                                JSON.parse(results).default.timelineData.map((data, i) => {
                                    result4.push({
                                        'date': data.formattedTime,
                                        'value': data.value[0]
                                    })

                                })
                                var final = new Array(result.length + 1);
                                final[0] = new Array(5);
                                final[0][0] = "Years";
                                final[0][1] = req.params.keyword;
                                final[0][2] = req.params.keyword2;
                                final[0][3] = req.params.keyword3;
                                final[0][4] = req.params.keyword + " " + req.params.keyword2+ " " + req.params.keyword3;
                                for (var i = 1; i < final.length; i++) {
                                    final[i] = new Array(5);
                                    final[i][0] = result[i - 1] && result[i - 1].date ? result[i - 1].date : "";
                                    final[i][1] = result[i - 1] && result[i - 1].value;
                                    final[i][2] = result2 && result2.length && result2[i - 1].value ? result2[i - 1].value : 0
                                    final[i][3] = result3 && result3.length && result3[i - 1].value ? result3[i - 1].value : 0
                                    final[i][4] = result4 && result4.length && result4[i - 1].value ? result4[i - 1].value : 0

                                }
                                res.json(final)

                            })

                    })
            })
        })

    } catch (err) {
        console.log(err)
    }
});
//-------------------------------------------
app.get('/:country', async (req, res) => {
    try {
        var result = []
        await googleTrends.dailyTrends({
            geo: req.params.country
        }).then(function(results) {
            var arr = JSON.parse(results).default.trendingSearchesDays[0].trendingSearches
            for (var i = 0; i < arr.length; i++) {
                result.push(arr[i].title.query)
            }
            res.json(result)
        })
        //res.json({'trend1':trend1,'trend2':trend2,'trend3':trend3})
    } catch (err) {
        console.log(err)
    }
});
//-------------------------------------------
app.post("/", async (req, res) => {
    try {

   var values = req.body; 
   // DEMO OF CONSTRUCT AND DEESTRUCTURE OBJ
   const valores = JSON.stringify(values);
   const trends = valores.replace(/[^a-zA-Z ]/g, "");
   let country_nameS = trends.indexOf('countryname');
   let trend_titleS = trends.indexOf('trendtitle');
   let trend_urlS = trends.indexOf('trendurl');
   let formatted_trafficS = trends.indexOf('formattedtraffic');
   let lengthS = trends.length;
   const country_name = trends.slice(country_nameS+11,trend_titleS);
   const trend_title = trends.slice(trend_titleS+10,trend_urlS);
   const trend_url = trends.slice(trend_urlS+8,formatted_trafficS);
   const formatted_traffic = trends.slice(formatted_trafficS+16,lengthS);
   /*
   console.log(country_name);
   console.log(trend_title);
   console.log(trend_url);
   console.log(formatted_traffic);
   */
   //const country_name = JSON.parse(country_name);
   //const { country_name, trend_title, trend_url, formatted_traffic} = values;

   console.log("SPREAD ",trends);
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    // Create client instance for auth
    const client = await auth.getClient();
  
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
  
    const spreadsheetId = "1SRDs3lERi5iJn_G7stOyGXLz1Rerkk3wntFbKbBbWm0";
  
    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });
  
    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Página1!A:F",
    });
  
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Página1!A:F",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[country_name, trend_title, trend_url, formatted_traffic]],
      },
    });
  
    res.send("Successfully submitted! Thank you!");
    // res.send(metadata.data);
} catch (err) {
    console.log(err)
}
  });
//-------------------------------------------
app.listen(process.env.PORT || '3001', function() {
    console.log("Server started!!")
});