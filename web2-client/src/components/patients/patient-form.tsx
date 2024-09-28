"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
// import { RegisterFingerPrint } from "./finger-print";
import { DatePicker } from "../ui/date-picker-form";

export default function PatientForm() {
  return (
    <div className="container mx-auto mt-10 w-[50%]">
      <Card>
        <CardHeader>
          <CardTitle>Patient Details </CardTitle>
          <CardDescription>
            Please enter your deatails accurately
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                className="w-full"
                defaultValue="John Doe"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name">Age</Label>
              <Input
                id="age"
                type="number"
                className="w-full"
                defaultValue=""
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="birth-date">Birth Date</Label>
              <DatePicker/>
              </div>
            <div className="grid gap-3">
              <Label htmlFor="Phone number">Phone Number</Label>
              <Input
                id="phone-number"
                type="number"
                className="w-full"
                defaultValue=""
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Address</Label>
              <Textarea id="description" defaultValue="" className="min-h-32" />
            </div>
            {/* <RegisterFingerPrint /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
