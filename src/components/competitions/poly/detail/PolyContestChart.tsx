
import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart2, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";
import { PriceHistoryPoint } from "@/types/competitions";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PolyContestChartProps {
  priceHistory: PriceHistoryPoint[];
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
}

const PolyContestChart = ({ 
  priceHistory, 
  timeRange, 
  onTimeRangeChange 
}: PolyContestChartProps) => {
  const getFilteredPriceHistory = () => {
    if (!priceHistory.length) return [];
    
    const now = new Date();
    let cutoff = new Date();
    
    switch (timeRange) {
      case "1h":
        cutoff.setHours(now.getHours() - 1);
        break;
      case "6h":
        cutoff.setHours(now.getHours() - 6);
        break;
      case "1d":
        cutoff.setDate(now.getDate() - 1);
        break;
      case "1w":
        cutoff.setDate(now.getDate() - 7);
        break;
      case "1m":
        cutoff.setMonth(now.getMonth() - 1);
        break;
      case "all":
      default:
        return priceHistory;
    }
    
    return priceHistory.filter(
      point => new Date(point.timestamp) >= cutoff
    );
  };

  return (
    <Card className="p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-amber-600" />
          Price History
        </h3>
        
        <Tabs 
          value={timeRange} 
          onValueChange={onTimeRangeChange} 
          className="h-8"
        >
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="1h" className="text-xs px-2">1H</TabsTrigger>
            <TabsTrigger value="6h" className="text-xs px-2">6H</TabsTrigger>
            <TabsTrigger value="1d" className="text-xs px-2">1D</TabsTrigger>
            <TabsTrigger value="1w" className="text-xs px-2">1W</TabsTrigger>
            <TabsTrigger value="1m" className="text-xs px-2">1M</TabsTrigger>
            <TabsTrigger value="all" className="text-xs px-2">ALL</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="h-64">
        {priceHistory.length > 0 ? (
          <ChartContainer
            className="h-64"
            config={{
              yes: {
                color: "#10B981",
              },
              no: {
                color: "#EF4444",
              },
            }}
          >
            <AreaChart data={getFilteredPriceHistory()}>
              <defs>
                <linearGradient id="yes-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="no-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(timestamp) => {
                  return format(new Date(timestamp), "HH:mm");
                }}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                tickFormatter={(value) => `₹${value.toFixed(2)}`}
                domain={[0, 1]}
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <Tooltip 
                content={(props: any) => {
                  const { active, payload } = props;
                  if (
                    active &&
                    payload &&
                    payload.length &&
                    typeof payload[0].value === "number" &&
                    typeof payload[1]?.value === "number"
                  ) {
                    return (
                      <div className="bg-white p-3 border rounded-md shadow-sm">
                        <p className="text-xs font-medium mb-1">
                          {format(new Date(payload[0].payload.timestamp), "PPp")}
                        </p>
                        <p className="text-sm flex items-center text-green-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Yes: ₹{Number(payload[0].value).toFixed(2)}
                        </p>
                        <p className="text-sm flex items-center text-red-600">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          No: ₹{Number(payload[1].value).toFixed(2)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="yes_price"
                stroke="#10B981"
                fill="url(#yes-gradient)"
                name="Yes"
                activeDot={{ r: 6, fill: "#10B981" }}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="no_price"
                stroke="#EF4444"
                fill="url(#no-gradient)"
                name="No"
                activeDot={{ r: 6, fill: "#EF4444" }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">No price history data available</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PolyContestChart;
