/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import { Calendar } from '~/components/ui/calendar';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import MyLineChart from './chart';
import Link from 'next/link';
import { IoIosAddCircle } from 'react-icons/io';
import Timeline from './timeline';
import { Bot, ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';

const PATIENT="0xD27F3c18382938B4863A80b7ef292d72A2096267"
const DOCTOR="0x53DD40193F321f2c01c5920D05E0F7a212CDe8e6"
interface MedicalRecord {
  id: string;
  date: string;
  title: string;
  description: string;
  documentContent: string;
  bloodGroup: string;
  latestBloodPressure: string;
  totalCholesterol: number;
  lowDensityLipid: number;
  highDensityLipid: number;
  titleOfTest: string;
}

interface MedicalRecordResponse {
  name: string;
  bloodGroup: string;
  medicalHistory: string;
  title: string;
  description: string;
  date: string;
  BP: string;
  Chol: string;
}

export default function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [summary, setSummary] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [fetchedRecord, setFetchedRecord] = useState<MedicalRecord | null>(null);

  const summarize = async (medicalRecords: MedicalRecord[]) => {
    try {
      const body = { medicalRecords };
      setSummary('Summarizing...');

      const response = await fetch('/api/gemini/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = (await response.json()) as { data: string };
      setSummary(data?.data || '');

    } catch (error) {
      console.error('POST request failed:', error);
    }
  };

  const fetchRecords = async () => {
    try {
      const makeReady = await fetch('http://localhost:5000/api/patient/unconscious', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: true,
          account: PATIENT,
        }),
      });

      const response = await fetch(`http://localhost:5000/api/patient/${PATIENT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requester: DOCTOR,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = (await response.json()) as MedicalRecordResponse;
      console.log('Fetched data:', data);

      const mappedData: MedicalRecord = {
        id: '1',
        date: data.date || '',
        title: data.title || 'Untitled',
        description: data.description || 'No description provided',
        documentContent: 'Report content goes here',
        bloodGroup: data.bloodGroup || 'Unknown',
        latestBloodPressure: data.BP || 'N/A',
        totalCholesterol: Number(data.Chol) || 0,
        lowDensityLipid: 0,
        highDensityLipid: 0,
        titleOfTest: 'Blood Test',
      };

      setFetchedRecord(mappedData);
    } catch (error) {
      console.error('POST request failed:', error);
    }
  };

  useEffect(() => {
    void fetchRecords();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-[2000px] mx-auto p-4 md:p-6">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Main Content Area */}
          <div className="flex-1 space-y-6 w-[70%]">
            {/* Debugging data */}
         

            {/* Recent Scannings Section */}
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">Recent Scannings</CardTitle>
                <Link className="text-blue-600 hover:text-blue-800" href={'#timeline'}>
                  View All
                </Link>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fetchedRecord && (
                    <Card key={fetchedRecord.id} className="transition-shadow hover:shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-black to-gray-900">
                        <CardTitle className="text-white font-semibold text-lg">{fetchedRecord.title}</CardTitle>
                        <CardDescription className="text-blue-100">{fetchedRecord.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4"></CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                          Date: {fetchedRecord.date}
                        </span>
                        <Dialog
                          open={openDialog === fetchedRecord.id}
                          onOpenChange={(isOpen) => setOpenDialog(isOpen ? fetchedRecord.id : null)}
                        >
                          <DialogTrigger asChild>
                            <Link
                              href="#"
                              className="text-blue-600 text-sm hover:underline"
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenDialog(fetchedRecord.id);
                              }}
                            >
                              Details
                            </Link>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>{fetchedRecord.title}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <p className="text-gray-600">{fetchedRecord.description}</p>
                              <div className="mt-6">
                                <h4 className="text-lg font-semibold">Document Content:</h4>
                                <p className="mt-2 text-gray-700">{fetchedRecord.documentContent}</p>
                              </div>
                              <div className="mt-6">
                                <h4 className="text-lg font-semibold">Additional Details:</h4>
                                <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-2">
                                  <li>
                                    <strong>Blood Group:</strong> {fetchedRecord.bloodGroup}
                                  </li>
                                  <li>
                                    <strong>Latest Blood Pressure:</strong> {fetchedRecord.latestBloodPressure}
                                  </li>
                                  <li>
                                    <strong>Total Cholesterol:</strong> {fetchedRecord.totalCholesterol} mg/dL
                                  </li>
                                  <li>
                                    <strong>Low-Density Lipid (LDL):</strong> {fetchedRecord.lowDensityLipid} mg/dL
                                  </li>
                                  <li>
                                    <strong>High-Density Lipid (HDL):</strong> {fetchedRecord.highDensityLipid} mg/dL
                                  </li>
                                </ul>
                              </div>
                              <Link href="#" className="mt-4 block text-center text-blue-600 hover:underline">
                                Link to the document
                              </Link>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Chart Section */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <MyLineChart medicalRecords={fetchedRecord ? [fetchedRecord] : []} />
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-white" id="timeline">
              <CardHeader>
                <CardTitle>Medical Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline medicalRecords={fetchedRecord ? [fetchedRecord] : []} />
              </CardContent>
            </Card>

            {/* Prescriptions */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline medicalRecords={fetchedRecord ? [fetchedRecord] : []} />
              </CardContent>
            </Card>
          </div>

           {/* Calendar and Notifications */}
           <div className="w-[100vw] xl:w-[100vw] space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border w-full"
                />
                <div className="mt-4 text-right" title="Plan/document Visits">
                    {/* <button className="hover:opacity-80 transition-opacity">
                      <IoIosAddCircle className="text-4xl text-blue-600 hover:text-blue-700" />
                    </button> */}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>
                  <div className='text-center mt-6 text-xl flex justify-center'>
                    Summarized Medical History <Bot className='ml-2 text-blue-700 text-2xl' />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='m-auto text-center'>
                  <Button onClick={() => summarize(fetchedRecord ? [fetchedRecord] : [])}>Summarize</Button>
                </div>
                <br />
                <br />
                {summary}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
