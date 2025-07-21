# Yonglin Chen - Personal Portfolio Website

A modern, responsive personal portfolio website built with React, showcasing HCI research work and academic achievements.

## 🌟 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Interactive**: Smooth scrolling, hover effects, and engaging animations
- **Performance**: Optimized for fast loading and smooth user experience
- **Accessibility**: Built with accessibility best practices

## 🚀 Tech Stack

- **Frontend**: React 18
- **Styling**: CSS3 with CSS Variables for theming
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons)
- **Routing**: React Router DOM
- **Build Tool**: Create React App

## 📱 Sections

1. **Hero**: Introduction with animated elements and call-to-action
2. **About**: Personal introduction, skills, and statistics
3. **Experience**: Timeline of research positions and academic work
4. **Publications**: Showcase of academic papers and research contributions
5. **News**: Latest updates and academic milestones
6. **Contact**: Contact form and information

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/yonglin-portfolio.git
   cd yonglin-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the website

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build folder will contain the optimized production files ready for deployment.

## 📁 Project Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.js
│   │   └── Header.css
│   ├── Hero/
│   │   ├── Hero.js
│   │   └── Hero.css
│   ├── About/
│   │   ├── About.js
│   │   └── About.css
│   ├── Experience/
│   │   ├── Experience.js
│   │   └── Experience.css
│   ├── Publications/
│   │   ├── Publications.js
│   │   └── Publications.css
│   ├── News/
│   │   ├── News.js
│   │   └── News.css
│   ├── Contact/
│   │   ├── Contact.js
│   │   └── Contact.css
│   └── Footer/
│       ├── Footer.js
│       └── Footer.css
├── App.js
├── App.css
├── index.js
└── index.css
```

## 🎨 Customization

### Colors and Theming
The website uses CSS variables for easy theming. You can modify the color scheme in `src/index.css`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --accent-color: #3b82f6;
  /* ... other variables */
}
```

### Content Updates
To update the content:

1. **Personal Information**: Edit the content in each component file
2. **Publications**: Update the `publications` array in `Publications.js`
3. **Experience**: Modify the `experiences` array in `Experience.js`
4. **News**: Update the `newsItems` array in `News.js`

### Adding New Sections
1. Create a new component folder in `src/components/`
2. Add the component to `App.js`
3. Update the navigation in `Header.js`

## 🌐 Deployment

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify
3. Configure custom domain if needed

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically build and deploy

### GitHub Pages

**方法一：手动部署**
1. 确保已安装 gh-pages: `npm install --save-dev gh-pages`
2. 在 package.json 中已配置:
   ```json
   "homepage": "https://100days-yonglin.github.io/",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. 部署: `npm run deploy`

**方法二：自动部署（推荐）**
1. 将代码推送到 GitHub 仓库
2. 在 GitHub 仓库设置中启用 GitHub Pages
3. 选择 "GitHub Actions" 作为源
4. 每次推送到 main/master 分支时会自动部署

**重要设置步骤：**
1. 在 GitHub 上创建名为 `100days-yonglin.github.io` 的仓库
2. 将本地代码推送到该仓库
3. 在仓库设置 > Pages 中，选择 "Deploy from a branch" 并选择 `gh-pages` 分支
4. 或者选择 "GitHub Actions" 使用自动部署工作流

## 📧 Contact Form

The contact form is currently set up with a mock submission. To make it functional:

1. **Backend Integration**: Connect to a backend service
2. **Email Service**: Use services like EmailJS, Formspree, or Netlify Forms
3. **Validation**: Add form validation as needed

## 🔧 Performance Optimization

- **Code Splitting**: Implemented with React.lazy() for larger components
- **Image Optimization**: Use WebP format and lazy loading
- **Bundle Analysis**: Run `npm run build` and analyze bundle size
- **Caching**: Implement service workers for offline functionality

## 🐛 Troubleshooting

### Common Issues

1. **Node Version**: Ensure you're using Node.js 14+
2. **Dependencies**: Clear node_modules and reinstall if needed
3. **Port Conflicts**: Change port in package.json if 3000 is occupied

### Development Tips

- Use React Developer Tools for debugging
- Check browser console for any errors
- Test on multiple devices and browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/yonglin-portfolio/issues).

## 📞 Support

If you have any questions or need help with setup, feel free to reach out:

- Email: yonglin.chen@example.com
- LinkedIn: [linkedin.com/in/yonglin-chen](https://linkedin.com/in/yonglin-chen)

---

**Made with ❤️ using React**