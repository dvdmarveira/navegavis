import Link from "next/link"
import { ArrowRight, Eye, MapPin, Navigation, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Navigation className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-primary">NavegaVis</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#como-funciona" className="text-sm font-medium hover:text-primary">
              Como Funciona
            </Link>
            <Link href="#acessibilidade" className="text-sm font-medium hover:text-primary">
              Acessibilidade
            </Link>
            <Link href="#impacto" className="text-sm font-medium hover:text-primary">
              Impacto
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
          </nav>
          <Link href="/dashboard" className="md:hidden">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Navegação Indoor para Acessibilidade</h1>
              <p className="text-xl mb-8 text-gray-700">
                Guiando pessoas com deficiência visual em ambientes internos através de sinais Wi-Fi e comandos de voz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Experimentar Simulação <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#como-funciona">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Saiba Mais
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -z-10 top-0 left-0 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="p-4 bg-primary text-white">
                    <div className="flex items-center space-x-2">
                      <Navigation className="h-5 w-5" />
                      <span className="font-medium">NavegaVis</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg mb-4">
                      <img
                        src="/indoor-navigation-wifi.png"
                        alt="Mapa de navegação indoor"
                        className="h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex items-center p-3 bg-primary/10 rounded-md mb-4">
                      <div className="text-lg font-medium">Siga em frente por 10 metros.</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-2 bg-green-500 rounded"></div>
                      <div className="h-2 bg-yellow-500 rounded"></div>
                      <div className="h-2 bg-red-500 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mapeamento Wi-Fi</h3>
              <p className="text-gray-600">
                Mapeamos os locais com redes Wi-Fi existentes, registrando a intensidade do sinal em cada ponto.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Triangulação</h3>
              <p className="text-gray-600">
                Calculamos a localização precisa através da triangulação dos sinais Wi-Fi detectados.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rotas Seguras</h3>
              <p className="text-gray-600">
                Criamos rotas acessíveis e seguras, evitando obstáculos e priorizando caminhos simples.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comandos de Voz</h3>
              <p className="text-gray-600">
                Fornecemos instruções claras e precisas por voz para guiar o usuário até seu destino.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline de Treinamento */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Como Treinamos o Sistema</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            Nosso processo de mapeamento e treinamento garante navegação precisa em ambientes internos, mesmo sem GPS ou
            hardware especializado.
          </p>

          <div className="relative">
            {/* Linha vertical central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded-full"></div>

            {/* Etapas da Timeline */}
            <div className="space-y-24 relative">
              {/* Etapa 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-primary mb-3">Mapeamento do Ambiente</h3>
                  <p className="text-gray-600">
                    Percorremos todo o ambiente com um dispositivo que registra os sinais Wi-Fi disponíveis. Cada ponto
                    do mapa é associado às redes detectadas e suas respectivas intensidades (RSSI).
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                  <div className="relative">
                    <div className="absolute -z-10 w-full h-full bg-primary/5 rounded-full blur-xl"></div>
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                      1
                    </div>
                  </div>
                </div>
              </div>

              {/* Etapa 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative">
                    <div className="absolute -z-10 w-full h-full bg-primary/5 rounded-full blur-xl"></div>
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                      2
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-16 mt-8 md:mt-0">
                  <h3 className="text-2xl font-bold text-primary mb-3">Criação do Banco de Dados</h3>
                  <p className="text-gray-600">
                    Construímos um banco de dados espacial que relaciona cada coordenada do ambiente com sua "assinatura
                    Wi-Fi" única. Estes dados formam a base do nosso sistema de localização.
                  </p>
                </div>
              </div>

              {/* Etapa 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-primary mb-3">Definição de Rotas Seguras</h3>
                  <p className="text-gray-600">
                    Especialistas em acessibilidade identificam e mapeiam rotas seguras e livres de obstáculos. Cada
                    rota é validada por pessoas com deficiência visual para garantir sua usabilidade.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                  <div className="relative">
                    <div className="absolute -z-10 w-full h-full bg-primary/5 rounded-full blur-xl"></div>
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                      3
                    </div>
                  </div>
                </div>
              </div>

              {/* Etapa 4 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative">
                    <div className="absolute -z-10 w-full h-full bg-primary/5 rounded-full blur-xl"></div>
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                      4
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-16 mt-8 md:mt-0">
                  <h3 className="text-2xl font-bold text-primary mb-3">Treinamento do Algoritmo</h3>
                  <p className="text-gray-600">
                    Nosso algoritmo de machine learning é treinado com os dados coletados para reconhecer padrões e
                    prever a localização com base nas leituras de Wi-Fi em tempo real, mesmo com variações de sinal.
                  </p>
                </div>
              </div>

              {/* Etapa 5 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-primary mb-3">Calibração e Testes</h3>
                  <p className="text-gray-600">
                    Realizamos testes extensivos em diferentes condições (horários, ocupação do espaço) para calibrar o
                    sistema. Ajustamos os parâmetros para garantir precisão consistente em todas as situações.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                  <div className="relative">
                    <div className="absolute -z-10 w-full h-full bg-primary/5 rounded-full blur-xl"></div>
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                      5
                    </div>
                  </div>
                </div>
              </div>

              {/* Etapa 6 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative">
                    <div className="absolute -z-10 w-full h-full bg-primary/5 rounded-full blur-xl"></div>
                    <div className="w-16 h-16 bg-success text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                      6
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-16 mt-8 md:mt-0">
                  <h3 className="text-2xl font-bold text-success mb-3">Implementação e Monitoramento</h3>
                  <p className="text-gray-600">
                    O sistema é implementado no ambiente e monitorado continuamente. Feedback dos usuários e dados de
                    uso são coletados para melhorias constantes e adaptação a mudanças no ambiente.
                  </p>
                </div>
              </div>
            </div>

            {/* Indicador de conclusão */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12">
              <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32 text-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Ver Simulação em Ação
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Acessibilidade */}
      <section id="acessibilidade" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Acessibilidade em Primeiro Lugar</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/blind-person-indoor-navigation.png"
                alt="Pessoa com deficiência visual navegando com smartphone"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            <div>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="bg-success text-white p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Comandos de Voz Claros</h3>
                    <p className="text-gray-600">
                      Instruções simples e diretas, otimizadas para compreensão imediata e sem ambiguidades.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-success text-white p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Feedback Contínuo</h3>
                    <p className="text-gray-600">
                      Atualizações constantes sobre a posição e direção, garantindo confiança durante o percurso.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-success text-white p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Detecção de Desvios</h3>
                    <p className="text-gray-600">
                      Identificação imediata quando o usuário sai da rota, com instruções para retornar ao caminho
                      correto.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-success text-white p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Infraestrutura Existente</h3>
                    <p className="text-gray-600">
                      Utiliza redes Wi-Fi já instaladas, sem necessidade de equipamentos adicionais caros.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section id="impacto" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Impacto Social</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary/5 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-primary mb-2">285 milhões</h3>
              <p className="text-gray-700">
                Pessoas com deficiência visual no mundo que podem se beneficiar de soluções de navegação indoor.
              </p>
            </div>
            <div className="bg-primary/5 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-primary mb-2">90%</h3>
              <p className="text-gray-700">
                Dos ambientes internos não possuem soluções de acessibilidade para navegação independente.
              </p>
            </div>
            <div className="bg-primary/5 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-primary mb-2">100%</h3>
              <p className="text-gray-700">
                Compatível com infraestrutura Wi-Fi existente, sem necessidade de investimentos adicionais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Experimente a Simulação</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Veja como o NavegaVis pode transformar a experiência de navegação indoor para pessoas com deficiência
            visual.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary">
              Acessar Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Navigation className="h-6 w-6 text-white" />
                <span className="font-bold text-xl text-white">NavegaVis</span>
              </div>
              <p className="max-w-xs text-gray-400">
                Transformando a navegação indoor para pessoas com deficiência visual através da tecnologia.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Navegação</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="#como-funciona" className="text-gray-400 hover:text-white">
                      Como Funciona
                    </Link>
                  </li>
                  <li>
                    <Link href="#acessibilidade" className="text-gray-400 hover:text-white">
                      Acessibilidade
                    </Link>
                  </li>
                  <li>
                    <Link href="#impacto" className="text-gray-400 hover:text-white">
                      Impacto
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Recursos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/dashboard" className="text-gray-400 hover:text-white">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Documentação
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      API
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Contato</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:contato@navegavis.com" className="text-gray-400 hover:text-white">
                      contato@navegavis.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+5511999999999" className="text-gray-400 hover:text-white">
                      +55 (11) 99999-9999
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} NavegaVis. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
