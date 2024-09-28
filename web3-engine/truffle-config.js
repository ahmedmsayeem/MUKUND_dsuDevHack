const path = require("path");
const solc = require("solc");
const fs = require("fs");

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1", // Ganache host
            port: 7545,        // Ganache port
            network_id: "*",   // Match any network id
        },
    },
    compilers: {
        solc: {
            version: "0.8.13", // Specify the version you installed
            
        },
    },
};
