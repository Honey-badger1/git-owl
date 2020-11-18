
"use strict";

let gimmeStat = {
  

  
    json: async (userConfig) => {
        let stat = require('./stat');
        let defaultConfig = require('./env');
        defaultConfig = Object.assign(defaultConfig, userConfig);
        let specialParams = {
            output: "json"
		}
        return await stat(defaultConfig,specialParams);
    },
}

module.exports = gimmeStat;