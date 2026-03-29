# GCP Professional Certification Practice Exams

Interactive web-based practice exams for Google Cloud Professional certifications. Built with vanilla JavaScript - no frameworks, no dependencies.

## 🎯 Available Exams

- **Professional Data Engineer** - 273 questions
- **Professional Cloud Architect** - 333 questions

## ✨ Features

- **Multi-Exam Support** - Select from multiple GCP certification exams
- **Two Practice Modes:**
  - **Practice Mode** - Instant feedback after each answer
  - **Exam Mode** - Full simulation with final score (70% passing threshold)
- **Score Tracking** - Monitor your progress in real-time
- **Shuffle Questions** - Randomize question order for better practice
- **Clean, Modern UI** - Responsive design that works on all devices
- **Progress Bar** - Visual tracking of exam completion
- **Results Summary** - Detailed breakdown with pass/fail status
- **Zero Dependencies** - Pure HTML/CSS/JS, runs entirely client-side

## 🚀 Quick Start

### Option 1: Local Web Server (Recommended)

```bash
# Start a local web server
python3 -m http.server 8081

# Or use Node.js
npx serve

# Or use PHP
php -S localhost:8081
```

Then open http://localhost:8081 in your browser.

### Option 2: Open Directly

Simply open `index.html` in your browser. Note: Some browsers may block loading JSON files due to CORS restrictions when opening files directly.

## 📁 Project Structure

```
gcp-data-engineer-practice/
├── index.html              # Main exam interface with exam selector
├── data/                   # Parsed exam question JSON files
│   ├── data-engineer.json
│   └── cloud-architect.json
├── tools/                  # Utilities for managing exams
│   ├── parse.js           # Markdown to JSON parser
│   └── examtopics-downloader/  # Download tool (included)
└── README.md
```

## 🔧 Adding New Exams

This repo includes the examtopics-downloader tool. To add a new exam:

### 1. Download exam questions

```bash
cd tools/examtopics-downloader

# Example: Download Cloud Security Engineer
go run ./cmd/main.go -p google -s "professional-cloud-security-engineer" -o ../../raw-data/cloud-security.md
```

### 2. Parse to JSON

```bash
cd ../..
node tools/parse.js raw-data/cloud-security.md data/cloud-security.json
```

### 3. Update index.html

Add the new exam to the `EXAMS` object in `index.html`:

```javascript
const EXAMS = {
    'data-engineer': { /*...*/ },
    'cloud-architect': { /*...*/ },
    'cloud-security': {
        name: 'Professional Cloud Security Engineer',
        file: 'data/cloud-security.json',
        icon: '🔐'
    }
};
```

Add a card in the HTML:

```html
<div class="exam-card" data-exam="cloud-security" onclick="selectExam('cloud-security')">
    <div class="exam-icon">🔐</div>
    <div class="exam-title">Professional Cloud Security Engineer</div>
    <div class="exam-count" id="count-cloud-security">Loading...</div>
</div>
```

### 4. Commit and push

```bash
git add data/cloud-security.json index.html
git commit -m "Add Cloud Security Engineer exam"
git push
```

## 📋 Available ExamTopics Exams

See all available Google exams:

```bash
cd tools/examtopics-downloader
go run ./cmd/main.go -p google -exams
```

Common GCP certifications:
- `associate-cloud-engineer`
- `professional-cloud-architect`
- `professional-data-engineer`
- `professional-cloud-developer`
- `professional-cloud-devops-engineer`
- `professional-cloud-network-engineer`
- `professional-cloud-security-engineer`
- `professional-machine-learning-engineer`
- `professional-cloud-database-engineer`

## 🛠️ How It Works

1. **Download** - Questions are scraped from ExamTopics using the included Go downloader
2. **Parse** - Markdown format is converted to clean JSON with `parse.js`
3. **Practice** - The web interface loads JSON and provides an interactive exam experience

## 💡 Study Tips

1. **Start with Practice Mode** - Get familiar with questions and see immediate feedback
2. **Use Exam Mode** - Test yourself realistically without peeking at answers
3. **Shuffle Frequently** - Avoid memorizing question order
4. **Aim for 80%+** - Consistently score above 80% before taking the real exam
5. **Review Wrong Answers** - Click "View Discussion" links to learn from the community

## 📝 License

Questions are sourced from ExamTopics community discussions. This tool is for educational purposes only.

The examtopics-downloader is from: https://github.com/thatonecodes/examtopics-downloader

## 🏗️ Built With

- Pure HTML/CSS/JavaScript
- No frameworks or libraries required
- Runs entirely client-side
- Go (for the exam downloader tool)

---

**Note:** This is a study aid. Make sure to review official Google Cloud documentation and get hands-on experience with GCP services before taking certification exams.

## 🔐 Privacy

- Private repository with GitHub Pages enabled
- All processing happens client-side in your browser
- No tracking, no analytics, no data collection
