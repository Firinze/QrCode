"use client"

import Link from "next/link"
import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowRight, QrCode, CheckCircle, Zap, Palette, Image, Download, MousePointer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  const featuresRef = useRef<HTMLDivElement>(null)
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 })

  const showcaseRef = useRef<HTMLDivElement>(null)
  const showcaseInView = useInView(showcaseRef, { once: true, amount: 0.2 })

  const testimonialsRef = useRef<HTMLDivElement>(null)
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 })

  const faqRef = useRef<HTMLDivElement>(null)
  const faqInView = useInView(faqRef, { once: true, amount: 0.2 })

  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const fadeInStagger = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Floating gradient background */}
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-white">
        <div className="absolute -left-[10%] top-0 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-r from-primary/10 to-primary/5 blur-[100px]" />
        <div
          className="absolute -right-[10%] top-[30%] h-[400px] w-[400px] animate-pulse rounded-full bg-gradient-to-l from-primary/10 to-primary/5 blur-[100px]"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-[10%] left-[20%] h-[300px] w-[300px] animate-pulse rounded-full bg-gradient-to-t from-primary/10 to-primary/5 blur-[100px]"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold">
            <QrCode className="h-6 w-6" />
            <span>QR Studio</span>
          </div>
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-6">
              <li>
                <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#showcase" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Exemples
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Témoignages
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <Link href="/generate">
              <Button size="sm" variant="default">
                Créer un QR Code
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1" ref={targetRef}>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32" ref={heroRef}>
          <motion.div
            style={{ opacity, scale }}
            className="container flex max-w-[64rem] flex-col items-center gap-4 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 px-4 py-1.5 text-sm font-medium"
            >
              Créez des QR codes personnalisés gratuitement
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Générateur de QR Codes
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {" "}
                Personnalisés
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
            >
              Créez des QR codes uniques pour vos cartes de visite, sites web, menus et plus encore. Personnalisez les
              couleurs, ajoutez votre logo et exportez en haute qualité.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-4 flex flex-wrap justify-center gap-4"
            >
              <Link href="/generate">
                <Button size="lg" className="group gap-2">
                  Créer mon QR Code
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating QR codes */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -100, y: -50, rotate: -10 }}
              animate={
                heroInView ? { opacity: 0.5, x: -50, y: -20, rotate: -5 } : { opacity: 0, x: -100, y: -50, rotate: -10 }
              }
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute left-[10%] top-[20%] h-24 w-24 rounded-lg border bg-background shadow-md"
            >
              <QrCode className="h-full w-full p-4 text-primary/40" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
              animate={
                heroInView ? { opacity: 0.5, x: 50, y: 50, rotate: 5 } : { opacity: 0, x: 100, y: 100, rotate: 10 }
              }
              transition={{ duration: 1, delay: 0.7 }}
              className="absolute right-[10%] top-[40%] h-32 w-32 rounded-lg border bg-background shadow-md"
            >
              <QrCode className="h-full w-full p-6 text-primary/40" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -80, y: 120, rotate: 15 }}
              animate={
                heroInView ? { opacity: 0.5, x: -40, y: 80, rotate: 8 } : { opacity: 0, x: -80, y: 120, rotate: 15 }
              }
              transition={{ duration: 1, delay: 0.9 }}
              className="absolute bottom-[10%] left-[20%] h-28 w-28 rounded-lg border bg-background shadow-md"
            >
              <QrCode className="h-full w-full p-5 text-primary/40" />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20" ref={featuresRef}>
          <div className="container">
            <motion.div
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
            >
              <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Fonctionnalités</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Tout ce dont vous avez besoin pour créer des QR codes professionnels
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={staggerChildren}
              className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 md:grid-cols-3"
            >
              <motion.div
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Rapide et Simple</h3>
                <p className="text-muted-foreground">
                  Générez un QR code en quelques secondes, sans inscription ni configuration complexe.
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Palette className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Personnalisation</h3>
                <p className="text-muted-foreground">
                  Choisissez les couleurs qui correspondent à votre marque pour un QR code unique.
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Image className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Logo Intégré</h3>
                <p className="text-muted-foreground">
                  Ajoutez votre logo au centre du QR code pour renforcer votre identité visuelle.
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Formats Multiples</h3>
                <p className="text-muted-foreground">
                  Exportez en PNG pour le web ou en SVG pour l&apos;impression en haute résolution.
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MousePointer className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Interface Intuitive</h3>
                <p className="text-muted-foreground">
                  Une expérience utilisateur fluide avec prévisualisation en temps réel.
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">100% Gratuit</h3>
                <p className="text-muted-foreground">
                  Aucun coût caché, aucune limite d&apos;utilisation, aucune inscription requise.
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-muted/50 py-20">
          <div className="container">
            <motion.div
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
            >
              <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Comment ça fonctionne
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Générez votre QR code en 3 étapes simples
              </p>
            </motion.div>

            <div className="relative mx-auto mt-16 max-w-5xl">
              {/* Connecting line */}
              <div className="absolute left-[50%] top-0 h-full w-0.5 -translate-x-1/2 bg-primary/20 md:left-0 md:top-[50%] md:h-0.5 md:w-full md:-translate-y-1/2 md:translate-x-0"></div>

              <div className="grid gap-12 md:grid-cols-3">
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate={featuresInView ? "visible" : "hidden"}
                  variants={fadeInStagger}
                  className="relative z-10 flex flex-col items-center rounded-lg border bg-background p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Entrez votre lien</h3>
                  <p className="text-center text-muted-foreground">
                    Saisissez l&apos;URL ou le texte que vous souhaitez encoder dans votre QR code.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 rounded-md bg-muted p-4"
                  >
                    <div className="h-8 w-full rounded-md bg-primary/10"></div>
                  </motion.div>
                </motion.div>

                <motion.div
                  custom={1}
                  initial="hidden"
                  animate={featuresInView ? "visible" : "hidden"}
                  variants={fadeInStagger}
                  className="relative z-10 flex flex-col items-center rounded-lg border bg-background p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Personnalisez</h3>
                  <p className="text-center text-muted-foreground">
                    Choisissez les couleurs et ajoutez votre logo pour créer un QR code unique.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 rounded-md bg-muted p-4"
                  >
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary"></div>
                      <div className="h-8 w-8 rounded-full bg-background"></div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  custom={2}
                  initial="hidden"
                  animate={featuresInView ? "visible" : "hidden"}
                  variants={fadeInStagger}
                  className="relative z-10 flex flex-col items-center rounded-lg border bg-background p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Exportez</h3>
                  <p className="text-center text-muted-foreground">
                    Téléchargez votre QR code au format PNG ou SVG, prêt à être utilisé.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 rounded-md bg-muted p-4"
                  >
                    <div className="flex gap-2">
                      <div className="h-8 w-16 rounded-md bg-primary/10 text-center text-xs font-medium leading-8">
                        PNG
                      </div>
                      <div className="h-8 w-16 rounded-md bg-primary/10 text-center text-xs font-medium leading-8">
                        SVG
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section id="showcase" className="py-20" ref={showcaseRef}>
          <div className="container">
            <motion.div
              initial="hidden"
              animate={showcaseInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
            >
              <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Exemples d&apos;utilisation
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Découvrez comment nos QR codes peuvent être utilisés
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={showcaseInView ? "visible" : "hidden"}
              variants={staggerChildren}
              className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="overflow-hidden rounded-xl border bg-background shadow-sm"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                  <div className="mx-auto h-full max-w-[180px] rounded-lg bg-white p-4 shadow-md">
                    <QrCode className="h-full w-full text-primary" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">Carte de visite</h3>
                  <p className="text-muted-foreground">
                    Ajoutez un QR code sur vos cartes de visite pour partager facilement vos coordonnées et votre site
                    web.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="overflow-hidden rounded-xl border bg-background shadow-sm"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                  <div className="mx-auto h-full max-w-[180px] rounded-lg bg-white p-4 shadow-md">
                    <QrCode className="h-full w-full text-primary" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">Menu de restaurant</h3>
                  <p className="text-muted-foreground">
                    Permettez à vos clients d&apos;accéder à votre menu en ligne en scannant un simple QR code.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="overflow-hidden rounded-xl border bg-background shadow-sm"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                  <div className="mx-auto h-full max-w-[180px] rounded-lg bg-white p-4 shadow-md">
                    <QrCode className="h-full w-full text-primary" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">Événements</h3>
                  <p className="text-muted-foreground">
                    Facilitez l&apos;accès aux informations de vos événements avec un QR code sur vos affiches et
                    invitations.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-muted/50 py-20" ref={testimonialsRef}>
          <div className="container">
            <motion.div
              initial="hidden"
              animate={testimonialsInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
            >
              <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Ce que disent nos utilisateurs
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Des milliers d&apos;utilisateurs satisfaits
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={testimonialsInView ? "visible" : "hidden"}
              variants={staggerChildren}
              className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <motion.div variants={fadeInUp} className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10"></div>
                  <div>
                    <h4 className="font-semibold">Sophie Martin</h4>
                    <p className="text-sm text-muted-foreground">Graphiste</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  &quot;J&apos;utilise QR Studio pour tous mes projets clients. La possibilité de personnaliser les couleurs et
                  d&apos;ajouter un logo est exactement ce dont j&apos;avais besoin !&quot;
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10"></div>
                  <div>
                    <h4 className="font-semibold">Thomas Dubois</h4>
                    <p className="text-sm text-muted-foreground">Restaurateur</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  &quot;Grâce à QR Studio, j&apos;ai pu créer des QR codes pour mon menu qui correspondent parfaitement à
                  l&apos;identité visuelle de mon restaurant.&quot;
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10"></div>
                  <div>
                    <h4 className="font-semibold">Julie Leroy</h4>
                    <p className="text-sm text-muted-foreground">Organisatrice d&apos;événements</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  &quot;Interface intuitive et résultats professionnels. J&apos;ai pu créer des QR codes pour tous mes événements
                  en quelques minutes seulement. Un outil indispensable !&quot;
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20" ref={faqRef}>
          <div className="container">
            <motion.div
              initial="hidden"
              animate={faqInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
            >
              <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Questions fréquentes
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Tout ce que vous devez savoir sur QR Studio
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={faqInView ? "visible" : "hidden"}
              variants={staggerChildren}
              className="mx-auto mt-16 max-w-3xl space-y-4"
            >
              <motion.div variants={fadeInUp} className="rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Est-ce vraiment gratuit ?</h3>
                <p className="mt-2 text-muted-foreground">
                  Oui, QR Studio est entièrement gratuit. Aucune inscription, aucun paiement, aucune limite
                  d&apos;utilisation.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Les QR codes expirent-ils ?</h3>
                <p className="mt-2 text-muted-foreground">
                  Non, les QR codes générés sont permanents. Ils fonctionneront tant que l&apos;URL ou le contenu qu&apos;ils
                  contiennent reste valide.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Puis-je modifier un QR code après l&apos;avoir créé ?</h3>
                <p className="mt-2 text-muted-foreground">
                  Le contenu d&apos;un QR code ne peut pas être modifié après sa création. Vous devrez générer un nouveau QR
                  code si vous souhaitez changer l&apos;URL ou le texte.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Quelle est la meilleure résolution pour imprimer un QR code ?</h3>
                <p className="mt-2 text-muted-foreground">
                  Pour l&apos;impression, nous recommandons d&apos;utiliser le format SVG qui peut être redimensionné sans perte
                  de qualité. Assurez-vous que votre QR code mesure au moins 2 cm x 2 cm une fois imprimé.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 py-20" ref={ctaRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="container"
          >
            <Card className="mx-auto max-w-4xl overflow-hidden border-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 shadow-lg">
              <div className="grid gap-6 p-6 md:grid-cols-2 md:gap-10 md:p-10">
                <div className="flex flex-col justify-center space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight">Prêt à créer votre QR code ?</h2>
                  <p className="text-muted-foreground">
                    Générez un QR code personnalisé en quelques clics, gratuitement et sans inscription.
                  </p>
                  <div className="pt-4">
                    <Link href="/generate">
                      <Button size="lg" className="group gap-2">
                        Créer mon QR Code
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="relative h-48 w-48"
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"></div>
                    <div className="absolute inset-4 rounded-full border-2 border-dashed border-primary/40"></div>
                    <div className="absolute inset-8 rounded-full border-2 border-dashed border-primary/50"></div>
                    <div className="absolute inset-12 rounded-full border-2 border-primary/60"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <QrCode className="h-20 w-20 text-primary" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2 font-bold">
              <QrCode className="h-6 w-6" />
              <span>QR Studio</span>
            </div>
            <nav>
              <ul className="flex flex-wrap items-center justify-center gap-6">
                <li>
                  <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#showcase" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Exemples
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Témoignages
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    FAQ
                  </a>
                </li>
              </ul>
            </nav>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} QR Studio. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

