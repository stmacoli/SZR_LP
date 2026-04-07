"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Image from "next/image"

const galleryItems = [
  { image: "/galeria/manicure_tradicional.webp", label: "Manicure Tradicional" },
  { image: "/galeria/alongamento_gel.webp", label: "Esmaltação em Gel" },
  { image: "/galeria/combo.webp", label: "Combo Pés + Mãos" },
  { image: "/galeria/esmaltacao_gel.webp", label: "Esmaltação em Gel" },
  { image: "/galeria/pedicure_tradicional.webp", label: "Pedicure Tradicional" },
  { image: "/galeria/spa_pes.webp", label: "Spa Pés" },
]

function GalleryItem({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.15 })

  return (
    <div
      ref={ref}
      className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer group transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 transition-transform duration-500 ${
          isHovered ? "scale-110" : "scale-100"
        }`}
      >
        <Image
          src={item.image}
          alt={item.label}
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />


      {/* Label */}
      <div className={`absolute inset-0 flex items-end p-4 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="w-full bg-card/90 backdrop-blur-sm rounded-xl p-4">
          <span className="font-medium text-foreground">{item.label}</span>
        </div>
      </div>

      {/* Hover Border */}
      <div className={`absolute inset-0 rounded-2xl border-4 transition-colors duration-300 ${
        isHovered ? 'border-primary' : 'border-transparent'
      }`} />
    </div>
  )
}

export function Gallery() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/30 text-accent-foreground text-sm font-medium mb-4">
            Nossa Arte
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Inspirações para Você
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Cada trabalho é único, assim como você. Veja algumas das nossas criações 
            inspiradas em tendências atuais.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {galleryItems.map((item, index) => (
            <GalleryItem key={index} item={item} index={index} />
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Siga-nos no Instagram para mais inspirações
          </p>
          <a 
            href="https://www.instagram.com/studiozileiderocha?igsh=MThlZThzdHo3bGphbA==" 
            className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 font-medium transition-colors"
            target="_blanck"
          >
            @studiozileiderocha
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
