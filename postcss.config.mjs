const config = {
  plugins: {
    "@tailwindcss/postcss": {
      tailwindConfig: {
        darkMode: "class",
        content: [
          "./app/**/*.{js,ts,jsx,tsx}",
          "./components/**/*.{js,ts,jsx,tsx}",
          "./node_modules/sonner/**/*.{js,ts,jsx,tsx}", // Add Sonner's files
        ],
        theme: {
          extend: {
            colors: {
              background: "hsl(var(--background))",
              foreground: "hsl(var(--foreground))",
              border: "hsl(var(--border))",
              muted: "hsl(var(--muted-foreground))",
            },
          },
        },
        safelist: [
          "!rounded-full",
          "bg-background",
          "text-foreground",
          "border-border",
          "dark:bg-background",
          "dark:text-foreground",
          "dark:border-border",
        ],
      },
    },
  },
};

export default config;
