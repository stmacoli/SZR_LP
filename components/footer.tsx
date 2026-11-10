import Image from "next/image"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src="/images/logo-studio.png"
                  alt="Logotipo Studio Zileide Rocha"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-xl font-bold">Studio Zileide Rocha</span>
            </div>
            <p className="text-background/70 leading-relaxed">
              Arte, beleza e técnica em cada detalhe. 
              Transformando suas unhas em obras de arte desde 2008.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#servicos" className="text-background/70 hover:text-secondary transition-colors">
                  Nossos Serviços
                </a>
              </li>
              <li>
                <a href="#contato" className="text-background/70 hover:text-secondary transition-colors">
                  Agende seu Horário
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-secondary transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-2 text-background/70">
              <li>R. Henrique Sertorio, 170</li>
              <li>Tatuapé - São Paulo, SP - 03066-065</li>
              <li>(11) 93361-6769</li>
              <li>Terça a Sábado: 8h - 18h</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} Studio Zileide Rocha. Todos os direitos reservados.
            </p>
            <p className="text-background/60 text-sm flex items-center gap-1">
              Beleza e cuidado em cada detalhe.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
