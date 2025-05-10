import IndoorNavigationSimulator from "@/components/indoor-navigation-simulator"

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-primary mb-6">Dashboard</h1>
        <p className="text-lg mb-8">
          Simulação de navegação para pessoa cega, utilizando triangulação de redes Wi-Fi em ambientes
          internos.
        </p>
        <IndoorNavigationSimulator />
      </div>
    </main>
  )
}
