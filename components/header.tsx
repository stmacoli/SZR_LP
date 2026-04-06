"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const whatsappNumber = "5511933616769"
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de agendar um horário no Studio Zileide Rocha.")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Início", href: "#" },
    { label: "Serviços", href: "#servicos" },
    { label: "Contato", href: "#contato" },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-card/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isScrolled ? 'bg-primary' : 'bg-primary/90'
            }`}>
              <span className="text-primary-foreground font-serif font-bold">ZR</span>
            </div>
            <span className={`font-serif text-lg font-bold transition-colors ${
              isScrolled ? 'text-foreground' : 'text-foreground'
            }`}>
              Studio Zileide Rocha
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-medium transition-colors hover:text-primary ${
                  isScrolled ? 'text-foreground' : 'text-foreground'
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
              asChild
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Agendar
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-medium text-foreground hover:text-primary py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full"
                asChild
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Agendar pelo WhatsApp
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
