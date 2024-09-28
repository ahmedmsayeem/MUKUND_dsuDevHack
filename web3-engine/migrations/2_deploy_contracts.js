const MedicalData = artifacts.require("MedicalData");

module.exports = function (deployer) {
    deployer.deploy(MedicalData);
};
