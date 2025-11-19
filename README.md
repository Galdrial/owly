# 🦉 Owly - Book Search Application

A modern, responsive web application for searching and exploring books by category using the Open Library API.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![Webpack](https://img.shields.io/badge/Webpack-5.x-blue.svg)
![Axios](https://img.shields.io/badge/Axios-1.x-purple.svg)
![Lodash](https://img.shields.io/badge/Lodash-4.x-green.svg)

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Build](#build)
- [API Reference](#api-reference)

## ✨ Features

- 🔍 **Search by Category**: Find books by entering any subject (e.g., fantasy, science fiction, history)
- 📚 **Comprehensive Results**: Display up to 100 books with titles, authors, and cover images
- 📖 **Detailed View**: Click on any book card to see its full description, publication year, and additional info
- 🎨 **Modern UI**: Responsive grid layout with smooth animations and transitions
- 🚀 **Fast Loading**: Optimized image preloading before displaying results
- ⚡ **Error Handling**: User-friendly error messages for failed requests or empty results
- 🌐 **Multi-word Search**: Automatically handles search terms with spaces
- 🖼️ **Placeholder Images**: Graceful fallback for books without cover images
- ⌨️ **Keyboard Support**: Press Enter to search

## 🎯 Demo

[Live Demo](#) <!-- Add your deployed URL here -->

## 📸 Screenshots

<!-- Add screenshots of your application here -->
```
Coming soon...
```

## 🛠️ Technologies

### Core
- **JavaScript ES6+** - Modern vanilla JavaScript with async/await
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with animations

### Build Tools
- **Webpack 5** - Module bundler
- **webpack-dev-server** - Development server with hot reload

### Libraries
- **Axios** - Promise-based HTTP client for API requests
- **Lodash** - Utility library for safe data access with `_.get()`

### Plugins
- **html-webpack-plugin** - Generates HTML files
- **css-loader** & **style-loader** - CSS processing
- **dotenv-webpack** - Environment variables management

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/owly.git
cd owly
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables** (see [Environment Variables](#environment-variables))

5. **Start development server**
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🚀 Usage

1. **Enter a book category** in the search box (e.g., "fantasy", "science fiction", "romance")
2. **Click Search** or press **Enter**
3. **Browse results** displayed as cards with title, author, and cover image
4. **Click on any card** to view detailed information including the book's description

### Example Searches
- `fantasy` - Fantasy books
- `science fiction` - Sci-fi literature
- `programming` - Programming and technology books
- `history` - Historical works
- `biography` - Biographical books

## 📁 Project Structure

```
owly/
├── dist/                   # Production build output
├── node_modules/           # Dependencies
├── src/                    # Source files
│   ├── index.html         # HTML template
│   ├── index.js           # Entry point
│   ├── fetch.js           # API logic and book display
│   └── style.css          # Application styles
├── .env                    # Environment variables (not in git)
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies and scripts
├── webpack.config.js      # Webpack configuration
└── README.md              # This file
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Open Library API Base URL
API_BASE_URL=https://openlibrary.org

# Request timeout in milliseconds
API_TIMEOUT=5000

# Maximum number of results to fetch
MAX_RESULTS=100
```

### Configuration Options

| Variable | Description | Default |
|----------|-------------|---------|
| `API_BASE_URL` | Base URL for Open Library API | `https://openlibrary.org` |
| `API_TIMEOUT` | Request timeout in ms | `5000` |
| `MAX_RESULTS` | Maximum books to display | `100` |

## 🏗️ Build

### Development Mode
```bash
npm start
```
Starts webpack-dev-server with hot reloading at `http://localhost:3000`

### Production Build
```bash
npm run build
```
Creates optimized bundle in `dist/` folder with:
- Minified JavaScript
- Optimized CSS
- Compressed assets

### Watch Mode
```bash
npm run watch
```
Automatically rebuilds on file changes

## 📡 API Reference

This application uses the [Open Library API](https://openlibrary.org/developers/api):

### Endpoints Used

1. **Search by Subject**
```
GET https://openlibrary.org/subjects/{subject}.json?limit={n}&offset={n}
```
Returns a list of books for a specific subject/category.

2. **Get Book Details**
```
GET https://openlibrary.org/works/{key}.json
```
Returns detailed information about a specific book including description.

### Example Response Structure

**Subject Search Response:**
```json
{
  "key": "/subjects/fantasy",
  "name": "fantasy",
  "work_count": 12345,
  "works": [
    {
      "key": "/works/OL8193508W",
      "title": "Alice's Adventures in Wonderland",
      "authors": [{"name": "Lewis Carroll"}],
      "cover_id": 12345,
      "first_publish_year": 1865
    }
  ]
}
```

**Book Details Response:**
```json
{
  "title": "Alice's Adventures in Wonderland",
  "description": "One of the most popular books...",
  "first_publish_date": "1865",
  "authors": [...]
}
```

## 🎨 Features Implementation

### Image Preloading
All book cover images are preloaded before displaying cards to prevent layout shifts:
```javascript
const cardPromises = data.works.map((work) => {
  return new Promise((resolve) => {
    imgElement.onload = () => resolve(card);
  });
});
await Promise.all(cardPromises);
```

### Safe Data Access with Lodash
Using `_.get()` prevents errors when accessing nested properties:
```javascript
const authorName = _.get(work, 'authors[0].name', 'Unknown author');
const description = _.get(bookDetails, 'description.value') || 
                   _.get(bookDetails, 'description') || 
                   'Description not available';
```

### Modal Description View
Clicking a book card opens a modal with:
- Full book description
- Publication year
- Complete author list
- Large cover image

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Project: [Owly](https://github.com/yourusername/owly)

## 🙏 Acknowledgments

- [Open Library](https://openlibrary.org/) - For providing the free book API
- [Webpack](https://webpack.js.org/) - Module bundler
- [Axios](https://axios-http.com/) - HTTP client
- [Lodash](https://lodash.com/) - Utility library

---

Made with ❤️ and JavaScript
