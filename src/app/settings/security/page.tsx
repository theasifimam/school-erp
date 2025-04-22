"use client";

import { useState } from "react";
import {
  Lock,
  Shield,
  User,
  Key,
  LogOut,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Label,
  Switch,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui";

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Security Features
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [passwordExpiry, setPasswordExpiry] = useState(false);
  const [ipRestriction, setIpRestriction] = useState(false);
  const [trustedDevices, setTrustedDevices] = useState(true);

  // Recent Activity
  const recentActivity = [
    {
      id: 1,
      action: "Login from new device",
      device: "iPhone 13 (Chrome)",
      location: "New York, US",
      time: "2 mins ago",
      status: "warning",
    },
    {
      id: 2,
      action: "Password changed",
      device: "MacBook Pro (Safari)",
      location: "San Francisco, US",
      time: "1 day ago",
      status: "success",
    },
    {
      id: 3,
      action: "Failed login attempt",
      device: "Windows 10 (Firefox)",
      location: "Berlin, DE",
      time: "3 days ago",
      status: "error",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Security Settings</h1>
          <p className="text-gray-500">
            Manage your account security and access controls
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

      <Tabs defaultValue="authentication" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-full p-1 h-auto">
          <TabsTrigger
            value="authentication"
            className="py-3 rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
          >
            <Key className="w-4 h-4 mr-2" />
            Authentication
          </TabsTrigger>
          <TabsTrigger
            value="sessions"
            className="py-3 rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
          >
            <User className="w-4 h-4 mr-2" />
            Sessions
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="py-3 rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
          >
            <Shield className="w-4 h-4 mr-2" />
            Activity Log
          </TabsTrigger>
        </TabsList>

        {/* Authentication Settings */}
        <TabsContent value="authentication" className="mt-6">
          <Card className="rounded-3xl border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Password & Authentication
              </CardTitle>
              <CardDescription>
                Manage login security and password policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Change Password</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                      <button
                        className="absolute right-3 top-3 text-gray-500"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                      <button
                        className="absolute right-3 top-3 text-gray-500"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label>Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                      />
                      <button
                        className="absolute right-3 top-3 text-gray-500"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <Button className="bg-black hover:bg-gray-800 rounded-lg">
                  Update Password
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-gray-700" />
                    <div>
                      <Label>Enable 2FA via SMS/App</Label>
                      <p className="text-sm text-gray-500">
                        Require a verification code at login
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                    className="data-[state=checked]:bg-black"
                  />
                </div>
                {twoFactorAuth && (
                  <div className="p-4 rounded-lg bg-gray-50">
                    <Label>2FA Method</Label>
                    <div className="flex gap-4 mt-2">
                      <Button variant="outline" className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Smartphone className="w-4 h-4 mr-2" />
                        Authenticator App
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Password Policies</h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div>
                    <Label>Force Password Expiry</Label>
                    <p className="text-sm text-gray-500">
                      Require password change every 90 days
                    </p>
                  </div>
                  <Switch
                    checked={passwordExpiry}
                    onCheckedChange={setPasswordExpiry}
                    className="data-[state=checked]:bg-black"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Session Management */}
        <TabsContent value="sessions" className="mt-6">
          <Card className="rounded-3xl border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Session Management
              </CardTitle>
              <CardDescription>
                Control active logins and device access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div>
                    <Label>Login Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Get notified for new logins
                    </p>
                  </div>
                  <Switch
                    checked={loginAlerts}
                    onCheckedChange={setLoginAlerts}
                    className="data-[state=checked]:bg-black"
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div>
                    <Label>Auto-Logout After Inactivity</Label>
                    <p className="text-sm text-gray-500">
                      Log out after 30 minutes of inactivity
                    </p>
                  </div>
                  <Switch
                    checked={sessionTimeout}
                    onCheckedChange={setSessionTimeout}
                    className="data-[state=checked]:bg-black"
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div>
                    <Label>Trusted Devices Only</Label>
                    <p className="text-sm text-gray-500">
                      Require approval for new devices
                    </p>
                  </div>
                  <Switch
                    checked={trustedDevices}
                    onCheckedChange={setTrustedDevices}
                    className="data-[state=checked]:bg-black"
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div>
                    <Label>IP Restriction</Label>
                    <p className="text-sm text-gray-500">
                      Allow access only from whitelisted IPs
                    </p>
                  </div>
                  <Switch
                    checked={ipRestriction}
                    onCheckedChange={setIpRestriction}
                    className="data-[state=checked]:bg-black"
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                    <div>
                      <p className="font-medium">MacBook Pro (Safari)</p>
                      <p className="text-sm text-gray-500">
                        San Francisco, US · Active now
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="rounded-lg"
                    >
                      Log Out
                    </Button>
                  </div>
                  <div className="p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                    <div>
                      <p className="font-medium">iPhone 13 (Chrome)</p>
                      <p className="text-sm text-gray-500">
                        New York, US · 2 hours ago
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="rounded-lg"
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Log */}
        <TabsContent value="activity" className="mt-6">
          <Card className="rounded-3xl border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Activity Log
              </CardTitle>
              <CardDescription>Recent security-related events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <Alert
                  key={activity.id}
                  variant={
                    activity.status === "error"
                      ? "destructive"
                      : activity.status === "warning"
                      ? "warning"
                      : "default"
                  }
                  className="rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    {activity.status === "error" ? (
                      <AlertCircle className="h-5 w-5" />
                    ) : activity.status === "warning" ? (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <AlertTitle>{activity.action}</AlertTitle>
                      <AlertDescription>
                        {activity.device} · {activity.location} ·{" "}
                        {activity.time}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
