# FocusBloom Pomodoro Timer

FocusBloom is a responsive personal Pomodoro study timer designed to support focused work, intentional breaks, daily session tracking and motivational reflection.

The project was developed using a structured Git and GitHub workflow with milestones, issues, feature branches, pull requests, Conventional Commits, merge-conflict demonstrations and GitHub Pages deployment.

## Live Application

**FocusBloom:**  
https://is-project-2026.github.io/focusbloom-pomodoro-163446/

## Features

- 25-minute Focus sessions
- 5-minute Short Breaks
- 15-minute Long Breaks
- Start, Pause, Resume, and Reset controls
- Active timer-mode highlighting
- Completed Focus-session tracking
- Daily progress persistence using `localStorage`
- Automatic daily session reset
- Randomized motivational affirmations
- Affirmations on page load, timer controls, mode changes and session completion
- Responsive design for desktop and mobile devices
- Keyboard-accessible timer controls
- Accessible live regions for changing timer information
- Protection against duplicate timer intervals

## How to Use FocusBloom

1. Open the live application.
2. Select **Focus**, **Short Break**, or **Long Break**.
3. Click **Start** to begin the countdown.
4. Click **Pause** to temporarily stop the timer.
5. Click **Start** again to resume.
6. Click **Reset** to restore the selected mode's full duration.
7. Completed Focus sessions are recorded under **Today's Progress**.
8. Your daily session count remains available after refreshing the browser.

## Timer Modes

| Mode | Duration |
|---|---:|
| Focus | 25 minutes |
| Short Break | 5 minutes |
| Long Break | 15 minutes |

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser `localStorage`
- Git
- GitHub
- GitHub Projects
- GitHub Pages
- Vercel

## Project Structure

```text
focusbloom-pomodoro-163446/
├── css/
│   └── styles.css
├── docs/
│   └── focus-settings.json
├── evidence/
│   ├── conflict_evidence_1.png
│   ├── conflict_evidence_2.png
│   └── conflict_evidence_3.png
├── js/
│   └── app.js
├── index.html
└── README.md