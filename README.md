# WebApp Dashboard

> A responsive, interactive analytics dashboard featuring real-time data visualizations and user management built with vanilla JavaScript and Chart.js

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## 🔗 Live Demo

[View Live Demo](#) <!-- Add your deployed URL here -->

## 📸 Screenshots

![WebApp Dashboard](https://github.com/user-attachments/assets/ae7e8d8c-4d8f-4a82-b5a1-84867f504cf7)

## ✨ Features

- **Interactive Data Visualizations** - Dynamic line, bar, and doughnut charts powered by Chart.js
- **Responsive Design** - Mobile-first approach with seamless tablet and desktop layouts
- **User Management** - Member directory with profile images and activity tracking
- **Real-time Analytics** - Traffic monitoring with hourly, daily, weekly, and monthly views
- **Social Stats Integration** - Track engagement across Facebook, Instagram, and Twitter
- **Message System** - Built-in user messaging with form validation
- **Settings Panel** - Customizable preferences with toggle switches and timezone selection
- **Accessible UI** - ARIA labels, semantic HTML, and keyboard navigation support

## 🛠️ Tech Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Responsive grid layout with Flexbox and CSS animations
- **JavaScript (ES6)** - Vanilla JS with modern syntax
- **Chart.js 3.5.1** - Professional data visualization library
- **Google Fonts** - Poppins font family for clean typography

## 🚀 Installation & Usage

### Prerequisites

- Node.js (for running the build script)
- A modern web browser

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/brianwalkerdev/frontend-web-application.git
cd frontend-web-application
```

2. Start a local development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:8080`

Alternatively, simply open `index.html` in your web browser.

## 📦 Deployment

This project is ready for deployment to any static hosting service.

### Build for Production

Generate optimized static files:

```bash
npm run build
```

This creates a `dist/` folder with all production-ready files.

### Deploy to Static Hosts

**Netlify:**
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

**GitHub Pages:**
1. Build the project locally: `npm run build`
2. Push the `dist` folder to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

**Vercel:**
1. Import your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`

**Manual Deployment:**
Simply upload the contents of the root directory (or `dist/` after building) to any web server.

## 📁 Project Structure

```
frontend-web-application/
├── css/
│   ├── normalize.css      # CSS reset
│   └── styles.css         # Main styles
├── js/
│   └── main.js           # Application logic
├── images/               # Profile and member images
├── svgs/                 # Icon assets
├── index.html           # Main HTML file
├── package.json         # Project metadata
├── build.js            # Build script
├── LICENSE             # MIT License
└── README.md          # This file
```

## 🎯 Learning Outcomes

This project demonstrates:
- Building responsive layouts with CSS Grid and Flexbox
- Creating interactive charts with Chart.js
- Implementing form validation and user feedback
- Writing clean, maintainable vanilla JavaScript
- Structuring a frontend project for production deployment
- Following web accessibility best practices

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Brian Walker**

- Website: [brianwalker.dev](https://brianwalker.dev)
- GitHub: [@brianwalkerdev](https://github.com/brianwalkerdev)

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
