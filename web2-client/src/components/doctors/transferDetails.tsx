import React, { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Progress } from "~/components/ui/progress"
import { AlertCircle, CheckCircle, Clock, Download, Upload, DollarSign, FileText, Hospital, User } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"

const mockTransferData = {
  patientName: "John Doe",
  sourceHospital: "City General Hospital",
  destinationHospital: "County Medical Center",
  recordCount: 15,
  estimatedSavings: 2500,
  status: "in-progress",
  progress: 60,
  consentObtained: true,
  compatibilityIssues: [
    "Imaging format mismatch: DICOM version incompatibility",
    "Medication codes: Different systems used"
  ],
  auditTrail: [
    { timestamp: "2023-07-10 09:15", action: "Transfer initiated" },
    { timestamp: "2023-07-10 09:16", action: "Patient consent verified" },
    { timestamp: "2023-07-10 09:20", action: "Record transfer started" },
  ]
}

export default function RecordTransferPage() {
  const [transferData, setTransferData] = useState(mockTransferData)

  const handleConfirmTransfer = () => {
    setTransferData(prev => ({ ...prev, status: 'in-progress' }))
  }

  const handleRetryTransfer = () => {
    setTransferData(prev => ({ ...prev, status: 'in-progress', progress: 0 }))
  }

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="font-semibold"><Clock className="w-4 h-4 mr-1" />Pending</Badge>
      case 'in-progress':
        return <Badge variant="default" className="font-semibold"><Upload className="w-4 h-4 mr-1" />In Progress</Badge>
      case 'completed':
        return <Badge variant="outline" className="font-semibold"><CheckCircle className="w-4 h-4 mr-1" />Completed</Badge>
      case 'error':
        return <Badge variant="destructive" className="font-semibold"><AlertCircle className="w-4 h-4 mr-1" />Error</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Record Transfer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Transfer Summary */}
        <Card className="md:col-span-2 lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardTitle className="text-2xl">Transfer Summary</CardTitle>
            <CardDescription className="text-blue-100">Overview of the record transfer between hospitals</CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Patient</p>
                    <p className="font-semibold text-gray-700">{transferData.patientName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Hospital className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-semibold text-gray-700">{transferData.sourceHospital}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Hospital className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-semibold text-gray-700">{transferData.destinationHospital}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Records</p>
                    <p className="font-semibold text-gray-700">{transferData.recordCount}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="mt-1">{renderStatusBadge(transferData.status)}</div>
                  </div>
                </div>
                {transferData.status === 'in-progress' && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Progress</p>
                    <Progress value={transferData.progress} className="h-2" />
                    <p className="text-sm text-gray-500 text-right">{transferData.progress}% Complete</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 rounded-b-lg">
            {transferData.status === 'pending' && (
              <Button onClick={handleConfirmTransfer} className="w-full">Confirm Transfer</Button>
            )}
            {transferData.status === 'error' && (
              <Button onClick={handleRetryTransfer} variant="secondary" className="w-full">Retry Transfer</Button>
            )}
            {transferData.status === 'completed' && (
              <Button variant="outline" className="w-full"><Download className="w-4 h-4 mr-2" />Download Report</Button>
            )}
          </CardFooter>
        </Card>

        {/* Consent and Privacy */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardTitle className="text-xl">Consent and Privacy</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            {transferData.consentObtained ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <AlertTitle className="text-green-700 font-semibold">Consent Obtained</AlertTitle>
                <AlertDescription className="text-green-600">
                  Patient has provided consent for this record transfer.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <AlertTitle className="text-red-700 font-semibold">Consent Required</AlertTitle>
                <AlertDescription className="text-red-600">
                  Patient consent is required before proceeding with the transfer.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Compatibility Issues */}
        {transferData.compatibilityIssues.length > 0 && (
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardTitle className="text-xl">Compatibility Issues</CardTitle>
            </CardHeader>
            <CardContent className="mt-4">
              <ul className="space-y-2">
                {transferData.compatibilityIssues.map((issue, index) => (
                  <li key={index} className="flex items-start">
                    <AlertCircle className="w-5 h-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{issue}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Cost Breakdown */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardTitle className="text-xl">Cost Analysis</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="space-y-2">
              <p className="flex items-center justify-between text-gray-700">
                <span className="flex items-center"><DollarSign className="w-5 h-5 mr-2 text-purple-500" /> Estimated Savings:</span>
                <strong className="text-green-600">${transferData.estimatedSavings}</strong>
              </p>
              <p className="flex items-center justify-between text-gray-700">
                <span className="flex items-center"><DollarSign className="w-5 h-5 mr-2 text-purple-500" /> Transfer Fee:</span>
                <strong className="text-red-600">$50</strong>
              </p>
              <p className="flex items-center justify-between text-gray-700">
                <span className="flex items-center"><DollarSign className="w-5 h-5 mr-2 text-purple-500" /> Data Processing:</span>
                <strong className="text-red-600">$100</strong>
              </p>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <p className="flex items-center justify-between text-gray-700 font-semibold">
                  <span className="flex items-center"><DollarSign className="w-5 h-5 mr-2 text-purple-500" /> Net Savings:</span>
                  <strong className="text-green-600">${transferData.estimatedSavings - 150}</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Trail */}
        <Card className="md:col-span-2 lg:col-span-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
            <CardTitle className="text-xl">Audit Trail</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {transferData.auditTrail.map((entry, index) => (
                <li key={index} className="flex items-center bg-gray-50 p-3 rounded-lg shadow">
                  <Clock className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{entry.action}</p>
                    <p className="text-xs text-gray-500">{entry.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}