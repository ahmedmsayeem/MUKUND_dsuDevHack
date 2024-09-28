require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Web3 = require("web3");
const contract = require("@truffle/contract");
const MedicalDataJSON = require("./build/contracts/MedicalData.json");

const app = express();

// Configure CORS to allow all origins
app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());

const web3 = new Web3("http://localhost:7545");
const MedicalData = contract(MedicalDataJSON);
MedicalData.setProvider(web3.currentProvider);

let medicalDataInstance;
let accounts;

const init = async () => {
    accounts = await web3.eth.getAccounts();
    medicalDataInstance = await MedicalData.deployed();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

init();

// Endpoint to set patient data
app.post("/api/patient", async (req, res) => {
    const {
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
        account,
    } = req.body;

    try {
        await medicalDataInstance.setPatientData(
            account,
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
            { from: account }
        );

        res.send({ status: "Patient data set successfully." });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Endpoint to mark patient as unconscious or conscious
app.post("/api/patient/unconscious", async (req, res) => {
    const { status, account } = req.body;

    try {
        await medicalDataInstance.markUnconscious(status, { from: account });
        res.send({ status: `Patient unconscious status set to ${status}.` });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Endpoint to get patient data
app.post("/api/patient/:address", async (req, res) => {
    const patientAddress = req.params.address;
    const { requester } = req.query;

    try {
        const data = await medicalDataInstance.getPatientData(patientAddress, {
            from: requester,
        });

        res.send({
            name: data[0],
            bloodGroup: data[1],
            medicalHistory: data[2],
            title: data[3],
            description: data[4],
            date: data[5],
            BP: data[6],
            Chol: data[7],
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Endpoint to reset unconscious status
app.post("/api/patient/reset", async (req, res) => {
    const { account } = req.body;

    try {
        await medicalDataInstance.resetUnconsciousStatus({ from: account });
        res.send({ status: "Unconscious status reset." });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
