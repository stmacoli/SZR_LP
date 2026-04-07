"use client"

import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const features = [
  "Ambiente acolhedor e higienizado",
  "Profissionais experientes e atenciosas",
  "Produtos de alta qualidade",
  "Inspiração na cultura africana",
  "Atendimento personalizado",
  "Horários flexíveis",
]

const professionals = [
  {
    name: "Zileide Rocha",
    role: "Fundadora & Nail Designer",
    description:
      "Com mais de 5 anos de experiência, Zileide traz a beleza e tradição africana para cada atendimento.",
    quote: "A beleza começa quando você decide ser você mesma.",
    image: "/profissionais/ceo_profissional_zileide.jpg",
    initials: "ZR",
  },
  {
    name: "Mariana Barbosa",
    role: "Manicure & Pedicure",
    description:
      "Especialista em nail art e técnicas de alongamento, Mariana transforma unhas em verdadeiras obras de arte.",
    quote: "Cada unha é uma tela em branco esperando para ganhar vida.",
    image: "/profissionais/manicure_profissional_mariana.jpg",
    initials: "MB",
  },
]

export function About() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const startXRef = useRef<number | null>(null)
  const endXRef = useRef<number | null>(null)
  const isMouseDownRef = useRef(false)

  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLDivElement>()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>()

  const minSwipeDistance = 60

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % professionals.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + professionals.length) % professionals.length)
  }

  const resetSwipe = () => {
    startXRef.current = null
    endXRef.current = null
    isMouseDownRef.current = false
    setIsDragging(false)
  }

  const processSwipe = () => {
    if (startXRef.current === null || endXRef.current === null) {
      resetSwipe()
      return
    }

    const distance = startXRef.current - endXRef.current

    if (distance > minSwipeDistance) {
      nextSlide()
    } else if (distance < -minSwipeDistance) {
      prevSlide()
    }

    resetSwipe()
  }

  // Touch
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startXRef.current = e.touches[0].clientX
    endXRef.current = e.touches[0].clientX
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    endXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    processSwipe()
  }

  // Mouse
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDownRef.current = true
    startXRef.current = e.clientX
    endXRef.current = e.clientX
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current) return
    endXRef.current = e.clientX
  }

  const handleMouseUp = () => {
    if (!isMouseDownRef.current) return
    processSwipe()
  }

  const handleMouseLeave = () => {
    if (!isMouseDownRef.current) return
    processSwipe()
  }

  const professional = professionals[currentSlide]

  return (
    <section id="sobre" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image/Carousel Side */}
          <div
            ref={sectionRef}
            className={`relative transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
          >
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold shadow-lg z-20">
                5+
                <span className="text-xs ml-0.5">anos</span>
              </div>

              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-secondary flex items-center justify-center shadow-lg z-20">
                <span className="text-secondary-foreground text-center text-xs font-medium leading-tight">
                  +500
                  <br />
                  clientes
                </span>
              </div>

              {/* WhatsApp Call to Action Bubble */}
              <a
                href={`https://wa.me/5511933616769?text=${encodeURIComponent(`Oi! Vim pelo site e quero agendar com a ${professional.name} 💅`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg z-20 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer animate-pulse-subtle"
              >
                <span className="text-center text-xs font-bold text-primary-foreground leading-tight px-2">
                  Agendar com
                  <br />
                  <span className="inline-block mt-1 font-serif text-sm">{professional.name.split(" ")[0]}</span>
                </span>
              </a>

              {/* Main gradient frame */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20 p-1">
                <div
                  className={`w-full h-full rounded-[22px] bg-card overflow-hidden relative select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"
                    }`}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  style={{ touchAction: "pan-y" }}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={professional.image}
                      alt={professional.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />

                  {/* Professional Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-card pointer-events-none">
                    <div className="transition-all duration-500">
                      <h3 className="font-serif text-2xl font-bold text-white mb-1">
                        {professional.name}
                      </h3>
                      <p className="text-white/80 text-sm mb-3">{professional.role}</p>
                      <blockquote className="font-serif text-lg text-white/90 italic leading-relaxed">
                        &quot;{professional.quote}&quot;
                      </blockquote>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={prevSlide}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={nextSlide}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {professionals.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                            ? "w-6 bg-white"
                            : "w-2 bg-white/50 hover:bg-white/70"
                          }`}
                        aria-label={`Ver profissional ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            ref={contentRef}
            className={`transition-all duration-700 ease-out delay-200 ${contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
              Sobre Nós
            </span>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Beleza, Arte e Ancestralidade
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              O Studio Zileide Rocha nasceu do amor pela beleza e pela cultura africana.
              Aqui, cada atendimento é uma celebração da sua individualidade,
              onde tradição e modernidade se encontram em harmonia.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nosso espaço foi criado para ser um refúgio de paz e alegria,
              onde você pode relaxar enquanto cuidamos de cada detalhe das suas mãos e pés.
            </p>

            <ul className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3"
                  style={{ animationDelay: `${index * 100 + 400}ms` }}
                >
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
