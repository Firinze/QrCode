"use client"

import { motion } from "framer-motion"

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative h-32 w-32">
        {/* Animated QR code outline */}
        <motion.div
          className="absolute inset-0 rounded-md border-2 border-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Inner grid animation */}
        <div className="absolute inset-4 grid grid-cols-3 grid-rows-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={i}
              className="rounded-sm bg-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                repeatDelay: 1,
              }}
            />
          ))}
        </div>

        {/* Scanning line animation */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1 bg-primary/80"
          initial={{ top: 0 }}
          animate={{ top: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="space-y-2 text-center">
        <motion.p
          className="text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Génération en cours...
        </motion.p>

        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Nous préparons votre QR code personnalisé
        </motion.p>
      </div>
    </div>
  )
}

