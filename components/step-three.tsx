"use client"

import { useRef, type RefObject } from "react"
import { motion } from "framer-motion"
import { Download, FileImage, FileType2 } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface StepThreeProps {
  url: string
  primaryColor: string
  backgroundColor: string
  logo: string | null
  exportFormat: "png" | "svg"
  setExportFormat: (format: "png" | "svg") => void
  onExport: () => void
  qrCodeRef: RefObject<HTMLDivElement>
}

export function StepThree({
  url,
  primaryColor,
  backgroundColor,
  logo,
  exportFormat,
  setExportFormat,
  onExport,
}: StepThreeProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  const handleDownload = () => {
    onExport()

    // This would be replaced with actual download logic
    setTimeout(() => {
      if (exportFormat === "svg") {
        // SVG download logic
        const svgData = new XMLSerializer().serializeToString(svgRef.current!)
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
        const svgUrl = URL.createObjectURL(svgBlob)
        const downloadLink = document.createElement("a")
        downloadLink.href = svgUrl
        downloadLink.download = "qr-code.svg"
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      } else {
        // PNG download logic
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const img = new Image()
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx!.drawImage(img, 0, 0)
          const pngUrl = canvas.toDataURL("image/png")
          const downloadLink = document.createElement("a")
          downloadLink.href = pngUrl
          downloadLink.download = "qr-code.png"
          document.body.appendChild(downloadLink)
          downloadLink.click()
          document.body.removeChild(downloadLink)
        }
        const svgData = new XMLSerializer().serializeToString(svgRef.current!)
        img.src = "data:image/svg+xml;base64," + btoa(svgData)
      }
    }, 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 rounded-lg border p-8 shadow-sm"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Exportez votre QR Code</h1>
        <p className="text-muted-foreground">Choisissez le format d&apos;export et téléchargez votre QR code</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Format d&apos;export</Label>
            <RadioGroup
              value={exportFormat}
              onValueChange={(value) => setExportFormat(value as "png" | "svg")}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="png" id="png" className="peer sr-only" />
                <Label
                  htmlFor="png"
                  className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <FileImage className="mb-3 h-6 w-6" />
                  PNG
                </Label>
              </div>
              <div>
                <RadioGroupItem value="svg" id="svg" className="peer sr-only" />
                <Label
                  htmlFor="svg"
                  className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <FileType2 className="mb-3 h-6 w-6" />
                  SVG
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Informations sur le format</Label>
            <div className="rounded-md bg-muted p-4 text-sm">
              {exportFormat === "png" ? (
                <p>
                  Le format PNG est idéal pour une utilisation sur le web et l&apos;impression. Il offre une bonne qualité
                  d&apos;image avec un fond transparent.
                </p>
              ) : (
                <p>
                  Le format SVG est vectoriel et permet un redimensionnement sans perte de qualité. Idéal pour
                  l&apos;impression en haute résolution et les grands formats.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center justify-center rounded-lg border p-4" style={{ backgroundColor }}>
            <QRCodeSVG
              ref={svgRef}
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
                      height: 50,
                      width: 50,
                    }
                  : undefined
              }
            />
          </div>
          <p className="text-sm text-muted-foreground">Aperçu final</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleDownload} className="gap-2">
          Télécharger <Download className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

