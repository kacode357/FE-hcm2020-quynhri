// lib/styles.ts
export const cls = {
  container: "max-w-6xl mx-auto px-4",
  header: "sticky top-0 z-50 bg-background/80 backdrop-blur border-b",
  headerInner: "h-16 flex items-center justify-between",
  logo: "text-2xl font-bold tracking-tight text-red-700 dark:text-red-300",
  nav: "hidden md:flex items-center gap-6",
  navLink:
    "text-sm font-medium text-foreground/80 hover:text-foreground transition-colors",
  right: "flex items-center gap-2",
  cta: "bg-red-700 text-white hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-400",
  ghostIcon:
    "h-9 w-9 p-0 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors",
  hero: "relative py-20 md:py-28",
  heroTitle: "text-4xl md:text-6xl font-bold tracking-tight",
  heroSub: "mt-4 text-lg md:text-xl text-foreground/80 max-w-2xl",
  heroCtas: "mt-8 flex flex-wrap gap-3",
  grid: "mt-16 grid gap-6 sm:grid-cols-2",
  cardTitle: "text-lg font-semibold",
  cardDesc: "text-sm text-foreground/80",
};
