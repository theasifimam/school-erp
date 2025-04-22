"use client";

import { useState } from "react";
import {
  Bell,
  Mail,
  Smartphone,
  ShoppingCart,
  Package,
  CreditCard,
  User,
  AlertCircle,
  CheckCircle,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NotificationsSettings() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  // Order notifications
  const [newOrderEmail, setNewOrderEmail] = useState(true);
  const [newOrderPush, setNewOrderPush] = useState(true);
  const [orderStatusEmail, setOrderStatusEmail] = useState(true);
  const [orderStatusPush, setOrderStatusPush] = useState(false);
  const [abandonedCartEmail, setAbandonedCartEmail] = useState(true);

  // Product notifications
  const [lowStockEmail, setLowStockEmail] = useState(true);
  const [lowStockPush, setLowStockPush] = useState(false);
  const [outOfStockEmail, setOutOfStockEmail] = useState(true);

  // Customer notifications
  const [newCustomerEmail, setNewCustomerEmail] = useState(true);
  const [customerLoginEmail, setCustomerLoginEmail] = useState(false);
  const [customerLoginPush, setCustomerLoginPush] = useState(false);

  // System notifications
  const [systemAlertsEmail, setSystemAlertsEmail] = useState(true);
  const [systemAlertsPush, setSystemAlertsPush] = useState(true);
  const [updatesEmail, setUpdatesEmail] = useState(true);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-500">
            Manage how you receive alerts and updates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full border-gray-300">
            Discard Changes
          </Button>
          <Button className="rounded-full bg-black hover:bg-gray-800">
            Save Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="channels" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-full p-1 h-auto">
          <TabsTrigger
            value="channels"
            className="py-3 rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
          >
            <Sliders className="w-4 h-4 mr-2" />
            Channels
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="py-3 rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="py-3 rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
          >
            <Package className="w-4 h-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className="py-3 rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
          >
            <User className="w-4 h-4 mr-2" />
            Customers
          </TabsTrigger>
        </TabsList>

        {/* Notification Channels */}
        <TabsContent value="channels" className="mt-6">
          <Card className="rounded-3xl border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Enable or disable notification delivery methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 text-gray-700" />
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications via email
                    </p>
                  </div>
                </div>
                <Switch
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                  className="data-[state=checked]:bg-black"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Smartphone className="w-5 h-5 text-gray-700" />
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive in-app notifications
                    </p>
                  </div>
                </div>
                <Switch
                  checked={pushEnabled}
                  onCheckedChange={setPushEnabled}
                  className="data-[state=checked]:bg-black"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Smartphone className="w-5 h-5 text-gray-700" />
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive text message alerts
                    </p>
                  </div>
                </div>
                <Switch
                  checked={smsEnabled}
                  onCheckedChange={setSmsEnabled}
                  className="data-[state=checked]:bg-black"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order Notifications */}
        <TabsContent value="orders" className="mt-6">
          <Card className="rounded-3xl border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Order Notifications</CardTitle>
              <CardDescription>
                Configure alerts related to customer orders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-2 text-gray-700" />
                  New Orders
                </h3>
                <div className="space-y-4 pl-6">
                  <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                    <div>
                      <Label>Email Notification</Label>
                      <p className="text-sm text-gray-500">
                        When a new order is placed
                      </p>
                    </div>
                    <Switch
                      checked={newOrderEmail}
                      onCheckedChange={setNewOrderEmail}
                      className="data-[state=checked]:bg-black"
                      disabled={!emailEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                    <div>
                      <Label>Push Notification</Label>
                      <p className="text-sm text-gray-500">
                        When a new order is placed
                      </p>
                    </div>
                    <Switch
                      checked={newOrderPush}
                      onCheckedChange={setNewOrderPush}
                      className="data-[state=checked]:bg-black"
                      disabled={!pushEnabled}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <Package className="w-4 h-4 mr-2 text-gray-700" />
                  Order Status Changes
                </h3>
                <div className="space-y-4 pl-6">
                  <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                    <div>
                      <Label>Email Notification</Label>
                      <p className="text-sm text-gray-500">
                        When order status changes
                      </p>
                    </div>
                    <Switch
                      checked={orderStatusEmail}
                      onCheckedChange={setOrderStatusEmail}
                      className="data-[state=checked]:bg-black"
                      disabled={!emailEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                    <div>
                      <Label>Push Notification</Label>
                      <p className="text-sm text-gray-500">
                        When order status changes
                      </p>
                    </div>
                    <Switch
                      checked={orderStatusPush}
                      onCheckedChange={setOrderStatusPush}
                      className="data-[state=checked]:bg-black"
                      disabled={!pushEnabled}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-gray-700" />
                  Abandoned Carts
                </h3>
                <div className="pl-6">
                  <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                    <div>
                      <Label>Email Notification</Label>
                      <p className="text-sm text-gray-500">
                        When a cart is abandoned
                      </p>
                    </div>
                    <Switch
                      checked={abandonedCartEmail}
                      onCheckedChange={setAbandonedCartEmail}
                      className="data-[state=checked]:bg-black"
                      disabled={!emailEnabled}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Product Notifications */}
        <TabsContent value="products" className="mt-6">
          <Card className="rounded-3xl border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Product Notifications</CardTitle>
              <CardDescription>
                Configure alerts related to your inventory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-gray-700" />
                  Low Stock Alerts
                </h3>
                <div className="space-y-4 pl-6">
                  <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                    <div>
                      <Label>Email Notification</Label>
                      <p className="text-sm text-gray-500">
                        When inventory reaches low threshold
                      </p>
                    </div>
                    <Switch
                      checked={lowStockEmail}
                      onCheckedChange={setLowStockEmail}
                      className="data-[state=checked]:bg-black"
                      disabled={!emailEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                    <div>
                      <Label>Push Notification</Label>
                      <p className="text-sm text-gray-500">
                        When inventory reaches low threshold
                      </p>
                    </div>
                    <Switch
                      checked={lowStockPush}
                      onCheckedChange={setLowStockPush}
                      className="data-[state=checked]:bg-black"
                      disabled={!pushEnabled}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-gray-700" />
                  Out of Stock Alerts
                </h3>
                <div className="pl-6">
                  <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                    <div>
                      <Label>Email Notification</Label>
                      <p className="text-sm text-gray-500">
                        When a product sells out
                      </p>
                    </div>
                    <Switch
                      checked={outOfStockEmail}
                      onCheckedChange={setOutOfStockEmail}
                      className="data-[state=checked]:bg-black"
                      disabled={!emailEnabled}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Notifications */}
        <TabsContent value="customers" className="mt-6">
          <Card className="rounded-3xl border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Customer Notifications</CardTitle>
              <CardDescription>
                Configure alerts related to customer activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-700" />
                  New Customers
                </h3>
                <div className="pl-6">
                  <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                    <div>
                      <Label>Email Notification</Label>
                      <p className="text-sm text-gray-500">
                        When a new customer registers
                      </p>
                    </div>
                    <Switch
                      checked={newCustomerEmail}
                      onCheckedChange={setNewCustomerEmail}
                      className="data-[state=checked]:bg-black"
                      disabled={!emailEnabled}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-gray-700" />
                  Customer Logins
                </h3>
                <div className="space-y-4 pl-6">
                  <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                    <div>
                      <Label>Email Notification</Label>
                      <p className="text-sm text-gray-500">
                        When an admin logs in
                      </p>
                    </div>
                    <Switch
                      checked={customerLoginEmail}
                      onCheckedChange={setCustomerLoginEmail}
                      className="data-[state=checked]:bg-black"
                      disabled={!emailEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-full bg-gray-50">
                    <div>
                      <Label>Push Notification</Label>
                      <p className="text-sm text-gray-500">
                        When an admin logs in
                      </p>
                    </div>
                    <Switch
                      checked={customerLoginPush}
                      onCheckedChange={setCustomerLoginPush}
                      className="data-[state=checked]:bg-black"
                      disabled={!pushEnabled}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
