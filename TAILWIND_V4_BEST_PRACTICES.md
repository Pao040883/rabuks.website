# Tailwind CSS v4 - Best Practices & Zentrierung

## 🎯 Kritische Erkenntnisse für korrekte Zentrierung

### ❌ FALSCH - max-w-7xl existiert NICHT in Tailwind v4
```html
<!-- Dies funktioniert NICHT! -->
<div class="max-w-7xl mx-auto">
```

### ✅ RICHTIG - Verwende Container-Skala

Tailwind v4 verwendet eine **Container-Skala** statt numerischer Werte für max-width:

| Klasse | Breite | Pixel |
|--------|--------|-------|
| `max-w-3xs` | 16rem | 256px |
| `max-w-2xs` | 18rem | 288px |
| `max-w-xs` | 20rem | 320px |
| `max-w-sm` | 24rem | 384px |
| `max-w-md` | 28rem | 448px |
| `max-w-lg` | 32rem | 512px |
| `max-w-xl` | 36rem | 576px |
| `max-w-2xl` | 42rem | 672px |
| `max-w-3xl` | 48rem | 768px |
| `max-w-4xl` | 56rem | 896px |
| `max-w-5xl` | 64rem | 1024px |
| `max-w-6xl` | 72rem | 1152px |
| `max-w-7xl` | 80rem | 1280px |

## 📐 Korrekte Zentrierung Pattern

### Pattern 1: Constrained Width mit Centering
```html
<div class="max-w-md mx-auto">
  <!-- Content ist auf 28rem (448px) begrenzt und zentriert -->
</div>
```

### Pattern 2: Volle Breite mit Max-Width
```html
<div class="w-full max-w-7xl mx-auto px-4">
  <!-- 100% breit bis 1280px, dann zentriert mit Padding -->
</div>
```

### Pattern 3: Container Utility (empfohlen für Layouts)
```html
<!-- Container zentriert sich NICHT automatisch! -->
<div class="container mx-auto px-4">
  <!-- Container matched Breakpoint-Breiten, mx-auto zentriert -->
</div>
```

**WICHTIG:** Tailwind's `container` utility hat:
- KEINE automatische Zentrierung (immer `mx-auto` hinzufügen)
- KEIN eingebautes Padding (immer `px-*` hinzufügen)

## 🏗️ Moderne Layout-Struktur

### Header/Navigation Pattern
```html
<header class="fixed top-0 left-0 right-0 z-50 bg-white border-b">
  <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <div class="flex items-center justify-between h-16">
      <!-- Logo & Nav -->
    </div>
  </div>
</header>
```

### Hero Section Pattern
```html
<section class="relative min-h-screen flex items-center">
  <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-5xl font-bold">Headline</h1>
      <p class="text-xl mt-6">Description</p>
    </div>
  </div>
</section>
```

### Content Section Pattern
```html
<section class="py-24 bg-gray-50">
  <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <div class="max-w-3xl mx-auto mb-16 text-center">
      <!-- Section Header -->
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Cards -->
    </div>
  </div>
</section>
```

## 📱 Responsive Design (Mobile-First)

Tailwind v4 verwendet **Mobile-First** Breakpoints:

```html
<!-- Unprefixed = alle Größen (Mobile zuerst!) -->
<!-- sm: = 640px und größer -->
<!-- md: = 768px und größer -->
<!-- lg: = 1024px und größer -->
<!-- xl: = 1280px und größer -->
<!-- 2xl: = 1536px und größer -->

<div class="text-center sm:text-left md:text-lg lg:text-xl">
  <!-- Mobile: zentriert, klein -->
  <!-- Tablet: links, mittel -->
  <!-- Desktop: links, groß -->
</div>
```

## 🎨 Padding & Spacing Best Practices

### Responsive Padding
```html
<!-- Klein auf Mobile, größer auf Desktop -->
<div class="px-4 sm:px-6 lg:px-8">
```

### Consistent Spacing
```html
<!-- Einheitliches Pattern für alle Sections -->
<section class="py-16 md:py-20 lg:py-24">
```

### Gap statt Space-Between
```html
<!-- ✅ Modern: Gap verwenden -->
<div class="flex gap-4">

<!-- ❌ Alt: Space-Between (deprecated) -->
<div class="flex space-x-4">
```

## 🌓 Dark Mode

### System-basiert (Automatisch)
```css
/* tailwind.config.js wird NICHT mehr verwendet! */
/* Stattdessen in CSS: */
@import "tailwindcss";

/* Optional: Dark Mode Konfiguration */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #0f172a;
    color: #f1f5f9;
  }
}
```

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <!-- Automatisch basierend auf System-Einstellung -->
</div>
```

## 🔧 Tailwind v4 Spezifika

### Import Syntax (NICHT @tailwind!)
```css
/* ❌ v3 Syntax - NICHT verwenden */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ✅ v4 Syntax */
@import "tailwindcss";
```

### Theme Variables
```css
/* Eigene Theme-Werte definieren */
@theme {
  --color-brand-500: #134BDE;
  --font-display: "Inter", sans-serif;
  --breakpoint-3xl: 120rem;
}
```

### Arbitrary Values
```html
<!-- Für One-Off Werte -->
<div class="w-[137px]">
<div class="bg-[#134BDE]">
<div class="grid-cols-[200px_1fr_200px]">
```

## 🎯 Zentrierung Checkliste

- [ ] **max-w-*** verwenden (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl)
- [ ] **mx-auto** hinzufügen für horizontale Zentrierung
- [ ] **px-4 sm:px-6 lg:px-8** für responsive Padding
- [ ] **text-center** für Text-Zentrierung (wenn gewünscht)
- [ ] Bei `container`: IMMER `mx-auto px-*` hinzufügen!

## 🚀 Performance Tips

1. **Utility-First:** Nutze Utility-Klassen statt Custom CSS
2. **Component Extraction:** Bei Wiederholung → Angular Component erstellen
3. **JIT Mode:** Tailwind v4 generiert nur genutzten CSS
4. **Purging:** Automatisch in Produktion

## 📚 Weitere Resourcen

- [Tailwind v4 Docs](https://tailwindcss.com/docs)
- [Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
- [Container Docs](https://tailwindcss.com/docs/container)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
