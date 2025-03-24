'use client'

import TradingTable from '@/components/data-table';
import LineChartTrading from '@/components/line-chart-trading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RunningBot() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <h1 className="p-5 text-2xl font-bold">Interface de Trading em tempo real</h1>
      <div className="p-10 grid grid-cols-1 gap-5">
        {/* Gráfico de linhas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
              Gráfico de Current Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChartTrading />
          </CardContent>
        </Card>

        {/* Tabela de dados */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
              Dados de trading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TradingTable />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}