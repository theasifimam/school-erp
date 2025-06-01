"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Check, Palette, Sun, Moon } from "lucide-react";

// Helper function to convert HSL string to hex color
const hslToHex = (hslString) => {
  const [h, s, l] = hslString.split(" ").map((val, index) => {
    if (index === 0) return parseInt(val);
    return parseInt(val.replace("%", ""));
  });

  const hDecimal = h / 360;
  const sDecimal = s / 100;
  const lDecimal = l / 100;

  const c = (1 - Math.abs(2 * lDecimal - 1)) * sDecimal;
  const x = c * (1 - Math.abs(((hDecimal * 6) % 2) - 1));
  const m = lDecimal - c / 2;

  let r, g, b;

  if (hDecimal < 1 / 6) {
    r = c;
    g = x;
    b = 0;
  } else if (hDecimal < 2 / 6) {
    r = x;
    g = c;
    b = 0;
  } else if (hDecimal < 3 / 6) {
    r = 0;
    g = c;
    b = x;
  } else if (hDecimal < 4 / 6) {
    r = 0;
    g = x;
    b = c;
  } else if (hDecimal < 5 / 6) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

// Helper function to convert hex to HSL
const hexToHsl = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l;

  l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
};

export default function ShadcnThemeCustomizer() {
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);

  // Simplified theme state
  const [theme, setTheme] = useState({
    light: {
      primary: "221.2 83.2% 53.3%",
      secondary: "210 40% 96.1%",
      accent: "210 40% 96.1%",
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      muted: "210 40% 96.1%",
      border: "214.3 31.8% 91.4%",
      destructive: "0 84.2% 60.2%",
    },
    dark: {
      primary: "217.2 91.2% 59.8%",
      secondary: "217.2 32.6% 17.5%",
      accent: "217.2 32.6% 17.5%",
      background: "222.2 84% 4.9%",
      foreground: "210 40% 98%",
      muted: "217.2 32.6% 17.5%",
      border: "217.2 32.6% 17.5%",
      destructive: "0 62.8% 30.6%",
    },
  });

  // Apply theme to CSS variables
  // useEffect(() => {
  //   const root = document.documentElement;
  //   const currentTheme = isDark ? theme.dark : theme.light;

  //   Object.entries(currentTheme).forEach(([key, value]) => {
  //     root.style.setProperty(`--${key}`, value);
  //   });

  //   // Handle dark mode class
  //   if (isDark) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [theme, isDark]);

  const updateColor = (colorKey, hslValue) => {
    const mode = isDark ? "dark" : "light";
    setTheme((prev) => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [colorKey]: hslValue,
      },
    }));
  };

  const generateCSS = () => {
    const lightVars = Object.entries(theme.light)
      .map(([key, value]) => `    --${key}: ${value};`)
      .join("\n");

    const darkVars = Object.entries(theme.dark)
      .map(([key, value]) => `    --${key}: ${value};`)
      .join("\n");

    return `@layer base {
  :root {
${lightVars}
  }
  
  .dark {
${darkVars}
  }
}`;
  };

  const copyCSS = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const ColorPicker = ({ label, colorKey, value }) => {
    const hexValue = hslToHex(value);

    const handleColorChange = (e) => {
      const hex = e.target.value;
      const hsl = hexToHsl(hex);
      updateColor(colorKey, hsl);
    };

    const handleInputChange = (e) => {
      updateColor(colorKey, e.target.value);
    };

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={hexValue}
            onChange={handleColorChange}
            className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer"
          />
          <Input
            value={value}
            onChange={handleInputChange}
            placeholder="221.2 83.2% 53.3%"
            className="font-mono text-sm flex-1"
          />
        </div>
      </div>
    );
  };

  const presets = [
    {
      name: "Default Blue",
      colors: {
        light: {
          primary: "221.2 83.2% 53.3%",
          secondary: "210 40% 96.1%",
          accent: "210 40% 96.1%",
        },
        dark: {
          primary: "217.2 91.2% 59.8%",
          secondary: "217.2 32.6% 17.5%",
          accent: "217.2 32.6% 17.5%",
        },
      },
    },
    {
      name: "Green",
      colors: {
        light: {
          primary: "142.1 76.2% 36.3%",
          secondary: "138.5 76.2% 96.7%",
          accent: "138.5 76.2% 96.7%",
        },
        dark: {
          primary: "142.1 70.6% 45.3%",
          secondary: "142.1 13% 26.3%",
          accent: "142.1 13% 26.3%",
        },
      },
    },
    {
      name: "Purple",
      colors: {
        light: {
          primary: "262.1 83.3% 57.8%",
          secondary: "270 95.2% 95.1%",
          accent: "270 95.2% 95.1%",
        },
        dark: {
          primary: "263.4 70% 50.4%",
          secondary: "270 3.7% 15.9%",
          accent: "270 3.7% 15.9%",
        },
      },
    },
    {
      name: "Orange",
      colors: {
        light: {
          primary: "24.6 95% 53.1%",
          secondary: "60 4.8% 95.9%",
          accent: "60 4.8% 95.9%",
        },
        dark: {
          primary: "20.5 90.2% 48.2%",
          secondary: "12 6.5% 15.1%",
          accent: "12 6.5% 15.1%",
        },
      },
    },
  ];

  const applyPreset = (preset) => {
    setTheme((prev) => ({
      light: { ...prev.light, ...preset.colors.light },
      dark: { ...prev.dark, ...preset.colors.dark },
    }));
  };

  const currentMode = isDark ? "dark" : "light";

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: `hsl(${theme[currentMode].primary})` }}
            >
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold">Shadcn Theme Customizer</h1>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <Switch checked={isDark} onCheckedChange={setIsDark} />
              <Moon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium ml-2">
                {isDark ? "Dark" : "Light"} Mode
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customization Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Theme Colors</CardTitle>
                <CardDescription>
                  Customize your {isDark ? "dark" : "light"} theme colors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="presets">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="presets">Presets</TabsTrigger>
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="export">Export</TabsTrigger>
                  </TabsList>

                  <TabsContent value="presets" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {presets.map((preset, index) => (
                        <Card
                          key={index}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => applyPreset(preset)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{preset.name}</span>
                              <div className="flex gap-1">
                                <div
                                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                  style={{
                                    backgroundColor: `hsl(${preset.colors[currentMode].primary})`,
                                  }}
                                />
                                <div
                                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                  style={{
                                    backgroundColor: `hsl(${preset.colors[currentMode].secondary})`,
                                  }}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="colors" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ColorPicker
                        label="Primary"
                        colorKey="primary"
                        value={theme[currentMode].primary}
                      />
                      <ColorPicker
                        label="Secondary"
                        colorKey="secondary"
                        value={theme[currentMode].secondary}
                      />
                      <ColorPicker
                        label="Accent"
                        colorKey="accent"
                        value={theme[currentMode].accent}
                      />
                      <ColorPicker
                        label="Destructive"
                        colorKey="destructive"
                        value={theme[currentMode].destructive}
                      />
                      <ColorPicker
                        label="Background"
                        colorKey="background"
                        value={theme[currentMode].background}
                      />
                      <ColorPicker
                        label="Foreground"
                        colorKey="foreground"
                        value={theme[currentMode].foreground}
                      />
                      <ColorPicker
                        label="Muted"
                        colorKey="muted"
                        value={theme[currentMode].muted}
                      />
                      <ColorPicker
                        label="Border"
                        colorKey="border"
                        value={theme[currentMode].border}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="export" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-lg font-semibold">
                          CSS Variables
                        </Label>
                        <Button onClick={copyCSS}>
                          {copied ? (
                            <Check className="w-4 h-4 mr-2 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 mr-2" />
                          )}
                          {copied ? "Copied!" : "Copy CSS"}
                        </Button>
                      </div>

                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-80">
                        <code>{generateCSS()}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Live preview of your theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Buttons */}
                <div className="space-y-2">
                  <Label className="font-medium">Buttons</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm">Primary</Button>
                    <Button variant="secondary" size="sm">
                      Secondary
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Outline
                    </Button>
                    <Button variant="destructive" size="sm">
                      Destructive
                    </Button>
                  </div>
                </div>

                {/* Badges */}
                <div className="space-y-2">
                  <Label className="font-medium">Badges</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

                {/* Card */}
                <div className="space-y-2">
                  <Label className="font-medium">Card</Label>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Sample Card</CardTitle>
                      <CardDescription>
                        Card with your theme applied
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p className="text-muted-foreground">
                        This shows how your theme looks on cards.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Form Elements */}
                <div className="space-y-2">
                  <Label className="font-medium">Input</Label>
                  <Input placeholder="Sample input" />
                </div>

                {/* Alert */}
                <div className="space-y-2">
                  <Label className="font-medium">Alert</Label>
                  <Alert>
                    <AlertDescription>
                      This is how alerts look with your theme.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
