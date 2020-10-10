
"use strict";

let gimmeStat = {
  

  
    json: (userConfig) => {
        let stat = require('./stat');
        let defaultConfig = require('./env');
        defaultConfig = Object.assign(defaultConfig, userConfig);
        let specialParams = {
            output: "json"
        }
        return stat(defaultConfig,specialParams);
    },
}

module.exports = gimmeStat;