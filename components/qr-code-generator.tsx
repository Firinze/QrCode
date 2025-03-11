"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StepOne } from "@/components/step-one"
import { StepTwo } from "@/components/step-two"
import { StepThree } from "@/components/step-three"
import { LoadingAnimation } from "@/components/loading-animation"
import { SuccessMessage } from "@/components/success-message"

interface QrCodeGeneratorProps {
  currentStep: number
  setCurrentStep: (step: number) => void
}

export function QrCodeGenerator({ currentStep, setCurrentStep }: QrCodeGeneratorProps) {
  const [url, setUrl] = useState("")
  const [primaryColor, setPrimaryColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [logo, setLogo] = useState<string | null>(null)
  const [exportFormat, setExportFormat] = useState<"png" | "svg">("png")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const qrCodeRef = useRef<HTMLDivElement>(null!)

  const handleUrlSubmit = (submittedUrl: string) => {
    setUrl(submittedUrl)
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep(2)
    }, 1500)
  }

  const handleCustomizationComplete = () => {
    setCurrentStep(3)
  }

  const handleExport = () => {
    setIsLoading(true)

    // Simulate export process
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  const handleReset = () => {
    setUrl("")
    setPrimaryColor("#000000")
    setBackgroundColor("#FFFFFF")
    setLogo(null)
    setExportFormat("png")
    setCurrentStep(1)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-64 items-center justify-center"
          >
            <LoadingAnimation />
          </motion.div>
        )}

        {showSuccess && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex h-64 items-center justify-center"
          >
            <SuccessMessage onReset={handleReset} />
          </motion.div>
        )}

        {!isLoading && !showSuccess && currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StepOne onSubmit={handleUrlSubmit} />
          </motion.div>
        )}

        {!isLoading && !showSuccess && currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StepTwo
              url={url}
              primaryColor={primaryColor}
              setPrimaryColor={setPrimaryColor}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              logo={logo}
              setLogo={setLogo}
              onNext={handleCustomizationComplete}
              qrCodeRef={qrCodeRef}
            />
          </motion.div>
        )}

        {!isLoading && !showSuccess && currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <StepThree
              url={url}
              primaryColor={primaryColor}
              backgroundColor={backgroundColor}
              logo={logo}
              exportFormat={exportFormat}
              setExportFormat={setExportFormat}
              onExport={handleExport}
              qrCodeRef={qrCodeRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

