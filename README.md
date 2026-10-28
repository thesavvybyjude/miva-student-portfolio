# MIVA Open University - Student Portfolio & Academic Management Website

**Student Name:** Favour Adeyemi  
**Matriculation Number:** MIVA/CS/2023/0482  
**Department:** Computer Science, Faculty of Computing & Information Science  
**Degree:** B.Sc. (Honours) Computer Science  
**Course Code & Title:** CSC 301 - Web Technologies & Application Design  

---

## 📌 Project Overview
This project is a multi-page, responsive academic portfolio and student management web platform built using pure semantic **HTML5**, modern **CSS3** (Flexbox & CSS Grid), and **Vanilla JavaScript (ES6+)**.

The website is designed for a university student at **MIVA Open University** to present their academic identity, showcase technical achievements, play multimedia presentations, and actively manage coursework and deadlines via an interactive client-side task manager.

---

## 🚀 Live Demonstration & Repository Links
- **Live Hosted URL:** *(e.g., https://favour-adeyemi.github.io/miva-portfolio or Netlify/Vercel URL)*
- **GitHub Repository URL:** *(Submit the folder/repository containing all source code)*

---

## 📂 Project Architecture & File Hierarchy

```
miva_favour/
├── index.html              # Homepage: Photograph, welcome message, bio, quick metrics
├── about.html              # About Me: Education, career goals, skills, table, video/audio
├── projects.html           # Projects: 3 sample projects, screenshots, interactive demos, filters
├── planner.html            # Academic Planner: Interactive task CRUD, statistics, localStorage
├── contact.html            # Contact Page: Form validation (emptiness, email regex, digits-only phone)
├── README.md               # Project documentation & requirements compliance guide
├── css/
│   └── style.css           # External design system, CSS variables, dark/light theme, responsive styles
├── js/
│   ├── main.js             # Shared logic (mobile navigation, theme toggle, toasts, modals)
│   ├── planner.js          # Academic planner engine (CRUD, array functions, localStorage)
│   ├── projects.js         # Dynamic project filtering & modal trigger
│   └── contact.js          # Real-time contact form validation
└── assets/
    ├── images/
    │   ├── student-profile.jpg   # High-resolution student photograph
    │   ├── project-portal.jpg    # Screenshot: Academic Hub & Grade Portal
    │   ├── project-campus.jpg    # Screenshot: UniHub Campus Events Platform
    │   └── project-library.jpg   # Screenshot: Academia Digital E-Library
    └── media/
        ├── presentation-intro.mp4 # Video presentation introduction with native controls
        ├── student-intro.mp3      # Audio welcome note (192 kbps)
        └── student-intro.wav      # Master waveform audio track
```

---

## 📋 Comprehensive Requirements Compliance Matrix

### 1. Functional Requirements

| Requirement | Page | Implementation Details | Status |
|-------------|------|------------------------|:------:|
| **Homepage** | `index.html` | Student name (*Favour Adeyemi*), high-resolution portrait photograph, welcome heading, semantic navigation bar, and concise biography with academic metrics. | ✅ Compliant |
| **About Me** | `about.html` | Detailed educational background timeline, 1-year and 5-year career aspirations, technical skill progress bars, and extracurricular hobbies & interests. | ✅ Compliant |
| **Projects** | `projects.html` | 3 distinct projects (*MIVA Academic Hub*, *UniHub Campus Events*, *Academia E-Library*) with screenshots, descriptions, tags, interactive demo trigger modal, and GitHub links. | ✅ Compliant |
| **Academic Planner** | `planner.html` | Interactive task manager: add tasks, toggle completion status, delete tasks, filter by state, dynamic progress velocity, and persistent `localStorage`. | ✅ Compliant |
| **Contact Page** | `contact.html` | Form containing Name, Email, Phone, and Message. JavaScript validates that no field is empty, email matches standard format, and phone contains only digits. | ✅ Compliant |

---

### 2. Technical Requirements

#### HTML Requirements
- **Semantic HTML Elements:** Built using `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>`, `<figcaption>`, `<fieldset>`, `<legend>`, and `<footer>`.
- **Forms:** Implemented on `planner.html` (add task) and `contact.html` (validated contact inquiry).
- **Tables:** Detailed academic course transcript and GPA table on `about.html` (`<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<th scope="col">`).
- **Images:** Student portrait and project screenshots with descriptive `alt` tags and aspect ratio control.
- **Hyperlinks:** Inter-page navigation, `mailto:` student email, `tel:` telephone, and external university references.
- **Lists:** Ordered lists (`<ol>`), unordered lists (`<ul>`), and definition lists (`<dl>`) across `about.html` and `planner.html`.
- **Multimedia:** Native HTML5 `<video controls poster="...">` and `<audio controls>` on `about.html`.

#### CSS Requirements
- **External Stylesheet:** Consolidated under `css/style.css` using clean CSS Custom Properties (`:root`).
- **Responsive Design:** Mobile-first approach with fluid typography and breakpoints at `992px` and `768px`.
- **Flexbox & CSS Grid:** Grid used for multi-column layouts; Flexbox used for navigation, task items, and badges.
- **Navigation Styling:** Sticky header with backdrop blur, active link indicators, and mobile hamburger slide-out drawer.
- **Animations & Transitions:** Smooth hover lifts, button state transformations, floating badge keyframes, and toast alerts.
- **Consistent Colour Scheme:** MIVA Royal Navy (`#1e3a8a`), Electric Blue (`#3b82f6`), Emerald (`#10b981`), and Dark/Light mode theme switching.

#### JavaScript Requirements
- **Event Handling:** `click`, `submit`, `input`, `blur`, `keydown`, `scroll`, and `DOMContentLoaded` listeners.
- **DOM Manipulation:** Dynamic creation and mutation of elements (`innerHTML`, `classList`, `setAttribute`).
- **Form Validation:** Comprehensive client-side checks for required fields, RFC email regex, and strictly digits-only phone input.
- **Dynamic Content Updates:** Live task counters, completion percentage bars, dynamic toast notifications, and modals.
- **Arrays & Functions:** Array methods (`.map()`, `.filter()`, `.forEach()`, `.find()`, `.reduce()`) cleanly encapsulated in ES6 classes.
- **Interactive Task Management System:** Complete CRUD lifecycle with browser `localStorage` synchronization.

---

## 🛠️ How to Run Locally

You can run this website on any operating system without complex installations:

### Option 1: Direct File Open
Simply double-click `index.html` or open it with any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

### Option 2: Using Python HTTP Server (Recommended)
Open a terminal in the project root directory and run:
```bash
python3 -m http.server 8000
```
Then visit: `http://localhost:8000`

### Option 3: Using VS Code Live Server
1. Open the project folder in VS Code.
2. Right-click `index.html` and select **"Open with Live Server"**.

---

## 🌐 How to Host & Submit

### Method A: GitHub Pages (Recommended)
1. Initialize Git in the project directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: MIVA Student Portfolio and Academic Management Website"
   ```
2. Create a new public repository on [GitHub](https://github.com) named `miva-student-portfolio`.
3. Push your files to GitHub:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/miva-student-portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, go to **Settings > Pages > Branch: main / root > Save**.
5. Your live site will be deployed at `https://<YOUR_USERNAME>.github.io/miva-student-portfolio/`.

### Method B: Vercel or Netlify
1. Connect your GitHub repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Deploy with default static configuration in one click.

---

## ⚖️ License & Academic Integrity
© 2026 Favour Adeyemi. All Rights Reserved.  
Prepared for **MIVA Open University**. Developed for academic evaluation.
