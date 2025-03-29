import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
      </header>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Auto Cripto Trading</h1>
        <p className="text-lg items-center justify-center max-w-[900px] text-gray-600 mb-8">
          Bem-vindo ao Projeto do Tech Challenge fase 3.
          Essa plataforma web foi desenvolvida para apresentar os resultados dos modelos de Machine Learning e deep Learning usados para prever o mercado de criptomoedas, Abaixo você será redirecionado às páginas do projeto e caso queira saber mais, acesse o link de documentação na sidebar à esquerda da página.
        </p>
        <div className="flex gap-4">
          <Button asChild variant={'outline'}>
            <a href="/dashboard/backtests">Dashboard Backtests</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/dashboard/bot-running">Dashboard Bot Running</a>
          </Button>
        </div>
      </div>
    </>
  )
}