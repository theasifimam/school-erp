import { useState, useEffect } from "react";

export function useThemeCustomization() {
  const [customCSS, setCustomCSS] = useState("");

  const applyTheme = (cssVariables) => {
    const root = document.documentElement;

    Object.entries(cssVariables).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  };

  const saveTheme = (themeConfig) => {
    localStorage.setItem("custom-theme", JSON.stringify(themeConfig));
  };

  const loadTheme = () => {
    const saved = localStorage.getItem("custom-theme");
    return saved ? JSON.parse(saved) : null;
  };

  const resetTheme = () => {
    localStorage.removeItem("custom-theme");
    // Reset to default CSS variables
    const defaultVars = {
      primary: "221.2 83.2% 53.3%",
      secondary: "210 40% 96%",
      background: "0 0% 100%",
      // ... add other defaults
    };
    applyTheme(defaultVars);
  };

  const generateTailwindConfig = (cssVars) => {
    return `
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // ... rest of your color config
      },
    },
  },
}`;
  };

  return {
    applyTheme,
    saveTheme,
    loadTheme,
    resetTheme,
    generateTailwindConfig,
  };
}
