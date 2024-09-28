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
import { CheckFingerprint, RegisterPasskey } from "~/components/patients/finger-print";
import Link from "next/link";

// Simulated patient data
const patients = [
  { userId: "1" },
  { userId: "2" },
  { userId: "3" },
  { userId: "4" },
];

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
    name: "",
    age:0,
    bloodGroup: "",
    BP: "",
    Chol: "",
    title: "",
    description: "",
    fingerprint: "",
    date: "",
    medicalHistory: "",
    account:""
  });
  const [isLoading, setIsLoading] = useState(false);
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
        name: "John Doe",
        age: 30,
        bloodGroup: "O+",
        medicalHistory: "No allergies",
        fingerprint: "fingerprint_data",
        title: "Emergency Contact",
        description: "Heart Condition",
        date: "2024-09-25",
        BP: "120/80",
        Chol: "200",
        account: "0x37D26956508c15945D65be33b61fEdC720D67D4E"
    });
    setDocuments([]);
    setNotes([
      { date: new Date(2023, 5, 15), content: "Initial consultation" },
      { date: new Date(2023, 6, 1), content: "Follow-up appointment" },
    ]);
    setIsLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePatient = (e: any) => {
    // Simulated API call to update patient details

    console.log(fingerPrintID);
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
        account: "0x37D26956508c15945D65be33b61fEdC720D67D4E",
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
    const folderName = "uploads"; // Specify your folder name here

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
      })
      .catch((err) => console.error(err));
  };

  const handleAddNote = () => {
    if (selectedDate && currentNote) {
      setNotes((prev) => [
        ...prev,
        { date: selectedDate, content: currentNote },
      ]);
      setCurrentNote("");
      toast({
        title: "Note added",
        description: "Your note has been successfully added.",
      });
    }
  };

  const filteredNotes = selectedDate
    ? notes.filter(
        (note) => note.date.toDateString() === selectedDate.toDateString(),
      )
    : [];

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
                {patients.map((patient) => (
                  <SelectItem key={patient.userId} value={patient.userId}>
                    {patient.userId}
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
                  Patient Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="id" className="flex items-center">
                        Patient ID
                      </Label>
                      <Input
                        id="id"
                        name="id"
                        value={patientDetails.account}
                        onChange={(e) => setPatientDetails((prev) => {
                          return { ...prev, account: e.target.value };
                        })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bg" className="flex items-center">
                        Blood group
                      </Label>
                      <Select
                        value={patientDetails.bloodGroup}
                        onValueChange={(value) =>
                          setPatientDetails((prev) => ({
                            ...prev,
                            bloodGroup: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Blood Group</SelectLabel>
                            <SelectItem value="A+">A+ </SelectItem>
                            <SelectItem value="B+">B+ </SelectItem>
                            <SelectItem value="O+">O+ </SelectItem>
                            <SelectItem value="AB+">AB+ </SelectItem>
                            <SelectItem value="A-">A- </SelectItem>
                            <SelectItem value="B-">B+ </SelectItem>
                            <SelectItem value="O-">O+ </SelectItem>
                            <SelectItem value="AB-">AB+ </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="Chol" className="flex items-center">
                        Cholestrol
                      </Label>
                      <Input
                        id="Chol"
                        name="Chol"
                        value={patientDetails.Chol}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="BP" className="flex items-center">
                        Blood Pressure
                      </Label>
                      <Input
                        id="BP"
                        name="BP"
                        value={patientDetails.BP}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
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
                  <div>
                    <Label htmlFor="medHistory" className="flex items-center">
                    Medical History
                    </Label>
                    <Textarea
                      id="medHistory"
                      name="medHistory"
                      value={patientDetails.medicalHistory}
                      onChange={handleInputChange}
                      rows={4}
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
                </div>
                <Button className="absolute bottom-20 ml-[6%] p-8">
                  <FingerprintIcon size={50}></FingerprintIcon>{" "}
                </Button>
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

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Calendar and Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      // notifications={[]}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Enter note for selected date"
                      value={currentNote}
                      onChange={(e) => setCurrentNote(e.target.value)}
                      rows={4}
                    />
                    <Button onClick={handleAddNote} className="w-full">
                      <PenIcon className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileTextIcon className="mr-2 h-5 w-5" />
                  Notes for {selectedDate?.toDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredNotes.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredNotes.map((note, index) => (
                      <li key={index} className="rounded bg-secondary p-2">
                        {note.content}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    No notes for this date.
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
