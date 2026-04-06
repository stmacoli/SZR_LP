"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Hand, Footprints, Palette, Star, Heart, MessageCircle } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const services = [
  {
    icon: Hand,
    title: "Manicure Tradicional",
    description: "Cuidado completo para suas unhas com esmaltação perfeita e duradoura.",
    price: "A partir de R$ 35",
    highlight: false,
  },
  {
    icon: Footprints,
    title: "Pedicure Completa",
    description: "Tratamento relaxante para seus pés com esfoliação e hidratação profunda.",
    price: "A partir de R$ 45",
    highlight: false,
  },
  {
    icon: Sparkles,
    title: "Unhas em Gel",
    description: "Alongamento e fortalecimento com acabamento impecável e duração prolongada.",
    price: "A partir de R$ 80",
    highlight: true,
  },
  {
    icon: Palette,
    title: "Nail Art",
    description: "Designs exclusivos e personalizados inspirados em padrões africanos e tendências.",
    price: "A partir de R$ 50",
    highlight: false,
  },
  {
    icon: Star,
    title: "Esmaltação em Gel",
    description: "Cores vibrantes com brilho intenso que dura até 3 semanas.",
    price: "A partir de R$ 55",
    highlight: false,
  },
  {
    icon: Heart,
    title: "Spa dos Pés",
    description: "Experiência completa de relaxamento com massagem e aromaterapia.",
    price: "A partir de R$ 90",
    highlight: true,
  },
]

function ServiceCard({ 
  service, 
  index, 
  isActive, 
  onToggle 
}: { 
  service: typeof services[0]; 
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.15 })
  const whatsappNumber = "5511933616769"
  
  const whatsappLink = (serviceName: string) => {
    const message = encodeURIComponent(`Olá! Gostaria de agendar ${serviceName} no Studio Zileide Rocha.`)
    return `https://wa.me/${whatsappNumber}?text=${message}`
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card 
        onClick={onToggle}
        className={`group relative overflow-hidden transition-all duration-300 h-full cursor-pointer ${
          isActive 
            ? 'shadow-xl -translate-y-1' 
            : 'hover:shadow-xl hover:-translate-y-1'
        } ${
          service.highlight 
            ? 'border-2 border-primary bg-gradient-to-br from-card to-accent/10' 
            : 'border border-border'
        }`}
      >
        {service.highlight && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              Popular
            </span>
          </div>
        )}
        
        <CardHeader className="pb-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 ${
            service.highlight 
              ? 'bg-primary text-primary-foreground' 
              : isActive
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground'
          }`}>
            <service.icon className="w-7 h-7" />
          </div>
          <CardTitle className="text-xl font-semibold text-foreground">
            {service.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed">
            {service.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">
              {service.price}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              className={`transition-all duration-300 ${
                isActive 
                  ? 'text-secondary-foreground bg-secondary' 
                  : 'text-secondary group-hover:text-secondary-foreground group-hover:bg-secondary'
              }`}
              asChild
            >
              <a 
                href={whatsappLink(service.title)} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Agendar
              </a>
            </Button>
          </div>
        </CardContent>

        {/* Decorative Pattern */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-foreground" />
            <circle cx="50" cy="50" r="20" fill="currentColor" className="text-foreground" />
          </svg>
        </div>
      </Card>
    </div>
  )
}

export function Services() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>()
  const whatsappNumber = "5511933616769"

  const handleCardToggle = (index: number) => {
    setActiveCardIndex(prev => prev === index ? null : index)
  }

  return (
    <section id="servicos" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
            Nossos Serviços
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Cuidados que Transformam
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Cada serviço é uma experiência única, combinando técnicas modernas com o carinho 
            e atenção que você merece.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service} 
              index={index} 
              isActive={activeCardIndex === index}
              onToggle={() => handleCardToggle(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Não encontrou o que procura? Entre em contato e personalizamos para você!
          </p>
          <Button 
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 text-lg rounded-full"
            asChild
          >
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Fale Conosco
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
