ty3status-module-weather
=====================

Displays the current weather conditions. The weather data is pulled from [Dark Sky](https://darksky.net). In order to
use module you must first register for a [developer key](https://darksky.net/dev/), and set a latitude and longitude. It
is recommended to set the interval to a longer time, like 600 seconds so you do not surpass the daily limit.

        
Installation
------------

Install the [Weather Icons](https://erikflowers.github.io/weather-icons/) pack into your system.

Then install the ty3status-module-weather as a global node module.

    npm install -g ty3status-module-weather
    
Add the following to your ty3status configuration:

    - type: module
      module: "/path/to/global/node_modules/ty3status-module-weather"
      interval: 600
      params:
        lat: 00.000
        long: -00.000
        key: xxxxxxxxxxxxxxxxxxxxxxxxxxxx

*To find the path of your global node_modules, run `npm root -g`*
