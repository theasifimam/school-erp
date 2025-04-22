"use client";

import { useState } from "react";
import {
  Settings,
  ShoppingCart,
  Store,
  Mail,
  Truck,
  CreditCard,
  Globe,
  FileText,
  Users,
  Shield,
  Database,
  Bell,
  Palette,
  Package,
  Box,
  Tag,
  Percent,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GeneralSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [storeName, setStoreName] = useState("ShopSphere");
  const [storeEmail, setStoreEmail] = useState("contact@shopsphere.com");
  const [storeCurrency, setStoreCurrency] = useState("USD");
  const [storeTimezone, setStoreTimezone] = useState("UTC");
  const [storeLanguage, setStoreLanguage] = useState("en");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [enableReviews, setEnableReviews] = useState(true);
  const [enableWishlist, setEnableWishlist] = useState(true);
  const [enableCoupons, setEnableCoupons] = useState(true);
  const [inventoryTracking, setInventoryTracking] = useState(true);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [orderConfirmationEmail, setOrderConfirmationEmail] = useState(true);
  const [shippingConfirmationEmail, setShippingConfirmationEmail] =
    useState(true);
  const [deliveryConfirmationEmail, setDeliveryConfirmationEmail] =
    useState(true);
  const [enableTaxes, setEnableTaxes] = useState(true);
  const [taxRate, setTaxRate] = useState(7.5);
  const [enableGDPR, setEnableGDPR] = useState(true);
  const [cookieConsent, setCookieConsent] = useState(true);
  const [enableAnalytics, setEnableAnalytics] = useState(true);

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CAD", name: "Canadian Dollar" },
  ];

  const timezones = [
    "UTC",
    "EST (UTC-5)",
    "PST (UTC-8)",
    "GMT (UTC+0)",
    "CET (UTC+1)",
    "IST (UTC+5:30)",
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">General Settings</h1>
          <p className="text-gray-500">
            Configure your store's global settings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full">
            Discard Changes
          </Button>
          <Button className="rounded-full">Save Settings</Button>
        </div>
      </div>

      <Tabs defaultValue="store" className="w-full">
        <TabsList className="grid w-full grid-cols-5 h-auto rounded-full">
          <TabsTrigger value="store" className="py-3 rounded-full">
            <Store className="w-4 h-4 mr-2" />
            Store
          </TabsTrigger>
          <TabsTrigger value="products" className="py-3 rounded-full">
            <Package className="w-4 h-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="orders" className="py-3 rounded-full">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="shipping" className="py-3 rounded-full">
            <Truck className="w-4 h-4 mr-2" />
            Shipping
          </TabsTrigger>
          <TabsTrigger value="advanced" className="py-3 rounded-full">
            <Settings className="w-4 h-4 mr-2" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* Store Settings */}
        <TabsContent value="store">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  Store Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Store Name</Label>
                  <Input
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="Your store name"
                  />
                </div>
                <div>
                  <Label>Store Email</Label>
                  <Input
                    type="email"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                    placeholder="contact@yourstore.com"
                  />
                </div>
                <div>
                  <Label>Store Currency</Label>
                  <Select
                    value={storeCurrency}
                    onValueChange={setStoreCurrency}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.name} ({currency.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Store Language</Label>
                  <Select
                    value={storeLanguage}
                    onValueChange={setStoreLanguage}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.code} value={language.code}>
                          {language.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Timezone</Label>
                  <Select
                    value={storeTimezone}
                    onValueChange={setStoreTimezone}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((zone) => (
                        <SelectItem key={zone} value={zone}>
                          {zone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-gray-500">
                      Toggle between light and dark theme
                    </p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">
                      Temporarily take your store offline
                    </p>
                  </div>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
                {maintenanceMode && (
                  <div>
                    <Label>Maintenance Message</Label>
                    <Input placeholder="We'll be back soon!" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Product Settings */}
        <TabsContent value="products">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Product Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Product Reviews</Label>
                    <p className="text-sm text-gray-500">
                      Allow customers to review products
                    </p>
                  </div>
                  <Switch
                    checked={enableReviews}
                    onCheckedChange={setEnableReviews}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Wishlist</Label>
                    <p className="text-sm text-gray-500">
                      Allow customers to save favorite products
                    </p>
                  </div>
                  <Switch
                    checked={enableWishlist}
                    onCheckedChange={setEnableWishlist}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Coupons</Label>
                    <p className="text-sm text-gray-500">
                      Allow discount codes to be applied
                    </p>
                  </div>
                  <Switch
                    checked={enableCoupons}
                    onCheckedChange={setEnableCoupons}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Box className="w-5 h-5" />
                  Inventory Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Track Inventory</Label>
                    <p className="text-sm text-gray-500">
                      Enable stock level tracking
                    </p>
                  </div>
                  <Switch
                    checked={inventoryTracking}
                    onCheckedChange={setInventoryTracking}
                  />
                </div>
                {inventoryTracking && (
                  <div>
                    <Label>Low Stock Threshold</Label>
                    <Input
                      type="number"
                      value={lowStockThreshold}
                      onChange={(e) =>
                        setLowStockThreshold(Number(e.target.value))
                      }
                    />
                    <p className="text-sm text-gray-500">
                      Get notified when stock reaches this level
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Order Settings */}
        <TabsContent value="orders">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Order Processing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Shipping Address</Label>
                    <p className="text-sm text-gray-500">
                      Customers must provide shipping details
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Billing Address</Label>
                    <p className="text-sm text-gray-500">
                      Customers must provide billing details
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Tax Calculation</Label>
                    <p className="text-sm text-gray-500">
                      Automatically calculate taxes
                    </p>
                  </div>
                  <Switch
                    checked={enableTaxes}
                    onCheckedChange={setEnableTaxes}
                  />
                </div>
                {enableTaxes && (
                  <div>
                    <Label>Default Tax Rate (%)</Label>
                    <Input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      step="0.1"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Order Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Order Confirmation</Label>
                    <p className="text-sm text-gray-500">
                      Send email when order is placed
                    </p>
                  </div>
                  <Switch
                    checked={orderConfirmationEmail}
                    onCheckedChange={setOrderConfirmationEmail}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Shipping Confirmation</Label>
                    <p className="text-sm text-gray-500">
                      Send email when order is shipped
                    </p>
                  </div>
                  <Switch
                    checked={shippingConfirmationEmail}
                    onCheckedChange={setShippingConfirmationEmail}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Delivery Confirmation</Label>
                    <p className="text-sm text-gray-500">
                      Send email when order is delivered
                    </p>
                  </div>
                  <Switch
                    checked={deliveryConfirmationEmail}
                    onCheckedChange={setDeliveryConfirmationEmail}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Free Shipping</Label>
                    <p className="text-sm text-gray-500">
                      Offer free shipping on all orders
                    </p>
                  </div>
                  <Switch checked={false} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Flat Rate Shipping</Label>
                    <p className="text-sm text-gray-500">
                      Charge a fixed rate for shipping
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div>
                  <Label>Default Shipping Rate</Label>
                  <Input type="number" defaultValue="5.99" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Real-time Carrier Rates</Label>
                    <p className="text-sm text-gray-500">
                      Calculate shipping with carriers
                    </p>
                  </div>
                  <Switch checked={false} />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Shipping Zones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Domestic</h4>
                    <p className="text-sm text-gray-500">
                      United States - $5.99 flat rate
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">International</h4>
                    <p className="text-sm text-gray-500">
                      All other countries - $15.99 flat rate
                    </p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Shipping Zone
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>GDPR Compliance</Label>
                    <p className="text-sm text-gray-500">
                      Enable EU data protection features
                    </p>
                  </div>
                  <Switch
                    checked={enableGDPR}
                    onCheckedChange={setEnableGDPR}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cookie Consent</Label>
                    <p className="text-sm text-gray-500">
                      Show cookie consent banner
                    </p>
                  </div>
                  <Switch
                    checked={cookieConsent}
                    onCheckedChange={setCookieConsent}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Google Analytics</Label>
                    <p className="text-sm text-gray-500">
                      Track visitor behavior
                    </p>
                  </div>
                  <Switch
                    checked={enableAnalytics}
                    onCheckedChange={setEnableAnalytics}
                  />
                </div>
                {enableAnalytics && (
                  <div>
                    <Label>Google Analytics ID</Label>
                    <Input placeholder="UA-XXXXX-Y" />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Export Store Data</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Download all store data as CSV
                  </p>
                  <Button variant="outline">Export Data</Button>
                </div>
                <Separator />
                <div>
                  <Label>Import Store Data</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Upload products, customers, orders
                  </p>
                  <Button variant="outline">Import Data</Button>
                </div>
                <Separator />
                <div>
                  <Label>Reset Store</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Clear all data (irreversible)
                  </p>
                  <Button variant="destructive">Reset Store</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
