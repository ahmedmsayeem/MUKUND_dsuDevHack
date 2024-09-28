
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

// Function to extract required data from medical records
export const extractMedicalData = (
  records: MedicalRecord[],
) => {

    const latestBloodPressure: string[] = [];
    const totalCholesterol: number[] = [];
    const lowDensityLipid: number[] = [];
    const highDensityLipid: number[] = [];  

  records.forEach((record) => {
    latestBloodPressure.push(record.latestBloodPressure);
    totalCholesterol.push(record.totalCholesterol);
    lowDensityLipid.push(record.lowDensityLipid);
    highDensityLipid.push(record.highDensityLipid);
  });

  return {
    latestBloodPressure,
    totalCholesterol,
    lowDensityLipid,
    highDensityLipid,
  };
};

// Example usage

