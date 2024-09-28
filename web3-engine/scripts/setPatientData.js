const Web3 = require("web3");
const contract = require("@truffle/contract");
const MedicalDataJSON = require("../build/contracts/MedicalData.json");

const setPatientData = async () => {
    const web3 = new Web3("http://localhost:7545");
    const MedicalData = contract(MedicalDataJSON);
    MedicalData.setProvider(web3.currentProvider);

    const accounts = await web3.eth.getAccounts();
    const medicalDataInstance = await MedicalData.deployed();

    const userId = accounts[0]; // Patient's Ethereum address
    const name = "John Doe";
    const age = 30;
    const bloodGroup = "O+";
    const medicalHistory = "No allergies";
    const fingerprint = "fingerprint_data";
    const title = "Emergency Contact";
    const description = "Heart Condition";
    const date = "2024-09-25";
    const BP = "120/80";
    const Chol = "200";

    try {
        await medicalDataInstance.setPatientData(
            userId,
            name,
            age,
            bloodGroup,
            medicalHistory,
            fingerprint,
            title,
            description,
            date,
            BP,
            Chol,
            { from: userId }
        );
        console.log("Patient data set successfully.");
    } catch (error) {
        console.error("Error setting patient data:", error.message);
    }
};

setPatientData();
