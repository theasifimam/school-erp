"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  Filter,
  Download,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/common/DateRangePicker";

// Sample Data
const salesData = [
  { name: "Jan", revenue: 4000, orders: 240, customers: 180 },
  { name: "Feb", revenue: 3000, orders: 190, customers: 120 },
  { name: "Mar", revenue: 5000, orders: 380, customers: 240 },
  { name: "Apr", revenue: 4000, orders: 290, customers: 160 },
  { name: "May", revenue: 6000, orders: 480, customers: 320 },
  { name: "Jun", revenue: 7000, orders: 520, customers: 380 },
  { name: "Jul", revenue: 8000, orders: 600, customers: 450 },
];

const topProducts = [
  { name: "Wireless Earbuds", sales: 1200, revenue: 8400 },
  { name: "Smart Watch", sales: 980, revenue: 6860 },
  { name: "Bluetooth Speaker", sales: 750, revenue: 5250 },
  { name: "Phone Case", sales: 620, revenue: 2480 },
  { name: "USB-C Cable", sales: 580, revenue: 1160 },
];

const trafficSources = [
  { name: "Direct", value: 35, color: "#4F46E5" },
  { name: "Social", value: 25, color: "#10B981" },
  { name: "Email", value: 20, color: "#F59E0B" },
  { name: "Referral", value: 15, color: "#EF4444" },
  { name: "Organic", value: 5, color: "#8B5CF6" },
];

export default function AnalyticsPage() {
  const [startDate, setStartDate] = useState(new Date(2023, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2023, 6, 30));
  const [timeframe, setTimeframe] = useState("monthly");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sales Analytics</h1>
          <p className="text-gray-500">
            Track your store's performance and key metrics
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <DateRangePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            className="border rounded-full px-3 py-2 text-sm w-[280px]"
            dateFormat="MMM d, yyyy"
          />
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,780</div>
            <p className="text-xs text-green-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              12.5% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-green-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              8.2% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-green-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              5.3% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Order Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89.42</div>
            <p className="text-xs text-red-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              2.1% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue & Orders Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Orders</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Revenue ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#10B981"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                  label
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Package className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {product.sales} units sold
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.revenue}</p>
                    <p className="text-sm text-green-500">
                      +{Math.floor(Math.random() * 20) + 5}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  action: "New order #ORD-2023-00145",
                  amount: "$150",
                  time: "2 min ago",
                },
                {
                  id: 2,
                  action: "Payment received",
                  amount: "$350",
                  time: "15 min ago",
                },
                {
                  id: 3,
                  action: "New customer registered",
                  amount: "",
                  time: "1 hour ago",
                },
                {
                  id: 4,
                  action: "Order #ORD-2023-00112 shipped",
                  amount: "$75",
                  time: "3 hours ago",
                },
                {
                  id: 5,
                  action: "Refund processed",
                  amount: "$45",
                  time: "1 day ago",
                },
              ].map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-gray-100">
                    <ShoppingCart className="h-5 w-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <div className="font-medium">{activity.amount}</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
