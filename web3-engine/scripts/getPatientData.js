const Web3 = require("web3");
const contract = require("@truffle/contract");
const MedicalDataJSON = require("../build/contracts/MedicalData.json");

const getPatientData = async () => {
    const web3 = new Web3("http://localhost:7545");
    const MedicalData = contract(MedicalDataJSON);
    MedicalData.setProvider(web3.currentProvider);

    const accounts = await web3.eth.getAccounts();
    const instance = await MedicalData.deployed();

    // Assuming the patient is already registered
    const patientAddress = accounts[0];
    const requesterAddress = accounts[1];

    // Mark the patient as unconscious for testing
    await instance.markUnconscious(true, { from: patientAddress });

    try {
        const data = await instance.getPatientData(patientAddress, { from: requesterAddress });
        console.log("Patient Data:");
        console.log("Name:", data[0]);
        console.log("Blood Group:", data[1]);
        console.log("Medical History:", data[2]);
        console.log("Title:", data[3]);
        console.log("Description:", data[4]);
        console.log("Date:", data[5]);
        console.log("BP:", data[6]);
        console.log("Cholesterol:", data[7]);
    } catch (error) {
        console.error('Error fetching patient data:', error.message);
    }
};

getPatientData();
