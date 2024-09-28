export interface MedicalRecord {
    id: string;                     // Unique identifier for the record
    date: string;                   // Date of the record/test
    title: string;                  // Title of the record/test
    description: string;            // Description of the test/report
    documentContent: string;        // The content of the document or report
    bloodGroup: string;             // Blood group of the patient
    latestBloodPressure: string;    // Latest blood pressure reading
    totalCholesterol: number;       // Total cholesterol level
    lowDensityLipid: number;        // Low-density lipid level (LDL)
    highDensityLipid: number;       // High-density lipid level (HDL)
    titleOfTest: string;            // Title of the test/report
  }

export const medicalRecords :MedicalRecord[] = [
    {
      id: "1",
      date: "2023-01-10",
      title: "Heart Rate Scan",
      description: "Regular heart rate monitoring",
      documentContent: "Heart rate recorded: 75 bpm, normal range observed.",
      bloodGroup: "O+",
      latestBloodPressure: "120/80 mmHg",
      totalCholesterol: 180,
      lowDensityLipid: 100,
      highDensityLipid: 60,
      titleOfTest: "Heart Rate Monitoring",
    },
    {
      id: "2",
      date: "2023-02-15",
      title: "Blood Pressure Check",
      description: "Routine blood pressure check",
      documentContent: "Blood pressure recorded: 130/85 mmHg, slightly elevated.",
      bloodGroup: "A+",
      latestBloodPressure: "130/85 mmHg",
      totalCholesterol: 200,
      lowDensityLipid: 110,
      highDensityLipid: 70,
      titleOfTest: "Blood Pressure Test",
    },
    {
      id: "3",
      date: "2023-03-05",
      title: "Cholesterol Screening",
      description: "Lipid panel test for cholesterol levels",
      documentContent: "Total cholesterol: 220 mg/dL, LDL: 140 mg/dL, HDL: 50 mg/dL.",
      bloodGroup: "B-",
      latestBloodPressure: "118/78 mmHg",
      totalCholesterol: 220,
      lowDensityLipid: 140,
      highDensityLipid: 50,
      titleOfTest: "Lipid Profile",
    },
    {
      id: "4",
      date: "2023-04-12",
      title: "Annual Physical Exam",
      description: "Complete physical examination",
      documentContent: "Vital signs normal. Cholesterol levels slightly elevated.",
      bloodGroup: "AB+",
      latestBloodPressure: "125/80 mmHg",
      totalCholesterol: 210,
      lowDensityLipid: 130,
      highDensityLipid: 65,
      titleOfTest: "Annual Check-up",
    },
    {
      id: "5",
      date: "2023-05-20",
      title: "Diabetes Screening",
      description: "Test to check glucose and cholesterol levels",
      documentContent: "Glucose normal, cholesterol high.",
      bloodGroup: "O-",
      latestBloodPressure: "115/75 mmHg",
      totalCholesterol: 240,
      lowDensityLipid: 160,
      highDensityLipid: 55,
      titleOfTest: "Diabetes and Cholesterol Test",
    }
  ];
  

export const DOCTOR_ID=""
export const PATIENT_INFO=[
  { patient_id:"0x12873385B5F4fAF4cFd392439E51Ae70D0FDC27B",patient_name:"Ananth"},
  { patient_id:"0x37D26956508c15945D65be33b61fEdC720D67D4E",patient_name:"Sayeem"},
  { patient_id:"0xA2e3A59084f9680C2FeA8E49cAe6926227dad7a1",patient_name:"Dinesh"},
  { patient_id:"0x09416FB48aAd9D1552A12A78333746C35Ebd69D4",patient_name:"Mukund"}
]

export const IDs = [
  '0x37D26956508c15945D65be33b61fEdC720D67D4E',
  '0x12873385B5F4fAF4cFd392439E51Ae70D0FDC27B',
  '0xA2e3A59084f9680C2FeA8E49cAe6926227dad7a1',
  '0x09416FB48aAd9D1552A12A78333746C35Ebd69D4',
  '0x299946b55792707D3703fcDea3543cF18E46bdFC',
  '0xb739A746324d5bfb4d7987762c46351E350C22Ed',
  '0xC2d1F716F6e911F27788DDDfe8905A3E80A54f62',
  '0x4Ad2Eb63E7C8309831823C5770c864c9E678FDBe',
  '0x4455Bc33aDff7CA26916E71cde2cf004fd00cF3f',
  '0x98B880302239484499b517D0e0FD9Cb14B2CBf14'
]

