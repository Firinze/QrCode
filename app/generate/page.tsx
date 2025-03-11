"use client"

import { useState } from "react"
import { QrCodeGenerator } from "@/components/qr-code-generator"
import { StepIndicator } from "@/components/step-indicator"

export default function GeneratePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  return (
    <div className="container mx-auto flex min-h-screen flex-col py-8">
      <div className="mb-8 flex items-center justify-center">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <div className="flex-1">
        <QrCodeGenerator currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </div>
  )
}

