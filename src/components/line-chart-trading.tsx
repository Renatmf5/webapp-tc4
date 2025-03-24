/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { fetchTradingData } from '@/../services/api'

const chartConfig = {
  current_value: {
    label: 'Current Value',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export default function LineChartTrading() {
  const [chartData, setChartData] = React.useState<any[]>([])

  React.useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetchTradingData()
        console.log('API Response:', response)

        // Extrair os dados para o gráfico
        const formattedData = response.map((item: any) => {
          if (!item?.created_at) return null

          // Quebrar a string no espaço para separar data e hora
          const [datePart, timePart] = item.created_at.split(', ')

          // Reformatar de "20/03/2025" para "2025-03-20"
          const [day, month, year] = datePart.split('/')
          const formattedDateString = `${year}-${month}-${day}T${timePart}`

          // Criar um objeto Date válido
          const createdAt = new Date(formattedDateString)

          return {
            date: !isNaN(createdAt.getTime()) ? createdAt.toISOString() : 'Invalid Date',
            current_value: parseFloat(item?.current_value ?? 0),
          }
        }).filter(Boolean) // Remove valores nulos


        console.log('Formatted data:', formattedData)
        setChartData(formattedData)
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }

    fetchChartData()
  }, [])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Gráfico de Current Value</CardTitle>
          <CardDescription>
            Mostrando os valores de Current Value ao longo do tempo
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[400px] w-full"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              reversed
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={['auto', 'auto']} // Ajusta automaticamente os limites do eixo Y
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="current_value"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Line
              dataKey="current_value"
              type="monotone" // Garante uma linha suave e contínua
              stroke={chartConfig.current_value.color}
              strokeWidth={2}
              dot={true}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}