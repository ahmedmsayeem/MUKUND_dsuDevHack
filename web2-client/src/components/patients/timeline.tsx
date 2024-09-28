'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from "~/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { ChevronRight } from 'lucide-react'

interface MedicalRecord {
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
export default function Timeline({ medicalRecords }: { medicalRecords: MedicalRecord[] }) {
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  return (
    <div className="container mx-auto p-6">
      {/* <h2 className="text-3xl font-bold text-center mb-4">Medical History</h2> */}
      
      <div className="relative overflow-x-auto">
        {/* Timeline line */}
        <div className="absolute left-0 top-1/2 w-[2000px] h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2"></div>
        
        {/* Timeline items - scrollable */}
        <div className="relative z-10 flex pb-12  space-x-10 min-w-[1000px]">
          {medicalRecords.map((item, index) => (
            <Dialog 
              key={item.id} 
              open={openDialog === item.id} 
              onOpenChange={(isOpen) => setOpenDialog(isOpen ? item.id : null)}
            >
              <DialogTrigger asChild>
                <div className="flex flex-col items-center cursor-pointer group relative">
                  {/* Marker on the line */}
                  <div className="w-6 h-6 bg-primary rounded-full mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Card */}
                  <Card className="w-48  transform group-hover:scale-105 transition-all duration-300 shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl hover:border-primary">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-semibold">{item.title}</CardTitle>
                      <CardDescription className="text-xs">{item.date}</CardDescription>
                    </CardHeader>
                  </Card>

                  {/* Arrow connecting to next item */}
                  {index < medicalRecords.length - 1 && (
                    <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                      <ChevronRight className="text-primary w-6 h-6" />
                    </div>
                  )}
                </div>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{item.title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <p className="text-gray-600">{item.description}</p>
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold">Document Content:</h4>
                    <p className="mt-2 text-gray-700">{item.documentContent}</p>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold">Additional Details:</h4>
                    <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-2">
                      <li><strong>Blood Group:</strong> {item.bloodGroup}</li>
                      <li><strong>Latest Blood Pressure:</strong> {item.latestBloodPressure}</li>
                      <li><strong>Total Cholesterol:</strong> {item.totalCholesterol} mg/dL</li>
                      <li><strong>Low-Density Lipid (LDL):</strong> {item.lowDensityLipid} mg/dL</li>
                      <li><strong>High-Density Lipid (HDL):</strong> {item.highDensityLipid} mg/dL</li>
                    </ul>
                  </div>
                  <Link href="#" className="mt-4 block text-blue-600 hover:underline">
                    View Detailed Data
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  )
}
