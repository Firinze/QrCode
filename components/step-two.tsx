"use client"

import type React from "react"

import { useState, useRef, type RefObject } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Upload } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

interface StepTwoProps {
  url: string
  primaryColor: string
  setPrimaryColor: (color: string) => void
  backgroundColor: string
  setBackgroundColor: (color: string) => void
  logo: string | null
  setLogo: (logo: string | null) => void
  onNext: () => void
  qrCodeRef: RefObject<HTMLDivElement>
}

export function StepTwo({
  url,
  primaryColor,
  setPrimaryColor,
  backgroundColor,
  setBackgroundColor,
  logo,
  setLogo,
  onNext,
  qrCodeRef,
}: StepTwoProps) {
  const [logoSize, setLogoSize] = useState(50)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setLogo(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogoSizeChange = (value: number[]) => {
    setLogoSize(value[0])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 rounded-lg border p-8 shadow-sm"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Personnalisez votre QR Code</h1>
        <p className="text-muted-foreground">
          Choisissez les couleurs et ajoutez votre logo pour créer un QR code unique
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Tabs defaultValue="colors">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="colors">Couleurs</TabsTrigger>
              <TabsTrigger value="logo">Logo</TabsTrigger>
            </TabsList>
            <TabsContent value="colors" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Couleur principale</Label>
                <div className="flex gap-2">
                  <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: primaryColor }} />
                  <input
                    id="primaryColor"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-10 w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Couleur d&apos;arrière-plan</Label>
                <div className="flex gap-2">
                  <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: backgroundColor }} />
                  <input
                    id="backgroundColor"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="h-10 w-full"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logo" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Ajouter un logo</Label>
                <div className="flex flex-col gap-4">
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="h-24 gap-2">
                    <Upload className="h-5 w-5" />
                    {logo ? "Changer de logo" : "Télécharger un logo"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {logo && (
                <div className="space-y-2">
                  <Label>Taille du logo</Label>
                  <Slider defaultValue={[logoSize]} min={20} max={100} step={1} onValueChange={handleLogoSizeChange} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Petit</span>
                    <span>Grand</span>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          <div
            ref={qrCodeRef}
            className="flex items-center justify-center rounded-lg border p-4"
            style={{ backgroundColor }}
          >
            <QRCodeSVG
              value={url}
              size={200}
              fgColor={primaryColor}
              bgColor={backgroundColor}
              level="H"
              imageSettings={
                logo
                  ? {
                      src: logo,
                      excavate: true,
                      height: logoSize,
                      width: logoSize,
                    }
                  : undefined
              }
            />
          </div>
          <p className="text-sm text-muted-foreground">Prévisualisation en temps réel</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} className="gap-2">
          Continuer <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

