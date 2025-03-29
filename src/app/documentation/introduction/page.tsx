import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DocIntro() {
  return (
    <>
      {/* Cabeçalho */}
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-xl font-bold">Documentação do Projeto</h1>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Introdução ao Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Este projeto é uma aplicação de trading automatizado que utiliza dados de mercado da Binance para realizar análises e executar operações de compra e venda de criptomoedas. Ele combina modelos de Machine Learning, Deep Learning e Aprendizado por Reforço, além de uma infraestrutura robusta na AWS.
            </p>
            <Separator className="my-4" />
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="components">Componentes</TabsTrigger>
                <TabsTrigger value="functions">Funcionalidades</TabsTrigger>
                <TabsTrigger value="workflow">Como Funciona</TabsTrigger>
              </TabsList>

              {/* Visão Geral */}
              <TabsContent value="overview">
                <ScrollArea className="h-64">
                  <h2 className="text-xl font-semibold mb-2">Visão Geral</h2>
                  <p className="mb-2">
                    O projeto é dividido em três principais sistemas:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>
                      <strong>Sistema de Trading:</strong> Executa operações de compra e venda em tempo real utilizando modelos de Machine Learning e Deep Learning.
                    </li>
                    <li>
                      <strong>Laboratório de Modelos:</strong> Realiza backtests e otimizações em estratégias de negociação utilizando dados históricos refinados.
                    </li>
                    <li>
                      <strong>Sistema de Coleta de Dados:</strong> Coleta e refina dados históricos de candles da Binance Futures, armazenando-os em um Data Lake.
                    </li>
                  </ul>
                </ScrollArea>
              </TabsContent>

              {/* Componentes */}
              <TabsContent value="components">
                <ScrollArea className="h-64">
                  <h2 className="text-xl font-semibold mb-2">Componentes do Projeto</h2>
                  <ul className="list-disc pl-6">
                    <li>
                      <strong>FastAPI:</strong> API para gerenciar operações de trading, métricas de desempenho e integração com serviços externos.
                    </li>
                    <li>
                      <strong>Next.js:</strong> Interface web para visualização de métricas, backtests e operações em tempo real.
                    </li>
                    <li>
                      <strong>Modelos de Machine Learning:</strong> XGBoost, LSTM, MLP, Ensemble e PPO.
                    </li>
                    <li>
                      <strong>Infraestrutura AWS:</strong> EC2, S3, RDS, ALB, Route53, CodePipeline e muito mais.
                    </li>
                  </ul>
                </ScrollArea>
              </TabsContent>

              {/* Funcionalidades */}
              <TabsContent value="functions">
                <ScrollArea className="h-64">
                  <h2 className="text-xl font-semibold mb-2">Funcionalidades Principais</h2>
                  <ul className="list-disc pl-6">
                    <li>
                      <strong>Backtests:</strong> Permite testar estratégias de negociação em dados históricos para avaliar sua eficácia.
                    </li>
                    <li>
                      <strong>Execução de Trades:</strong> Realiza operações de compra e venda em tempo real com base em previsões dos modelos.
                    </li>
                    <li>
                      <strong>Monitoramento:</strong> Exibe métricas de desempenho, como lucro, perda e drawdown.
                    </li>
                    <li>
                      <strong>Coleta de Dados:</strong> Obtém dados de mercado em tempo real e históricos da Binance.
                    </li>
                  </ul>
                </ScrollArea>
              </TabsContent>

              {/* Como Funciona */}
              <TabsContent value="workflow">
                <ScrollArea className="h-64">
                  <h2 className="text-xl font-semibold mb-2">Como Funciona</h2>
                  <p className="mb-2">
                    O fluxo de trabalho do sistema é dividido em etapas:
                  </p>
                  <ol className="list-decimal pl-6">
                    <li>
                      <strong>Coleta de Dados:</strong> O sistema coleta dados de mercado em tempo real e históricos da Binance.
                    </li>
                    <li>
                      <strong>Processamento:</strong> Os dados coletados são processados e indicadores técnicos são calculados.
                    </li>
                    <li>
                      <strong>Previsões:</strong> Os modelos de Machine Learning fazem previsões com base nos dados processados.
                    </li>
                    <li>
                      <strong>Execução:</strong> As previsões são usadas para executar operações de compra e venda.
                    </li>
                    <li>
                      <strong>Monitoramento:</strong> Métricas de desempenho são exibidas na interface web para análise.
                    </li>
                  </ol>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}