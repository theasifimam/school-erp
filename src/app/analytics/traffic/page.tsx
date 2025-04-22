"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Users,
  Globe,
  Clock,
  MousePointerClick,
  Smartphone,
  Tablet,
  Monitor,
  Filter,
  Download,
  MapPin,
  TrendingUp,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Sample Data
const trafficData = [
  { date: "Jan 1", visitors: 4000, pageViews: 8200, bounceRate: 32 },
  { date: "Jan 2", visitors: 3800, pageViews: 7900, bounceRate: 34 },
  { date: "Jan 3", visitors: 4200, pageViews: 8600, bounceRate: 29 },
  { date: "Jan 4", visitors: 3900, pageViews: 8100, bounceRate: 31 },
  { date: "Jan 5", visitors: 4500, pageViews: 9200, bounceRate: 27 },
  { date: "Jan 6", visitors: 5100, pageViews: 10400, bounceRate: 25 },
  { date: "Jan 7", visitors: 4800, pageViews: 9800, bounceRate: 28 },
];

const trafficSources = [
  { name: "Direct", value: 35, color: "#4F46E5" },
  { name: "Organic Search", value: 30, color: "#10B981" },
  { name: "Social", value: 15, color: "#F59E0B" },
  { name: "Email", value: 12, color: "#EF4444" },
  { name: "Referral", value: 8, color: "#8B5CF6" },
];

const devices = [
  { name: "Mobile", value: 55, color: "#3B82F6" },
  { name: "Desktop", value: 35, color: "#10B981" },
  { name: "Tablet", value: 10, color: "#F59E0B" },
];

const topPages = [
  { page: "/home", visits: 12500, duration: "2m 45s" },
  { page: "/products", visits: 9800, duration: "3m 12s" },
  { page: "/blog", visits: 7450, duration: "4m 30s" },
  { page: "/contact", visits: 5200, duration: "1m 50s" },
  { page: "/about", visits: 4100, duration: "2m 15s" },
];

const countries = [
  { country: "United States", visitors: 12500, percent: 42 },
  { country: "United Kingdom", visitors: 6800, percent: 23 },
  { country: "Canada", visitors: 4200, percent: 14 },
  { country: "Australia", visitors: 3100, percent: 10 },
  { country: "Germany", visitors: 2400, percent: 8 },
];

const newVsReturning = [
  { name: "Jan", new: 3200, returning: 800 },
  { name: "Feb", new: 2900, returning: 900 },
  { name: "Mar", new: 3800, returning: 1200 },
  { name: "Apr", new: 4100, returning: 1500 },
  { name: "May", new: 4500, returning: 1800 },
];

const referrers = [
  { source: "google.com", visits: 8500, percent: 42 },
  { source: "facebook.com", visits: 4500, percent: 22 },
  { source: "twitter.com", visits: 2800, percent: 14 },
  { source: "linkedin.com", visits: 1800, percent: 9 },
  { source: "instagram.com", visits: 1200, percent: 6 },
];

export default function TrafficPage() {
  const [startDate, setStartDate] = useState(new Date(2023, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2023, 0, 7));
  const [timeframe, setTimeframe] = useState("weekly");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Traffic Analytics</h1>
          <p className="text-gray-500">
            Monitor your website traffic and user behavior
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
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            className="border rounded-md px-3 py-2 text-sm w-[280px]"
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
            <CardTitle className="text-sm font-medium">
              Total Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,780</div>
            <p className="text-xs text-green-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              18.5% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Globe className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52,140</div>
            <p className="text-xs text-green-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              12.2% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Session Duration
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 45s</div>
            <p className="text-xs text-green-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              5.3% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <MousePointerClick className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.5%</div>
            <p className="text-xs text-red-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              2.1% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Overview Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="visitors"
                  stroke="#4F46E5"
                  fill="#4F46E5"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Visitors"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="pageViews"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Page Views"
                />
              </AreaChart>
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

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Globe className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="font-medium">{page.page}</p>
                      <p className="text-sm text-gray-500">
                        {page.visits.toLocaleString()} visits
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{page.duration}</p>
                    <p className="text-sm text-green-500">
                      +{Math.floor(Math.random() * 15) + 5}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Devices */}
        <Card>
          <CardHeader>
            <CardTitle>Devices</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={devices}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                  label
                >
                  {devices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center">
                <Smartphone className="h-4 w-4 mr-2 text-blue-500" />
                <span>Mobile</span>
              </div>
              <div className="flex items-center">
                <Monitor className="h-4 w-4 mr-2 text-green-500" />
                <span>Desktop</span>
              </div>
              <div className="flex items-center">
                <Tablet className="h-4 w-4 mr-2 text-yellow-500" />
                <span>Tablet</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countries.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <MapPin className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="font-medium">{country.country}</p>
                      <p className="text-sm text-gray-500">
                        {country.percent}% of traffic
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {country.visitors.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-500">
                      +{Math.floor(Math.random() * 10) + 2}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New vs Returning and Referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New vs Returning Visitors */}
        <Card>
          <CardHeader>
            <CardTitle>New vs Returning Visitors</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newVsReturning}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="new" fill="#4F46E5" name="New Visitors" />
                <Bar
                  dataKey="returning"
                  fill="#10B981"
                  name="Returning Visitors"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Referrers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referrers.map((referrer, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{referrer.source}</span>
                    <span>{referrer.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${referrer.percent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{referrer.visits.toLocaleString()} visits</span>
                    <span>
                      {Math.floor(Math.random() * 15) + 5}% ↑ from last period
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Behavior Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>User Behavior</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sessions" className="w-full">
            <TabsList>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="conversions">Conversions</TabsTrigger>
            </TabsList>
            <TabsContent value="sessions" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Sessions by Time of Day</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">
                      Time distribution chart
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Session Duration</h3>
                  <div className="space-y-1">
                    {[
                      { range: "0-30 seconds", percent: 25 },
                      { range: "31-60 seconds", percent: 15 },
                      { range: "1-2 minutes", percent: 20 },
                      { range: "2-5 minutes", percent: 25 },
                      { range: "5+ minutes", percent: 15 },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-24 text-sm text-gray-500">
                          {item.range}
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${item.percent}%` }}
                          ></div>
                        </div>
                        <span className="text-sm w-8">{item.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Pages per Session</h3>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, "8+"].map((count, i) => (
                      <Badge
                        key={i}
                        variant={count === 3 ? "default" : "outline"}
                        className="flex-col items-center justify-center w-12 h-12"
                      >
                        <span className="font-bold">{count}</span>
                        <span className="text-xs">
                          {Math.floor(Math.random() * 15) + 5}%
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="engagement" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Most Engaged Pages</h3>
                  <div className="space-y-3">
                    {topPages
                      .sort(() => Math.random() - 0.5)
                      .slice(0, 4)
                      .map((page, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <span className="font-medium">{page.page}</span>
                          <span className="text-sm text-gray-500">
                            Avg. {page.duration}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-4">User Flow</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">
                      User flow visualization
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="conversions" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Conversion Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold">3.2%</div>
                      <p className="text-xs text-green-500 mt-1 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        0.4% from last period
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Goal Completions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold">1,248</div>
                      <p className="text-xs text-green-500 mt-1 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        12.5% from last period
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Revenue per Visitor
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold">$2.45</div>
                      <p className="text-xs text-green-500 mt-1 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        $0.15 from last period
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">
                    Conversion funnel visualization
                  </span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
