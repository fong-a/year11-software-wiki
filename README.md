# Year 11 Software Engineering Revision Wiki

A comprehensive, interactive revision wiki for Year 11 Software Engineering students, built with Astro and designed for GitHub Pages deployment.

## 🚀 Features

- **Interactive Learning Components**: Flip cards, collapsible accordions, step-through desk checks, and MCQ quizzes
- **Python Code Runner**: Execute Python code directly in the browser using Pyodide
- **Visual Diagrams**: Mermaid diagrams for flowcharts, UML, and system architecture
- **Comprehensive Topics**: All major Year 11 Software Engineering curriculum areas covered
- **Teacher Resources**: Classroom demonstration ideas and assessment guidance
- **Mobile Responsive**: Fully responsive design for learning on any device

## 📚 Learning Topics

1. **Programming Fundamentals** - Variables, control structures, functions, data structures
2. **Object-Oriented Programming** - Classes, objects, inheritance, encapsulation, polymorphism
3. **Mechatronics Systems** - Sensors, actuators, microcontrollers, control systems
4. **Algorithms and Testing** - Search, sort, complexity analysis, testing strategies
5. **Data Representation and Types** - Binary, data types, memory usage, character encoding
6. **Project Methods and Version Control** - Development methodologies, Git workflows

## 🛠️ Technology Stack

- **Framework**: [Astro](https://astro.build) - Fast, content-focused static site generator
- **Styling**: CSS with modern features, Public Sans + Fira Code fonts
- **Interactive Components**: Custom Astro components with vanilla JavaScript
- **Python Runtime**: [Pyodide](https://pyodide.org) for in-browser Python execution
- **Diagrams**: [Mermaid](https://mermaid.js.org) for flowcharts and UML diagrams
- **Deployment**: GitHub Pages with automated GitHub Actions

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/USERNAME/year11-software-wiki.git
   cd year11-software-wiki
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:4321`
   - The site will automatically reload when you make changes

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

## 📦 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. **Fork or create repository on GitHub**

2. **Update configuration**
   - Edit `astro.config.mjs`
   - Replace `USERNAME` with your GitHub username
   - Replace `year11-software-wiki` with your repository name if different

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"

4. **Push to main branch**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

5. **Automatic deployment**
   - GitHub Actions will automatically build and deploy
   - Site will be available at `https://USERNAME.github.io/year11-software-wiki`

### Manual Deployment

If you prefer manual deployment:

1. **Build the site**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

## 🎨 Customization

### Adding New Topics

1. **Create new MDX file** in `src/pages/topics/`
2. **Use TopicLayout** and follow existing structure:
   ```mdx
   ---
   layout: ../../layouts/TopicLayout.astro
   title: Your Topic Title
   description: Brief description
   topic: Your Topic Name
   ---
   
   import components...
   
   ## Overview
   ## Interactive Learning  
   ## How to Revise
   ## Practice Questions
   ```

3. **Update navigation** in `src/layouts/BaseLayout.astro`
4. **Add topic card** to homepage in `src/pages/index.astro`

### Modifying Components

All interactive components are in `src/components/`:
- `Accordion.astro` - Collapsible content sections
- `FlipCard.astro` - Two-sided flip cards for Q&A
- `MCQQuiz.astro` - Multiple choice questions with feedback
- `PyRunner.astro` - In-browser Python code execution
- `DeskCheck.astro` - Step-through algorithm tracing
- `Callout.astro` - Highlighted information boxes

### Styling Changes

- **Global styles**: Edit `src/styles/global.css`
- **Layout styles**: Modify `src/layouts/BaseLayout.astro`
- **Component styles**: Each component has its own `<style>` section

## 📖 Content Guidelines

### Writing Style
- **Student-friendly**: Use clear, conversational language
- **Real-world connections**: Relate concepts to practical applications
- **Progressive complexity**: Start simple, build to advanced concepts

### Structure Each Topic
1. **Overview** (2-3 paragraphs) - Why it matters, student-friendly introduction
2. **Key Points** (5-9 bullets) - Essential concepts with ✅/⚠️ icons
3. **Interactive Element** - Mermaid diagram, flip cards, or desk check
4. **How to Revise** (2-3 strategies) - Active learning approaches
5. **Practice Questions** (4-6 questions) - Mix of MCQ and structured questions
6. **Answers & Marking** - Model answers with mark allocation
7. **Teacher Notes** - Classroom demonstration suggestions

### Interactive Components Usage

- **FlipCard**: Question/answer pairs, concept explanations
- **MCQQuiz**: Quick comprehension checks with explanations
- **PyRunner**: Demonstrate code concepts, allow experimentation
- **DeskCheck**: Trace algorithm execution step-by-step
- **Accordion**: Collapsible content, answers, detailed explanations
- **Callout**: Important warnings, teacher notes, key information

## 🔧 Development Notes

### Project Structure
```
year11-software-wiki/
├── src/
│   ├── components/     # Interactive Astro components
│   ├── layouts/        # Base and topic page layouts
│   ├── pages/          # Site pages (index + topics)
│   └── styles/         # Global CSS styles
├── public/             # Static assets
├── .github/workflows/  # GitHub Actions deployment
└── astro.config.mjs    # Astro configuration
```

### Component Architecture
- **Server-side rendering**: Components render to HTML at build time
- **Progressive enhancement**: JavaScript adds interactivity where needed
- **Vanilla JS**: No framework dependencies for maximum performance
- **Accessible**: Proper ARIA labels and keyboard navigation

### Performance Considerations
- **Static site generation**: Fast loading, excellent SEO
- **Minimal JavaScript**: Only load what's needed for interactivity
- **Optimized fonts**: Google Fonts with proper loading strategies
- **Image optimization**: Automatic image processing by Astro

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow content guidelines** above
4. **Test locally** (`npm run dev`)
5. **Commit changes** (`git commit -m 'Add amazing feature'`)
6. **Push to branch** (`git push origin feature/amazing-feature`)
7. **Open Pull Request**

### Content Contributions Welcome
- Additional practice questions
- Interactive component improvements
- New topic areas
- Accessibility enhancements
- Mobile experience improvements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

- **Documentation**: This README and inline code comments
- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas

## 🎯 Future Enhancements

- [ ] Dark mode support
- [ ] Progress tracking
- [ ] Printable revision sheets
- [ ] Additional language support (Java, C++)
- [ ] Video integration
- [ ] Collaborative features
- [ ] Assessment analytics

---

Built with ❤️ for Year 11 Software Engineering students and teachers.
