import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { ArrowRight, User, Stethoscope, FlaskConical, FileText, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

import { IDs } from "~/components/patients/constant";
import { createUserIfNotExists } from "~/helper/db";

export default function Component() {
  const { isLoaded, userId, sessionId } = useAuth();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    // const createUser = async () => {
    //   if (isLoaded && isSignedIn && user?.fullName) {
    //     try {
    //       // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //       await createUserIfNotExists(user.fullName, 'PATIENT', IDs);
    //       alert("Patient set");
    //     } catch (error) {
    //       console.error("Error creating user:", error);
    //     }
    //   }
    // };

    // createUser();

    const createUser = async () => {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          type: 'admin',
          addresses: ['1', '2', '3'], // Example addresses as IDs
        }),
      });
    
      const data = await response.json();
      console.log(data);
    };
    
  }, [isLoaded, isSignedIn, user]); // Dependencies array

  return (
    <div className="flex flex-col min-h-screen text-center">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Secure Access to Your Medical History
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  HealthChain provides easy and secure access to your medical records, ensuring better care and timely treatment, with emergency data release capabilities.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/login">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 px-6">
              <Card>
                <CardHeader>
                  <User className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Patient Access</CardTitle>
                  <CardDescription>
                    View and manage your detailed medical history with ease through our secure blockchain technology.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link className="inline-flex items-center text-primary hover:underline" href="#">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Stethoscope className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Doctor Updates</CardTitle>
                  <CardDescription>
                    Doctors can securely upload prescriptions and treatment details to keep records up-to-date.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link className="inline-flex items-center text-primary hover:underline" href="#">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FlaskConical className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Lab Results</CardTitle>
                  <CardDescription>
                    Lab assistants can directly upload test results, ensuring comprehensive and timely updates.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link className="inline-flex items-center text-primary hover:underline" href="#">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Insurance Documentation</CardTitle>
                  <CardDescription>
                    Easily obtain and manage documents for insurance proof and claims, streamlining your healthcare administration.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link className="inline-flex items-center text-primary hover:underline" href="#">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <AlertTriangle className="h-12 w-12 mb-4" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Emergency Data Release</h2>
              <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our innovative emergency data release feature ensures that critical medical information is available
                when it matters most. In emergency situations, authorized medical professionals can access vital
                data, potentially saving lives.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/emergency-access">Learn About Emergency Access</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join HealthChain Today</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Take control of your medical history, collaborate with healthcare professionals, and ensure better
                  healthcare outcomes. Sign up now to experience the future of medical record management.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link href="/signup">Sign Up as Patient</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/healthcare-signup">Healthcare Professional Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 HealthChain. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Support
          </Link>
        </nav>
      </footer>
    </div>
  );
}
