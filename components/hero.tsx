"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const whatsappNumber = "5511933616769"
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de agendar um horário no Studio Zileide Rocha.")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern - Inspired by African Patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="african-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="3" fill="currentColor" className="text-primary" />
            <path d="M0 10 L10 0 L20 10 L10 20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#african-pattern)" />
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/30 blur-2xl transition-all duration-1000 ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`} />
      <div className={`absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl transition-all duration-1000 delay-200 ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`} />
      <div className={`absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-secondary/20 blur-2xl transition-all duration-1000 delay-300 ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`} />

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Logo/Brand Mark */}
        <div className={`mb-8 flex justify-center transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}>
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-3xl font-serif font-bold">ZR</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 text-balance transition-all duration-700 delay-100 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Studio Zileide Rocha
        </h1>

        {/* Tagline */}
        <p className={`text-xl md:text-2xl text-muted-foreground mb-4 font-light transition-all duration-700 delay-200 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Arte nas suas mãos, beleza na sua alma
        </p>

        {/* Subtitle */}
        <p className={`text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Um espaço de acolhimento onde cada detalhe é pensado para você. 
          Inspirado na força e beleza da cultura africana, transformamos suas unhas em verdadeiras obras de arte.
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-400 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Agende pelo WhatsApp
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-6 text-lg rounded-full transition-all duration-300"
            onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Conheça Nossos Serviços
          </Button>
        </div>

        {/* Trust Badges */}
        <div className={`mt-16 flex flex-wrap justify-center gap-8 text-muted-foreground transition-all duration-700 delay-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-sm">+500 Clientes Felizes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm">5 Anos de Experiência</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm">Produtos de Qualidade</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-all duration-700 delay-700 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  )
}
