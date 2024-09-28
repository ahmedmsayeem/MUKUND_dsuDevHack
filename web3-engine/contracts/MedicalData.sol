// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title MedicalData
 * @dev A smart contract for managing patient medical data.
 */
contract MedicalData {
    enum UserType { Patient, Doctor }

    struct User {
        address userId;
        string name;
        uint256 age;
        UserType userType;
        string fingerprint; // Extra field for patient
    }

    struct Patient {
        address userId; // Changed from string to address
        string bloodGroup;
        string medicalHistory;
        bool isUnconscious;
        string title;
        string description;
        string date;
        string BP;  // Blood Pressure as a string
        string Chol; // Cholesterol level
    }

    mapping(address => Patient) public patients;
    mapping(address => User) public users;
    address[] public patientList;

    event DataAccessed(address indexed patientAddress, address indexed requester);
    event PatientDataUpdated(address indexed patientAddress);
    event UnconsciousStatusUpdated(address indexed patientAddress, bool status);
    event UserUpdated(address indexed userId, UserType userType, string fingerprint);

    /**
     * @dev Registers a new patient and sets their medical data.
     * @param _userId The patient's unique identifier (address).
     * @param _name The patient's name.
     * @param _age The patient's age.
     * @param _bloodGroup The patient's blood group.
     * @param _medicalHistory The patient's medical history.
     * @param _fingerprint The patient's fingerprint hash.
     * @param _title The title of the medical report.
     * @param _description The description of the medical report.
     * @param _date The date of the medical report.
     * @param _BP The blood pressure reading.
     * @param _Chol The cholesterol level.
     */
    function setPatientData(
        address _userId,
        string memory _name,
        uint256 _age,
        string memory _bloodGroup,
        string memory _medicalHistory,
        string memory _fingerprint,
        string memory _title,
        string memory _description,
        string memory _date,
        string memory _BP,
        string memory _Chol
    ) public {
        // Register the user as a patient
        users[_userId] = User({
            userId: _userId,
            name: _name,
            age: _age,
            userType: UserType.Patient,
            fingerprint: _fingerprint
        });

        // Set the patient's medical data
        patients[_userId] = Patient({
            userId: _userId,
            bloodGroup: _bloodGroup,
            medicalHistory: _medicalHistory,
            isUnconscious: false,
            title: _title,
            description: _description,
            date: _date,
            BP: _BP,
            Chol: _Chol
        });

        patientList.push(_userId);
        emit PatientDataUpdated(_userId);
        emit UserUpdated(_userId, UserType.Patient, _fingerprint);
    }

    /**
     * @dev Marks the patient as unconscious or conscious.
     * @param _status The unconscious status to set (true for unconscious, false for conscious).
     */
    function markUnconscious(bool _status) public {
        // The patient can mark themselves unconscious or conscious
        require(patients[msg.sender].userId != address(0), "Patient not found.");
        patients[msg.sender].isUnconscious = _status;
        emit UnconsciousStatusUpdated(msg.sender, _status);
    }

    /**
     * @dev Retrieves a patient's medical data if they are unconscious.
     * @param _patientAddress The address of the patient.
     * @return name The patient's name.  
     * @return bloodGroup The patient's blood group.
     * @return medicalHistory The patient's medical history.
     * @return title The title of the medical report.
     * @return description The description of the medical report.
     * @return date The date of the medical report.
     * @return BP The blood pressure reading.
     * @return Chol The cholesterol level.
     */
    function getPatientData(address _patientAddress)
        public
        view
        returns (
            string memory name,
            string memory bloodGroup,
            string memory medicalHistory,
            string memory title,
            string memory description,
            string memory date,
            string memory BP,
            string memory Chol
        )
    {
        require(patients[_patientAddress].isUnconscious, "Patient is conscious. Access denied.");
        Patient memory p = patients[_patientAddress];
        User memory u = users[_patientAddress];  
        return (
            u.name,
            p.bloodGroup,
            p.medicalHistory,
            p.title,
            p.description,
            p.date,
            p.BP,
            p.Chol
        );
    }

    /**
     * @dev Accesses a patient's data and returns it if they are unconscious.
     * @param _patientAddress The address of the patient.
     * @return name The patient's name.  
     * @return bloodGroup The patient's blood group.
     * @return medicalHistory The patient's medical history.
     * @return title The title of the medical report.
     * @return description The description of the medical report.
     * @return date The date of the medical report.
     * @return BP The blood pressure reading.
     * @return Chol The cholesterol level.
     */
    function accessPatientData(address _patientAddress)
        public
        view
        returns (
            string memory name, 
            string memory bloodGroup,
            string memory medicalHistory,
            string memory title,
            string memory description,
            string memory date,
            string memory BP,
            string memory Chol
        )
    {
        return getPatientData(_patientAddress);
    }

    /**
     * @dev Resets the unconscious status of the patient to false.
     */
    function resetUnconsciousStatus() public {
        require(patients[msg.sender].userId != address(0), "Patient not found.");
        patients[msg.sender].isUnconscious = false;
        emit UnconsciousStatusUpdated(msg.sender, false);
    }
}
