var httpGet = require('https').get;

var baseUrl = "https://api.darksky.net/forecast/";
var urlExcludes = "/?exclude=minutely,hourly,daily,alerts,flags";

var iconLookup = {
    "clear-day": "<span font_desc='WeatherIcons'></span>",
    "clear-night": "<span font_desc='WeatherIcons'></span>",
    cloudy: "<span font_desc='WeatherIcons'></span>",
    fog: "<span font_desc='WeatherIcons'></span>",
    "partly-cloudy-day": "<span font_desc='WeatherIcons'></span>",
    "partly-cloudy-night": "<span font_desc='WeatherIcons'></span>",
    rain: "<span font_desc='WeatherIcons'></span>",
    sleet: "<span font_desc='WeatherIcons'></span>",
    snow: "<span font_desc='WeatherIcons'></span>",
    wind: "<span font_desc='WeatherIcons'></span>",
};

module.exports = function (dc, config) {
    var isRunning = false;
    var intervalId, userUrl, timeout, dataCallback;

    dataCallback = dc;
    timeout = config.interval * 1000;

    if (!config.params.key) {
        throw new Error("'key' must be defined");
    }
    if (!config.params.lat) {
        throw new Error("'lat' must be defined");
    }
    if (!config.params.long) {
        throw new Error("'long' must be defined");
    }

    userUrl = config.params.key + "/" + config.params.lat + "," + config.params.long;

    return {
        start: start,
        stop: stop,
        tick: tick,
        clicked: clicked
    };

    function start()
    {
        if (isRunning) return;

        isRunning = true;
        tick();
        intervalId = setInterval(tick, timeout);
    }

    function stop()
    {
        if (!isRunning) return;

        isRunning = false;
        clearInterval(intervalId);
    }

    function tick()
    {
        makeRequest(function (rawResult) {
            try {
                var parsedResult = processDarkSkyData(rawResult);
                output(parsedResult);
            } catch (err) {
                // Ignore the errors
            }
        });
    }

    function clicked()
    {
        tick()
    }

    function makeRequest(callback)
    {
        httpGet(baseUrl + userUrl + urlExcludes, function (response)
        {
            var data = "";

            response.on("data", function (d)
            {
                data = data + d
            });
            response.on("end", function ()
            {
                callback(data.toString());
            });
        });
    }

    function processDarkSkyData(data) {
        var parsedData = JSON.parse(data);

        return {
            feelsLike: parsedData.currently.apparentTemperature,
            icon: parsedData.currently.icon,
            realTemp: parsedData.currently.temperature,
            summary: parsedData.currently.summary
        };
    }

    function output(data) {
        var iconString = iconLookup.hasOwnProperty(data.icon) ? iconLookup[data.icon] : "";
        var realTemp = Math.round(data.realTemp);
        var feelsLike = Math.round(data.feelsLike);

        var outputString = iconString + " " + data.summary + " @ " + realTemp + "F";

        if (realTemp !== feelsLike) {
            outputString += " (" + feelsLike + "F)"
        }

        dataCallback({
            full_text: outputString
        });
    }
};


