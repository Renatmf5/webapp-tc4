import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa'; // Importando o ícone do GitHub

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
            <p className="text-gray-600 mb-4">
              Vale ressaltar que prever movimentos no mercado financeiro é uma tarefa extremamente desafiadora, dado que o mercado é influenciado por inúmeros fatores imprevisíveis. Esta é a versão 1 do projeto, que ainda está em fase de testes e pode não gerar lucros substanciais e consistentes. No entanto, o projeto demonstra um fluxo completo e complexo de dados para tentar prever movimentos de mercado. Para uma versão futura, planeja-se incluir análises de textos e notícias, que têm grande impacto nos preços de mercado.
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
                      <strong>FastAPI:</strong> API para gerenciar operações de trading, métricas de desempenho e integração com serviços externos. Este componente centraliza as regras de abertura e fechamento de ordens em tempo real e futuramente poderá operar diretamente na Binance. Ele também busca dados de trading para alimentar a plataforma web e gerencia operações de DML com o RDS PostgreSQL.
                    </li>
                    <li>
                      <strong>Next.js:</strong> Interface web para visualização de métricas, backtests e operações em tempo real. Este repositório contém o código da plataforma web do projeto.
                    </li>
                    <li>
                      <strong>Modelos de Machine Learning:</strong> XGBoost, LSTM, MLP, Ensemble e PPO. Esses modelos são treinados no laboratório de Machine Learning para realizar previsões e tomar decisões de trading.
                    </li>
                    <li>
                      <strong>Infraestrutura AWS:</strong> EC2, S3, RDS, ALB, Route53, CodePipeline e muito mais. A infraestrutura é provisionada utilizando AWS CDK.
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
                      <strong>Backtests:</strong> Permite testar estratégias de negociação em dados históricos para avaliar sua eficácia. Os dados históricos são coletados e armazenados no S3 pelo sistema de ingestão de dados.
                    </li>
                    <li>
                      <strong>Execução de Trades:</strong> Realiza operações de compra e venda em tempo real com base em previsões dos modelos. Este processo é gerenciado pelo sistema de trading em tempo real.
                    </li>
                    <li>
                      <strong>Monitoramento:</strong> Exibe métricas de desempenho, como lucro, perda e drawdown, utilizando a interface web desenvolvida em Next.js.
                    </li>
                    <li>
                      <strong>Coleta de Dados:</strong> Obtém dados de mercado em tempo real e históricos da Binance. O sistema de ingestão de dados executa essa tarefa em batch e armazena os dados no S3.
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

          {/* Rodapé com Links dos Repositórios */}
          <CardFooter className="flex flex-wrap justify-center gap-4 mt-4">
            <Button asChild variant="outline" className="flex items-center gap-2">
              <a href="https://github.com/Renatmf5/aws-infra-tc3" target="_blank" rel="noopener noreferrer">
                <FaGithub /> aws-infra-tc3
              </a>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <a href="https://github.com/Renatmf5/trading-system-tc3" target="_blank" rel="noopener noreferrer">
                <FaGithub /> trading-system-tc3
              </a>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <a href="https://github.com/Renatmf5/FastAPI-Trading-tc3" target="_blank" rel="noopener noreferrer">
                <FaGithub /> FastAPI-Trading-tc3
              </a>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <a href="https://github.com/Renatmf5/ingest-cripto-data" target="_blank" rel="noopener noreferrer">
                <FaGithub /> ingest-cripto-data
              </a>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <a href="https://github.com/Renatmf5/ml-labs-tc3" target="_blank" rel="noopener noreferrer">
                <FaGithub /> ml-labs-tc3
              </a>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <a href="https://github.com/Renatmf5/webapp-tc3" target="_blank" rel="noopener noreferrer">
                <FaGithub /> webapp-tc3
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}