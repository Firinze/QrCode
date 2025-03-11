"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface StepOneProps {
  onSubmit: (url: string) => void
}

export function StepOne({ onSubmit }: StepOneProps) {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      setError("Veuillez entrer une URL ou un texte")
      return
    }

    // Basic URL validation
    if (url.startsWith("http") && !url.match(/^(http|https):\/\/[^ "]+$/)) {
      setError("Veuillez entrer une URL valide")
      return
    }

    setError("")
    onSubmit(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 rounded-lg border p-8 shadow-sm"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Créez votre QR Code</h1>
        <p className="text-muted-foreground">Entrez l&apos;URL ou le texte que vous souhaitez encoder dans votre QR code</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="url">URL ou texte</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              <LinkIcon className="h-4 w-4" />
            </div>
            <Input
              id="url"
              type="text"
              placeholder="https://example.com ou votre texte"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <Button type="submit" className="w-full gap-2">
          Continuer <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        <p>Exemples: URL de site web, coordonnées, texte, Wi-Fi, etc.</p>
      </div>
    </motion.div>
  )
}

