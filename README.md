ty3bar-module-weather
=====================

Displays the current weather conditions. The weather data is pulled from [Dark Sky](https://darksky.net). In order to
use module you must first register for a [developer key](https://darksky.net/dev/), and set a latitude and longitude. It
is recommended to set the interval to a longer time, like 600 seconds so you do not surpass the daily limit.

        
Installation
------------

    npm install -g ty3bar-module-weather
    
Add the following to your ty3bar configuration:

    - type: module
      module: "/path/to/global/node_modules/ty3bar-module-weather"
      interval: 600
      params:
        lat: 00.000
        long: -00.000
        key: xxxxxxxxxxxxxxxxxxxxxxxxxxxx

*To find the path of your global node_modules, run `npm root -g`*
