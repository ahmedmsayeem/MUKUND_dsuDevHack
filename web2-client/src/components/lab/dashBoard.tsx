"use client"

import React, { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { toast } from "~/hooks/use-toast"
import { Calendar } from "~/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import {
  FileIcon,
  Loader2Icon,
  UploadIcon,
  UserIcon,
  FileTextIcon,
  CalendarIcon,
  FlaskConical,
  Droplets,
  Activity,
} from "lucide-react"

// Simulated patient data
const patients = [
  { userId: "1", name: "John Doe" },
  { userId: "2", name: "Jane Smith" },
  { userId: "3", name: "Alice Johnson" },
  { userId: "4", name: "Bob Williams" },
]

interface LabResult {
  patientId: string
  testName: string
  testDate: Date
  resultValue: string
  unit: string
  referenceRange: string
  notes: string
  documents: File[]
}

export default function LabAttendantDashboard() {
  const [selectedPatient, setSelectedPatient] = useState("")
  const [labResult, setLabResult] = useState<LabResult>({
    patientId: "",
    testName: "",
    testDate: new Date(),
    resultValue: "",
    unit: "",
    referenceRange: "",
    notes: "",
    documents: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatient(patientId)
    setLabResult((prev) => ({ ...prev, patientId }))
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setLabResult((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setLabResult((prev) => ({ ...prev, testDate: date }))
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setLabResult((prev) => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(files)],
      }))
    }
  }

  const handleSubmitLabResult = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulated API call to submit lab result
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Lab result submitted",
        description: "The lab result has been successfully uploaded.",
      })

      // Reset form
      setLabResult({
        patientId: "",
        testName: "",
        testDate: new Date(),
        resultValue: "",
        unit: "",
        referenceRange: "",
        notes: "",
        documents: [],
      })
      setSelectedPatient("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit lab result. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="mb-6 text-3xl font-bold">Lab Attendant Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FlaskConical className="mr-2 h-5 w-5" />
            Upload Lab Result
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitLabResult} className="space-y-4">
            <div>
              <Label htmlFor="patientId">Select Patient</Label>
              <Select
                onValueChange={handlePatientSelect}
                value={selectedPatient}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.userId} value={patient.userId}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="testName">Test Name</Label>
              <Input
                id="testName"
                name="testName"
                value={labResult.testName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="testDate">Test Date</Label>
              <Calendar
                mode="single"
                selected={labResult.testDate}
                onSelect={handleDateChange}
                className="rounded-md border"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="resultValue">Result Value</Label>
                <Input
                  id="resultValue"
                  name="resultValue"
                  value={labResult.resultValue}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  name="unit"
                  value={labResult.unit}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="referenceRange">Reference Range</Label>
                <Input
                  id="referenceRange"
                  name="referenceRange"
                  value={labResult.referenceRange}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={labResult.notes}
                onChange={handleInputChange}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="documents">Upload Documents</Label>
              <Input
                id="documents"
                type="file"
                onChange={handleFileUpload}
                multiple
              />
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Uploaded Documents</h3>
              {labResult.documents.length > 0 ? (
                <ul className="space-y-1">
                  {labResult.documents.map((doc, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <FileIcon className="h-4 w-4" />
                      <span>{doc.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No documents uploaded</p>
              )}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UploadIcon className="mr-2 h-4 w-4" />
              )}
              Submit Lab Result
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}