"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep

        return (
          <div key={index} className="flex items-center">
            <div className="relative">
              <motion.div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 bg-background text-muted-foreground",
                )}
                whileHover={!isActive && !isCompleted ? { scale: 1.05 } : {}}
                whileTap={!isActive && !isCompleted ? { scale: 0.95 } : {}}
              >
                {isCompleted ? (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <motion.polyline
                      points="20 6 9 17 4 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </motion.svg>
                ) : (
                  <span className="text-lg font-medium">{stepNumber}</span>
                )}
              </motion.div>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -inset-1 rounded-full border-2 border-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              {isActive && (
                <motion.div
                  className="absolute -inset-2 rounded-full border border-primary/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </div>
            {index < totalSteps - 1 && (
              <div className="relative h-[2px] w-12">
                <div className={cn("absolute h-full w-full", isCompleted ? "bg-primary" : "bg-muted-foreground/30")} />
                {stepNumber === currentStep - 1 && (
                  <motion.div
                    className="absolute h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

