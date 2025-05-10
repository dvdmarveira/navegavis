import SignalCollectionSimulator from "@/components/signal-collection-simulator"

export default function SignalCollectionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-primary mb-6">Simulação de Coleta de Sinais</h1>
        <p className="text-lg mb-8">
          Simule o processo de mapeamento de um ambiente interno coletando sinais Wi-Fi em diferentes pontos. Clique no
          mapa para coletar sinais e construir um dataset para treinamento do sistema.
        </p>
        <SignalCollectionSimulator />
      </div>
    </main>
  )
}
