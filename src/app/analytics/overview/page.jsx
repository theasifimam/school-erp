"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Activity,
  Calendar,
  ArrowUp,
  ArrowDown,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const data = [
  { name: "Jan", revenue: 4000, orders: 2400, visitors: 2400, returns: 200 },
  { name: "Feb", revenue: 3000, orders: 1398, visitors: 2210, returns: 150 },
  { name: "Mar", revenue: 2000, orders: 9800, visitors: 2290, returns: 300 },
  { name: "Apr", revenue: 2780, orders: 3908, visitors: 2000, returns: 180 },
  { name: "May", revenue: 1890, orders: 4800, visitors: 2181, returns: 210 },
  { name: "Jun", revenue: 2390, orders: 3800, visitors: 2500, returns: 190 },
  { name: "Jul", revenue: 3490, orders: 4300, visitors: 2100, returns: 230 },
];

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Home Goods", value: 200 },
  { name: "Beauty", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AnalyticsOverview() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track and analyze your store performance
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <div className="flex items-center gap-2">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              placeholderText="Select date range"
              className="border rounded-md px-3 py-2 text-sm h-9"
            />
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="$24,780"
          change="+12.5%"
          isPositive={true}
          icon={<DollarSign className="h-5 w-5" />}
          chartData={data.map((d) => d.revenue)}
        />
        <MetricCard
          title="Orders"
          value="1,246"
          change="+8.1%"
          isPositive={true}
          icon={<ShoppingCart className="h-5 w-5" />}
          chartData={data.map((d) => d.orders)}
        />
        <MetricCard
          title="Customers"
          value="892"
          change="-2.3%"
          isPositive={false}
          icon={<Users className="h-5 w-5" />}
          chartData={data.map((d) => d.visitors)}
        />
        <MetricCard
          title="Return Rate"
          value="5.2%"
          change="+1.1%"
          isPositive={false}
          icon={<Activity className="h-5 w-5" />}
          chartData={data.map((d) => (d.returns / d.orders) * 100)}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Revenue & Orders</CardTitle>
            <CardDescription>Last 7 months performance</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Revenue ($)"
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product category distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`$${value}`, "Sales"]}
                  contentStyle={{
                    background: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Visitor Analytics</CardTitle>
                <CardDescription>Monthly visitors vs returns</CardDescription>
              </div>
              <Tabs defaultValue="visitors" className="w-[200px]">
                <TabsList>
                  <TabsTrigger value="visitors">Visitors</TabsTrigger>
                  <TabsTrigger value="returns">Returns</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="visitors"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                  name="Visitors"
                />
                <Bar
                  dataKey="returns"
                  fill="#FF8042"
                  radius={[4, 4, 0, 0]}
                  name="Returns"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Top Products */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest store events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  action: "New order #12345",
                  amount: "$125.00",
                  time: "2 minutes ago",
                  positive: true,
                },
                {
                  id: 2,
                  action: "Refund processed #12344",
                  amount: "$45.99",
                  time: "1 hour ago",
                  positive: false,
                },
                {
                  id: 3,
                  action: "New customer registration",
                  amount: "",
                  time: "3 hours ago",
                  positive: true,
                },
                {
                  id: 4,
                  action: "Inventory low: Product XYZ",
                  amount: "",
                  time: "5 hours ago",
                  positive: false,
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between pb-3 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        item.positive
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.positive ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{item.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                  </div>
                  {item.amount && (
                    <p
                      className={`font-medium ${
                        item.positive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.amount}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling items this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  name: "Premium Headphones",
                  sales: 245,
                  revenue: "$12,250",
                },
                {
                  id: 2,
                  name: "Wireless Earbuds",
                  sales: 189,
                  revenue: "$8,505",
                },
                {
                  id: 3,
                  name: "Smart Watch",
                  sales: 156,
                  revenue: "$10,920",
                },
                {
                  id: 4,
                  name: "Bluetooth Speaker",
                  sales: 132,
                  revenue: "$5,280",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between pb-3 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      {item.id}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.sales} sold
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">{item.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, isPositive, icon, chartData }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-5 w-5 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-2">
          <p
            className={`text-xs flex items-center ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {change}
          </p>
          {chartData && (
            <div className="h-10 w-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.map((value, index) => ({ value }))}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={isPositive ? "#82ca9d" : "#FF8042"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
