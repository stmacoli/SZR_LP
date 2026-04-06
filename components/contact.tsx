"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, MapPin, Clock, Phone } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Contact() {
  const whatsappNumber = "5511933616769"
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de agendar um horário no Studio Zileide Rocha.")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>()
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation<HTMLDivElement>()

  const contactInfo = [
    {
      icon: MapPin,
      title: "Localização",
      info: "R. Henrique Sertorio, 170",
      subinfo: "Tatuapé - São Paulo, SP - 03066-065",
    },
    {
      icon: Clock,
      title: "Horário de Funcionamento",
      info: "Segunda a Sábado",
      subinfo: "9h às 19h",
    },
    {
      icon: Phone,
      title: "Telefone",
      info: "(11) 93361-6769",
      subinfo: "WhatsApp disponível",
    },
  ]

  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d913.8!2d-46.5745!3d-23.5388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5ed4d7e9e0e5%3A0x2c5e8a5c5c5c5c5c!2sR.%20Henrique%20Sertorio%2C%20170%20-%20Tatuap%C3%A9%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003066-065!5e0!3m2!1spt-BR!2sbr!4v1700000000000"

  return (
    <section id="contato" className="py-24 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="contact-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.5" fill="currentColor" className="text-foreground" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#contact-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 lg:grid-rows-[auto_auto] gap-12 lg:gap-x-20 lg:gap-y-8 items-start">
          {/* Intro / CTA */}
          <div
            ref={contentRef}
            className={`lg:col-start-1 lg:row-start-1 transition-all duration-700 ease-out ${contentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6">
              Entre em Contato
            </span>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Vamos Agendar seu
              <br />
              Momento de Cuidado?
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Estamos prontas para receber você com todo carinho.
              Agende pelo WhatsApp e garanta seu horário especial.
            </p>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              asChild
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-3 h-6 w-6" />
                Agende pelo WhatsApp
              </a>
            </Button>
          </div>

          {/* Cards */}
          <div
            className={`lg:col-start-1 lg:row-start-2 space-y-4 transition-all duration-700 ease-out ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            {contactInfo.map((item, index) => (
              <Card
                key={index}
                className={`border border-border hover:border-primary/30 transition-all duration-500 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <CardContent className="flex items-center gap-4 p-4 md:p-6 min-h-[112px]">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-secondary" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <p className="font-medium text-foreground">{item.info}</p>
                    <p className="text-sm text-muted-foreground">{item.subinfo}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map */}
          <div
            ref={mapRef}
            className={`lg:col-start-2 lg:row-start-2 relative transition-all duration-700 ease-out delay-200 ${mapVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
          >
            <div className="relative aspect-[1/1] w-full max-w-lg mx-auto lg:mx-0">
              {/* Map Container with decorative frame */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20 p-1">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-card relative">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, pointerEvents: "none" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização Studio Zileide Rocha"
                    className="grayscale-[30%] contrast-[1.1]"
                  />
                  {/* Overlay to block interaction */}
                  <div className="absolute inset-0 bg-transparent cursor-default" />
                </div>
              </div>

              {/* Floating location badge */}
              <div className="absolute -top-3 -right-3 z-10">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">Tatuapé</span>
                </div>
              </div>

              {/* Address card overlay */}
              <div className="absolute -bottom-4 left-4 right-4 z-10">
                <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Studio Zileide Rocha</p>
                        <p className="text-sm text-muted-foreground">R. Henrique Sertorio, 170</p>
                        <p className="text-sm text-muted-foreground">Tatuapé - São Paulo, SP - 03066-065</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
