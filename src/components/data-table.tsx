/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from 'react'
import { fetchTradingData } from '@/../services/api'

export default function TradingTable() {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnDef<any, any>[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLoading, setIsLoading] = useState(true);
  const placeholder_filter = "Search...";
  const firstColumn = "created_at"; // Ajuste para a primeira coluna que será filtrável

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tradingData = await fetchTradingData();

        // Configurar as colunas dinamicamente
        const columnDefs: ColumnDef<any, any>[] = Object.keys(tradingData[0] || {}).map((key) => {
          if (key === "unrealizedPnl" || key === "profit_loss" || key === "trade_return") {
            return {
              accessorKey: key,
              header: key.replace(/_/g, ' ').toUpperCase(),
              cell: ({ getValue }) => {
                const value = parseFloat(getValue() as string);
                let color = "text-black"; // Preto para valores 0
                if (value > 0) color = "text-green-500"; // Verde para valores positivos
                if (value < 0) color = "text-red-500"; // Vermelho para valores negativos

                // Adicionar o símbolo de porcentagem para a coluna trade_return
                const formattedValue = key === "trade_return" ? `${value.toFixed(2)}%` : value.toFixed(2);

                return <span className={color}>{formattedValue}</span>;
              },
            };
          }
          return {
            accessorKey: key,
            header: key.replace(/_/g, ' ').toUpperCase(),
            cell: ({ getValue }) => {
              const value = getValue();
              return <span className="text-black">{value}</span>; // Preto para outras colunas
            },
          };
        });

        setColumns(columnDefs);
        setData(tradingData);
      } catch (error) {
        console.error('Error fetching trading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        {!isLoading && columns.length > 0 && (
          <Input
            placeholder={placeholder_filter}
            value={(table.getColumn(firstColumn)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(firstColumn)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}