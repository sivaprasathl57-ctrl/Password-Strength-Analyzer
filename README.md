
# Password Strength Analyzer

The Password Strength Analyzer is a tool designed to evaluate the strength of passwords based on various criteria such as length, character variety, and common patterns. It helps users create strong, secure passwords and avoid weak or easily guessable ones.


# Purpose

teach password security, entropy estimation, and UX for secure guidance.


# Workflow


Implementation steps
1.	Project scaffold

○	Create repo password-strength-analyzer.

○	Folders: /src, /tests, /docs, /assets.

2.	Design UX

○	Simple UI: input box, strength meter (bar + label), suggestions list.

○	Accessibility: ARIA labels, visible contrast, keyboard accessible.

3.	Core analyzer module (functions)

○	checkLength(pwd) → boolean/score.

○	charClasses(pwd) → counts classes: lowercase, uppercase, digits, symbols.

○	isCommonPassword(pwd) → check against a blacklist (rockyou short list or curated top-10k).

○	estimateEntropy(pwd) → bits using pool-size method:

■	Pool size = sum of character sets used (e.g., lowercase 26 + uppercase 26 + digits 10 + symbols ~32 ≈ 94).

■	Entropy ≈ length * log2(pool_size).
 Example: for a password using all classes of length 8, entropy ≈ 52.44 bits (8 × log2(94)). For length 12 with same pool ≈ 78.66 bits.

○	generateSuggestions(pwd) → actionable tips (add length, add symbols, avoid dictionary words).

4.	Scoring & thresholds

○	Combine signals into a simple rubric (example):

■	If isCommonPassword → Very Weak.

■	Else use entropy + class checks:

■	entropy < 28 → Very Weak

■	28–35 → Weak

■	36–59 → Moderate

■	60–127 → Strong

■	≥128 → Very Strong

○	Show both label and numeric entropy bits.



## Features

- Checks password length (minimum recommended length: 8 characters)
- Evaluates character diversity (uppercase, lowercase, numbers, special characters)
- Detects common patterns and dictionary words
- Provides a strength score (e.g., Weak, Medium, Strong, Very Strong)
- Gives actionable suggestions to improve password security
## New Feature Add By Me

- Real-time Feedback: As you type your password, the analyzer shows immediate strength updates.

- Password History Check: Warns if the password has been used previously (for personal password management).

- Leaked Password Detection: Checks against known data breaches using publicly available APIs (like Have I Been Pwned).

- Entropy Calculation: Shows a numerical score based on password unpredictability.
- Visual Strength Meter: Graphical indicator (bar or color code) for easy understanding of password strength.
- Custom Rules: Allows users to define their own password policies (minimum length, required character types, etc.).

- Password Suggestions: Automatically generates strong password recommendations.

- Localization: Multi-language support for global users.

- Export Report: Option to save password strength analysis in a CSV or PDF report for auditing purposes.
## Installation

Install Of My Project

## 1.Download

You can either download the ZIP of the repository or clone it using Git:

```bash
 git clone https://github.com/yourusername/password-strength-analyzer.git
cd password-strength-analyzer
```
## 2. Using Locally (HTML, CSS, JS Only)

Since this project runs fully in the browser, no server is required:

- Open the project folder.

- Double-click index.html (or your HTML file).

- Your password strength analyzer will open in your default browser.

- Start typing a password to see the strength, entropy, and suggestions in real-time.


## 3. Optional: Run on a Local Server

If you want smoother loading or use a server environment:

Using Python (3.x):
```bash
cd password-strength-analyzer
python -m http.server 8000
```
## Screenshots
![Screenshot 2025-10-01 181552](https://github.com/user-attachments/assets/3d718418-7921-4887-a630-9b3355715bae)

![Screenshot 2025-10-01 181639](https://github.com/user-attachments/assets/1042d39e-9d04-4aa4-8913-8c71656b9b94)

![Screenshot 2025-10-01 181733](https://github.com/user-attachments/assets/47114409-d02e-4cb0-969d-2b78b05dd667)

![Screenshot 2025-10-01 181815](https://github.com/user-attachments/assets/3e4a2d38-b62d-414f-8ccd-718c67841e3e)





## Demo

https://github.com/user-attachments/assets/10498f7e-3a0a-4c3f-b835-83caab3ab840


