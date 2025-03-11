"use client"

import { motion } from "framer-motion"
import { CheckCircle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessMessageProps {
  onReset: () => void
}

export function SuccessMessage({ onReset }: SuccessMessageProps) {
  // Confetti animation
  const confetti = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -20 - Math.random() * 100,
    size: 5 + Math.random() * 10,
    color: ["#FF5E5B", "#D8D8D8", "#39A0ED", "#FFFAFF"][Math.floor(Math.random() * 4)],
    rotation: Math.random() * 360,
  }))

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative flex flex-col items-center justify-center space-y-6 text-center"
    >
      {/* Confetti animation */}
      {confetti.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: particle.size > 8 ? "50%" : "2px",
            rotate: particle.rotation,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ y: particle.y, x: particle.x, opacity: 0 }}
          animate={{
            y: `calc(100% + ${particle.size}px)`,
            opacity: [0, 1, 0],
            rotate: particle.rotation + 360,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            ease: "easeOut",
            delay: Math.random() * 0.5,
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="relative"
      >
        <div className="absolute -inset-2 animate-pulse rounded-full bg-primary/20 blur-md"></div>
        <CheckCircle className="relative h-24 w-24 text-primary" />
      </motion.div>

      <div className="space-y-2">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="text-3xl font-bold"
        >
          Félicitations !
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground"
        >
          Votre QR Code est prêt et a été téléchargé avec succès.
        </motion.p>
      </div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
        <Button
          variant="outline"
          onClick={onReset}
          className="group gap-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <RotateCcw className="h-4 w-4 transition-transform group-hover:rotate-180" />
          Créer un nouveau QR Code
        </Button>
      </motion.div>
    </motion.div>
  )
}

