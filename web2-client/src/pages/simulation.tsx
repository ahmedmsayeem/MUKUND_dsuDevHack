import { useState } from 'react'
import ProfessionalECG from '~/components/ecg'
import { CheckFingerprint } from '~/components/patients/finger-print'
import { RegisterPasskey } from '~/components/patients/finger-print'
export default function Simulation() {


  const [fingerBool,setFingerBool] = useState<boolean>(false)
  const [critalBool,setCriticalBool] = useState<boolean>(false)

  return (
    <div>
      {/* <CheckFingerprint userID={'asdada'}></CheckFingerprint> */}
      <RegisterPasskey userID={'sdadadd'} done={()=>{}}></RegisterPasskey>
      <ProfessionalECG  />
      
    </div>
  )
}
