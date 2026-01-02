# KvoLib

> A modern, lightweight UI component library with beautiful aesthetics and smooth animations.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Components](https://img.shields.io/badge/Components-70+-green.svg)]()
[![Made with Love](https://img.shields.io/badge/Made%20with-%E2%99%A5-red.svg)]()

## ✨ Features

- 🎨 **Modern Design** - Beautiful, state-of-the-art UI components
- 🚀 **Lightweight** - Small bundle size, fast performance
- 📱 **Responsive** - Mobile-first, works on all devices
- 🎭 **Animations** - Smooth transitions and micro-interactions
- 🔧 **Easy to Use** - Simple copy-paste integration
- 🌈 **Rich Variety** - 70+ component variants across 12 categories
- 🎯 **Zero Dependencies** - Pure HTML, CSS, and JavaScript

## 📦 Installation

### CDN

```html
<!-- Buttons -->
<link rel="stylesheet" href="https://cdn.kvolib.dev/css/buttons.css" />

<!-- Forms -->
<link rel="stylesheet" href="https://cdn.kvolib.dev/css/forms.css" />

<!-- Input Components -->
<link rel="stylesheet" href="https://cdn.kvolib.dev/css/checkbox.css" />
<link rel="stylesheet" href="https://cdn.kvolib.dev/css/radio.css" />
<link rel="stylesheet" href="https://cdn.kvolib.dev/css/switch.css" />
<link rel="stylesheet" href="https://cdn.kvolib.dev/css/select.css" />

<!-- Layout Components -->
<link rel="stylesheet" href="https://cdn.kvolib.dev/css/grid.css" />
<link rel="stylesheet" href="https://cdn.kvolib.dev/css/container.css" />
<link rel="stylesheet" href="https://cdn.kvolib.dev/css/card.css" />
<link rel="stylesheet" href="https://cdn.kvolib.dev/css/divider.css" />
<link rel="stylesheet" href="https://cdn.kvolib.dev/css/spacer.css" />
<link rel="stylesheet" href="https://cdn.kvolib.dev/css/stack.css" />
```

### Download

```bash
git clone https://github.com/Kvoryz/KvoLib.git
```

## 🎯 Quick Start

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>

    <!-- Include KvoLib CSS -->
    <link rel="stylesheet" href="path/to/buttons.css" />
    <link rel="stylesheet" href="path/to/forms.css" />
  </head>
  <body>
    <!-- Use KvoLib components -->
    <button class="btn-glow">Click Me</button>

    <div class="input-floating-group">
      <input type="text" class="input-floating" placeholder=" " />
      <label>Your Name</label>
    </div>
  </body>
</html>
```

## 📚 Components

### Input Components (6 categories)

| Component    | Variants   | Description                          |
| ------------ | ---------- | ------------------------------------ |
| **Buttons**  | 20+ styles | Unique button styles with animations |
| **Forms**    | Multiple   | Various input field styles           |
| **Checkbox** | 8 styles   | Custom checkbox with animations      |
| **Radio**    | 5 styles   | Radio button variants                |
| **Switch**   | 6 styles   | Toggle switch components             |
| **Select**   | 5 styles   | Dropdown select styles               |

### Layout Components (6 categories)

| Component     | Variants     | Description             |
| ------------- | ------------ | ----------------------- |
| **Grid**      | 5 layouts    | Responsive grid systems |
| **Container** | 4 variants   | Max-width containers    |
| **Card**      | 6 styles     | Content card components |
| **Divider**   | 6 styles     | Section dividers        |
| **Spacer**    | 12 utilities | Spacing helpers         |
| **Stack**     | 5 layouts    | Flex stacking layouts   |

**Total:** 70+ component variants across 12 categories

## 🎨 Component Examples

### Button Examples

```html
<!-- Glow Button -->
<button class="btn-glow">Glow Effect</button>

<!-- 3D Cube Button -->
<button class="cube cube-hover">3D Cube</button>

<!-- Neon Button -->
<button class="btn-neon">Neon Glow</button>
```

### Grid Layout

```html
<div class="grid-three-col">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Card Component

```html
<div class="card-glass">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content here</p>
  </div>
</div>
```

## 📖 Documentation

Visit our [documentation](https://kvolib.dev/docs.html) for:

- Detailed component guides
- Code examples
- Installation instructions
- Usage patterns

Browse all components at [kvolib.dev/components](https://kvolib.dev/components.html)

## 🌟 Features Highlight

- **Modern Aesthetics** - Glassmorphism, gradients, neon effects
- **Smooth Animations** - Hover effects, transitions, micro-interactions
- **Responsive Design** - Mobile-first approach
- **Dark Mode Ready** - Built with dark backgrounds in mind
- **Copy-Paste Ready** - No complex setup required
- **Browser Compatible** - Works on all modern browsers

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, flexbox, grid
- **JavaScript** - Vanilla JS for interactions
- **Font Awesome** - Icon library

## 📂 Project Structure

```
KvoLib/
├── assets/
│   ├── css/
│   │   ├── styles.css       # Main styles
│   │   ├── buttons.css      # Button components
│   │   ├── forms.css        # Form components
│   │   ├── checkbox.css     # Checkbox styles
│   │   ├── radio.css        # Radio styles
│   │   ├── switch.css       # Switch styles
│   │   ├── select.css       # Select styles
│   │   ├── grid.css         # Grid layouts
│   │   ├── container.css    # Container styles
│   │   ├── card.css         # Card components
│   │   ├── divider.css      # Divider styles
│   │   ├── spacer.css       # Spacing utilities
│   │   └── stack.css        # Stack layouts
│   ├── js/
│   │   └── main.js          # Main JavaScript
│   └── img/
│       └── icon.png         # Logo/icon
├── components/
│   ├── buttons.html
│   ├── forms.html
│   ├── checkbox.html
│   ├── radio.html
│   ├── switch.html
│   ├── select.html
│   ├── grid.html
│   ├── container.html
│   ├── card.html
│   ├── divider.html
│   ├── spacer.html
│   └── stack.html
├── index.html               # Homepage
├── components.html          # Component library
├── docs.html                # Documentation
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Acknowledgments

- Inspired by modern design trends
- Built with passion for beautiful UI
- Some button designs inspired by [Uiverse.io](https://uiverse.io)

## 🔗 Links

- **Website:** [kvolib.dev](https://kvolib.dev)
- **Documentation:** [kvolib.dev/docs](https://kvolib.dev/docs.html)
- **Components:** [kvolib.dev/components](https://kvolib.dev/components.html)
- **GitHub:** [github.com/Kvoryz/KvoLib](https://github.com/Kvoryz/KvoLib)

---

<div align="center">
  Made with ♥ by <a href="https://github.com/Kvoryz">Kvoryz</a>
</div>
