/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchDataMetrics } from '../../../../services/api';
import { PieChartTradeDistributionComponent } from '@/components/pie-chart-trade-distribution';
import { PieChartDecisionRatio } from '@/components/pie-chart-close-decision-ratio';
import { GaugeChart } from '@/components/pie-chart-win-rate';
import { IndicatorsCard } from '@/components/indicators-card';
import { FinalCapitalBarChart } from '@/components/final-capital-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function Backtests() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchDataMetrics();
        console.log('Fetched data:', result); // Verifica a estrutura exata do retorno

        if (Array.isArray(result) && typeof result[0] === 'string') {
          const parsedData = JSON.parse(result[0]); // Converte a string JSON para array de objetos
          const updatedData = parsedData.map((item: { start_time: string; }) => ({
            ...item,
            start_time: item.start_time.split('T')[0], // Atualiza o formato de start_time
          }));
          setData(updatedData);
        } else if (Array.isArray(result.data) && typeof result.data[0] === 'string') {
          const parsedData = JSON.parse(result.data[0]); // Caso os dados estejam dentro de uma chave "data"
          const updatedData = parsedData.map((item: { start_time: string; }) => ({
            ...item,
            start_time: item.start_time.split('T')[0], // Atualiza o formato de start_time
          }));
          setData(updatedData);
        } else {
          console.error("❌ Unexpected API response:", result);
          setData([]);
        }
      } catch (error) {
        console.error('❌ Error fetching data:', error);
        setData([]);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (startDate) {
      const filtered = data.filter((item) => item.start_time === startDate);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [startDate, data]);


  const handleDateChange = (value: string) => {
    setStartDate(value);
  };

  console.log('filteredData:', filteredData);

  // Certifique-se de que data não é null antes de mapear
  const uniqueStartDates = data.length > 0
    ? [...new Set(data.map((item) => String(item.start_time)))]
    : [];


  return (
    <>
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div>
          <label htmlFor="start-date">Periodo de 30 dias:</label>
          <Select onValueChange={handleDateChange}>
            <SelectTrigger id="start-date">
              <SelectValue placeholder="Selecione um Periodo" />
            </SelectTrigger>
            <SelectContent>
              {uniqueStartDates.map((date) => (
                <SelectItem key={date} value={date}>{date}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 w-1/5">
            <div className="aspect-video rounded-xl bg-muted/50">
              <Card className="flex h-full flex-col">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Gross Profit by $1000</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 justify-center items-center">
                  {filteredData.length > 0 &&
                    <div className="text-4xl font-bold">$ {filteredData[0].final_gross_capital - 1000}</div>}
                </CardContent>
              </Card>
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              <Card className="flex h-full flex-col">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Net Profit by $1000</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 justify-center items-center">
                  {filteredData.length > 0 &&
                    <div className="text-4xl font-bold">$ {Math.round(filteredData[0].final_capital - 1000)}</div>}
                </CardContent>
              </Card>
            </div>
            <div className="aspect-video rounded-xl bg-muted/50" >
              {filteredData.length > 0 &&
                <PieChartTradeDistributionComponent filteredData={filteredData} />}
            </div>
            <div className="aspect-video h-1/4 rounded-xl bg-muted/50">
              {filteredData.length > 0 &&
                <GaugeChart filteredData={filteredData} />}
            </div>
          </div>

          <div className="flex-1 grid auto-rows-min gap-4">
            {data.length > 0 && (
              <div className="max-w-full max-h-[400px]">
                <FinalCapitalBarChart data={data} />
              </div>
            )}
            {filteredData.length > 0 && <IndicatorsCard filteredData={filteredData} />}

            {filteredData.length > 0 && <PieChartDecisionRatio filteredData={filteredData} />}
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
}
