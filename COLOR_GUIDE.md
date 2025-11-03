# 🎨 Background Color Customization Guide

## Quick Reference: Where to Change Colors

### 1️⃣ **Main App Background**
**File:** `src/App.jsx` (Line ~96)

```jsx
// Current (dark blue-gray)
<div className="min-h-screen bg-background">

// Options:
<div className="min-h-screen bg-black">           // Pure black
<div className="min-h-screen bg-slate-900">       // Dark gray
<div className="min-h-screen bg-gray-900">        // Darker gray
<div className="min-h-screen bg-zinc-900">        // Zinc dark
<div className="min-h-screen bg-neutral-900">     // Neutral dark
<div className="min-h-screen bg-purple-900">      // Dark purple
<div className="min-h-screen bg-indigo-950">      // Very dark indigo

// Gradients:
<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
<div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
<div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900">
```

---

### 2️⃣ **Custom Background Colors (Recommended)**
**File:** `tailwind.config.js` (Lines 20-24)

```javascript
background: {
  DEFAULT: "#0f172a",    // Main background - CHANGE THIS
  light: "#1e293b",      // Cards, panels - CHANGE THIS  
  lighter: "#334155",    // Borders, hover states - CHANGE THIS
},
```

**Popular Color Schemes:**

#### 🌑 **Pure Black Theme**
```javascript
background: {
  DEFAULT: "#000000",
  light: "#1a1a1a",
  lighter: "#2d2d2d",
},
```

#### 💜 **Purple Dark Theme**
```javascript
background: {
  DEFAULT: "#1a0b2e",   // Deep purple
  light: "#2d1b4e",
  lighter: "#3f2f6b",
},
```

#### 🌊 **Navy Blue Theme**
```javascript
background: {
  DEFAULT: "#0a1929",   // Deep navy
  light: "#1e2a3a",
  lighter: "#2d3e50",
},
```

#### 🌲 **Forest Green Theme**
```javascript
background: {
  DEFAULT: "#0a1f1f",   // Dark teal
  light: "#1a3333",
  lighter: "#2d4747",
},
```

#### 🔥 **Dark Red Theme**
```javascript
background: {
  DEFAULT: "#1a0a0a",   // Very dark red
  light: "#2d1a1a",
  lighter: "#3d2929",
},
```

---

### 3️⃣ **Scrollbar Colors**
**File:** `src/index.css` (Lines 33-45)

```css
/* Track (background behind scrollbar) */
::-webkit-scrollbar-track {
  background: #0f172a;  /* ← Change this */
}

/* Thumb (the draggable part) */
::-webkit-scrollbar-thumb {
  background: #334155;  /* ← Change this */
  border-radius: 5px;
}

/* Thumb on hover */
::-webkit-scrollbar-thumb:hover {
  background: #475569;  /* ← Change this */
}
```

**Match scrollbar to your theme:**
- Black theme: `#000000`, `#2d2d2d`, `#3d3d3d`
- Purple theme: `#1a0b2e`, `#3f2f6b`, `#5a3f8b`
- Navy theme: `#0a1929`, `#2d3e50`, `#3d5060`

---

### 4️⃣ **Component-Specific Backgrounds**

#### Header Background
**File:** `src/components/Header.jsx` (Line ~7)
```jsx
<header className="bg-background-light border-b border-background-lighter">
```

#### Card Backgrounds
**File:** `src/components/CandidateCard.jsx` (Line ~14)
```jsx
<div className="bg-background-light rounded-xl p-6">
```

#### Results Chart Background
**File:** `src/components/ResultsBar.jsx` (Line ~9)
```jsx
<div className="bg-background-light border border-background-lighter">
```

---

## 🎯 Quick Color Change Process

### Option A: Use Tailwind's Built-in Colors (Fastest)

1. Open `src/App.jsx`
2. Find line ~96: `<div className="min-h-screen bg-background">`
3. Replace with any Tailwind color:
   - `bg-black`
   - `bg-slate-950`
   - `bg-gray-900`
   - `bg-zinc-900`
   - `bg-purple-900`

### Option B: Custom Colors (Best for Branding)

1. Open `tailwind.config.js`
2. Find the `background:` section (lines 20-24)
3. Change the hex codes:
```javascript
background: {
  DEFAULT: "#YOUR_MAIN_COLOR",
  light: "#YOUR_SECONDARY_COLOR",
  lighter: "#YOUR_TERTIARY_COLOR",
},
```
4. Save and refresh browser

---

## 🌈 Color Picker Tools

Generate custom color palettes:
- **Coolors**: https://coolors.co/
- **Adobe Color**: https://color.adobe.com/
- **Tailwind Shades**: https://tailwindshades.com/
- **Palettte**: https://palettte.app/

---

## 💡 Pro Tips

1. **Keep 3 shades**: Main, lighter, and lightest for depth
2. **Maintain contrast**: Ensure text is readable on backgrounds
3. **Test both modes**: If using light/dark toggle, test both
4. **Match scrollbar**: Update scrollbar colors to match theme
5. **Consistent borders**: Use `lighter` shade for borders

---

## 🔄 After Changing Colors

1. Save all files
2. Restart dev server: `npm run dev`
3. Hard refresh browser: `Ctrl+Shift+R` or `Cmd+Shift+R`
4. Check all pages/components

---

## 📋 Common Color Values (Hex Codes)

### Dark Backgrounds
```
Pure Black:      #000000
Near Black:      #0a0a0a
Charcoal:        #1a1a1a
Dark Gray:       #2d2d2d
Slate:           #0f172a
Navy:            #0a1929
Purple:          #1a0b2e
Teal:            #0a1f1f
```

### Accent Colors (for buttons, highlights)
```
Blue:            #3b82f6
Indigo:          #6366f1
Purple:          #a855f7
Pink:            #ec4899
Green:           #10b981
Teal:            #14b8a6
Orange:          #f97316
Red:             #ef4444
```

---

**Need help?** The colors are primarily controlled in:
1. `tailwind.config.js` - Define custom colors
2. `src/App.jsx` - Main app background
3. `src/index.css` - Scrollbar colors
