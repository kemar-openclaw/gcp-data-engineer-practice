# GCP Professional Data Engineer Practice Exam

An interactive web-based practice exam for the Google Cloud Professional Data Engineer certification. Built with vanilla JavaScript - no frameworks, no dependencies.

## Features

- **273 Real Exam Questions** - Downloaded from ExamTopics
- **Two Modes:**
  - **Practice Mode** - Instant feedback after each answer
  - **Exam Mode** - Submit answers and see results at the end
- **Score Tracking** - Monitor your progress in real-time
- **Shuffle Questions** - Randomize question order for better practice
- **Clean UI** - Modern, responsive design
- **Progress Bar** - Visual tracking of exam completion
- **Results Summary** - Detailed breakdown with pass/fail status (70% passing)

## Quick Start

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

Simply open `index.html` in your browser. Note: Some browsers may block loading `questions.json` due to CORS restrictions when opening files directly.

## Files

- `index.html` - The main exam interface
- `questions.json` - 273 exam questions in JSON format
- `parse.js` - Script to convert ExamTopics markdown to JSON

## How It Works

The exam questions were downloaded using [examtopics-downloader](https://github.com/thatonecodes/examtopics-downloader):

```bash
go run ./cmd/main.go -p google -s "professional-data-engineer" -o google-data-engineer.md
```

Then parsed into a clean JSON format using `parse.js`.

## Tips for Using

1. **Practice Mode** - Use this first to learn. You get instant feedback and can see the correct answer immediately.

2. **Exam Mode** - When you're ready to test yourself, use exam mode for a more realistic experience. No peeking at answers!

3. **Shuffle Questions** - Click shuffle to randomize the question order. Do this multiple times to avoid memorizing the sequence.

4. **Track Your Progress** - Aim for consistent 80%+ scores before taking the real exam.

## License

Questions are sourced from ExamTopics community discussions. This tool is for educational purposes only.

## Built With

- Pure HTML/CSS/JavaScript
- No frameworks or libraries
- Runs entirely client-side

---

**Note:** This is a study aid. Make sure to review Google Cloud documentation and get hands-on experience with GCP services before taking the certification exam.
