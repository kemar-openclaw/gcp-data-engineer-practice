#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the markdown file
const markdownPath = process.argv[2] || '../examtopics-downloader/google-data-engineer.md';
const outputPath = process.argv[3] || './questions.json';

console.log('Reading from:', markdownPath);

const content = fs.readFileSync(markdownPath, 'utf8');

// Split into question blocks - handle both "Examtopics" and "Exam" prefixes
const questionBlocks = content.split(/## (?:Examtopics|Exam) /).filter(block => block.trim().length > 0);

console.log(`Found ${questionBlocks.length} question blocks`);

const questions = [];

questionBlocks.forEach((block, index) => {
    try {
        // Skip the header block
        if (block.includes('# Exam Topics Questions')) return;

        // Extract question number from various header formats
        const headerMatch = block.match(/(?:Professional [A-Za-z\s]+[_\s]+\d+\s+question\s+#?(\d+)|topic\s+\d+\s+question\s+#?(\d+))/i);
        if (!headerMatch) return;

        // Extract the question text - handle multiple formats
        let questionText = '';
        
        // Format 1: "Examtopics Professional Data Engineer_2 question #1" followed by question
        let questionMatch = block.match(/question\s+#\d+\s*\n\n([\s\S]+?)(?=\n\*\*[A-Z]\**:|$)/i);
        
        // Format 2: "[All...Questions]" followed by question
        if (!questionMatch) {
            questionMatch = block.match(/\[All [^\]]+\]\s*\n\n([\s\S]+?)(?=\n(?:Suggested Answer|Most Voted|\*\*[A-Z]\**:|^[A-Z]\.))/im);
        }
        
        if (!questionMatch) return;
        
        questionText = questionMatch[1].trim();

        // Extract all options - handle both "**A:**" and "A." formats
        const options = [];
        
        // Try format "**A:** text"
        let optionRegex = /\*\*([A-Z])\**:\s*\*?\*?\s*([\s\S]+?)(?=\n\*\*[A-Z]\**:|\n\n\*\*Answer:|$)/gi;
        let optionMatch;
        
        while ((optionMatch = optionRegex.exec(block)) !== null) {
            options.push({
                letter: optionMatch[1],
                text: optionMatch[2].trim().replace(/\n/g, ' ')
            });
        }
        
        // If no options found, try format "A. text"
        if (options.length === 0) {
            optionRegex = /^([A-Z])\.\s+(.+?)(?=\n(?:[A-Z]\.|$|\*\*Answer:))/gim;
            while ((optionMatch = optionRegex.exec(block)) !== null) {
                options.push({
                    letter: optionMatch[1],
                    text: optionMatch[2].trim().replace(/\n/g, ' ')
                });
            }
        }

        // Extract the correct answer - handle single or multiple letters
        const answerMatch = block.match(/\*\*Answer:\s*([A-Z]+)\*\*/i);
        if (!answerMatch) return;

        const answer = answerMatch[1];

        // Extract the ExamTopics link
        const linkMatch = block.match(/\[View on ExamTopics\]\((https:\/\/www\.examtopics\.com[^\)]+)\)/i);
        const link = linkMatch ? linkMatch[1] : '';

        // Only add if we have at least 2 options
        if (options.length >= 2) {
            questions.push({
                id: questions.length + 1,
                question: questionText,
                options: options,
                answer: answer,
                link: link
            });
        }
    } catch (error) {
        console.error(`Error parsing question block ${index}:`, error.message);
    }
});

console.log(`Successfully parsed ${questions.length} questions`);

// Write to JSON file
fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));
console.log(`Saved to: ${outputPath}`);
