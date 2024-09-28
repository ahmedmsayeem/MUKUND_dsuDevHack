"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Fingerprint, FingerprintIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/hooks/use-toast";
import { Calendar } from "~/components/ui/calendar";
import {
  FileIcon,
  Loader2Icon,
  UploadIcon,
  UserIcon,
  FileTextIcon,
  CalendarIcon,
  HistoryIcon,
  PenIcon,
} from "lucide-react";
import { CheckFingerprint, RegisterPasskey } from "../patients/finger-print";
import Link from "next/link";
import { ToastAction } from "../ui/toast";
import { PATIENT_INFO } from "../patients/constant";

// Simulated patient data

interface Document {
  name: string;
  url: string;
}

interface Note {
  date: Date;
  content: string;
}

export default function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [fingerPrintID, setFingerPrintID] = useState("");
  const [medicalHistory, setMedicalHistory] = useState<String[]>([]);
  const [patientDetails, setPatientDetails] = useState({
    userID: "",
    title: "",
    description: "",
    fingerprint: "",
    date: new Date(),
    prescription:""
    });
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<File[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState("");

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatient(patientId);
    // Simulated API call to fetch patient details

    setIsLoading(true);
    setPatientDetails({
      userID: patientId,
      title: "",
      description: "",
      fingerprint: "",
      date: new Date(),
      prescription:""
    });
    setDocuments([]);
    setNotes([
      { date: new Date(2023, 5, 15), content: "Initial consultation" },
      { date: new Date(2023, 6, 1), content: "Follow-up appointment" },
    ]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePatient = (e: any) => {
    // Simulated API call to update patient details

    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Patient details updated",
        description: "The patient's information has been successfully updated.",
      });
      setIsLoading(false);
    }, 1000);
    let urls: string[] = [];
    documents.forEach((file) => {
      urls.push(file.name);
    });
    setMedicalHistory(urls);
    fetch(`http://localhost:5000/api/patient`, {
      method: "POST",
      body: JSON.stringify({
        ...patientDetails,
        userID: "0x8516D9509c7B64f684AFAfD3C852Bd5b821e31fA",
        account: "0xe806ea70d9EEAeB8eb116F4c9d361AAD1EFBF441",
        medicalHistory: urls.join(","),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulated file upload
      setIsLoading(true);
      setDocuments((prev) => [...prev, file]);
      toast({
        title: "Document uploaded",
        description: `${file.name} has been successfully uploaded.`,
      });
      setIsLoading(false);
    }
  };

  const handleFileSubmit = () => {
    const formData = new FormData();

    documents.forEach((file: File) => {
      formData.append(`files`, file); // Append file to the specified folder
    });

    console.log(documents);
    fetch("http://localhost:8081/api/set-patient/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log(response.status);
        toast({
          title: "Scheduled: Catch up ",
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          )
      })})
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mx-auto max-w-[70vw] p-4">
      <h1 className="mb-6 text-3xl font-bold">Doctor&apos;s Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserIcon className="mr-2 h-5 w-5" />
              Select Patient
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={handlePatientSelect} value={selectedPatient}>
              <SelectTrigger>
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {PATIENT_INFO.map((patient) => (
                  <SelectItem key={patient.patient_id} value={patient.patient_name}>
                    {patient.patient_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {!selectedPatient && (
          <Card className="md:col-span-3">
            <CardContent>
              <p className="py-8 text-center text-muted-foreground">
                Please select a patient to view and update their information.
              </p>
            </CardContent>
          </Card>
        )}

        {selectedPatient && (
          <>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileTextIcon className="mr-2 h-5 w-5" />
                  Check Up Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    
                    <Label htmlFor="title" className="flex items-center">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={patientDetails.title}
                      onChange={handleInputChange}
                      className="mt-1"
                      />
                  </div>
                  <div>
                    <Calendar mode="single" selected={patientDetails.date} onSelect={(date) => {
                      if (date) {
                        setPatientDetails((prev) => ({ ...prev, date }));
                      }
                    }}/>
                  </div>
                      </div>
                  <div>
                    <Label htmlFor="prescription" className="flex items-center">
                      Prescription
                    </Label>
                    <Textarea
                      id="prescription"
                      name="prescription"
                      value={patientDetails.prescription}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder=""
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="flex items-center">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={patientDetails.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder=""
                      className="mt-1"
                    />
                  </div>

                  <Button
                    onClick={handleUpdatePatient}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Update Patient Details
                  </Button>
                </form>
                {/* Use userID here */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileIcon className="mr-2 h-5 w-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <FileIcon className="h-4 w-4" />
                      <a
                        href={doc.name}
                        className="text-blue-500 hover:underline"
                      >
                        {doc.name}
                      </a>
                    </div>
                  ))}
                </div>
                <div>
                  <Label htmlFor="document" className="flex items-center">
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Upload New Document
                  </Label>
                  <div className="mt-1 flex items-center space-x-2">
                    <Input
                      id="document"
                      type="file"
                      onChange={handleFileUpload}
                    />
                    <Button disabled={isLoading} onClick={handleFileSubmit}>
                      {isLoading ? (
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                      ) : (
                        <UploadIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <RegisterPasskey done={setIsLoading} userID="1234" />
                  {/* <CheckFingerprint userID="1234" /> */}
                </div>
                
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HistoryIcon className="mr-2 h-5 w-5" />
                  Patient History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {medicalHistory.map((url) => (
                  <p>
                    <Link href={`http://localhost:3000/uploads/${url}`}>
                      {url}
                    </Link>
                  </p>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
