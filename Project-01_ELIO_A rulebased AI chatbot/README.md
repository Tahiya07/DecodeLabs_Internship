# Elio — Rule-Based AI Chatbot

## Project Overview

Elio is a polished interactive chatbot for an AI foundation internship project. It pairs a minimal ambient interface with transparent, deterministic decision-making.

## Features

- Input normalization for casing, punctuation, and whitespace
- Ordered rule matching for greetings, identity, capabilities, AI concepts, project details, casual replies, and exit commands
- Visible matched-rule feedback and a visual decision pipeline
- Responsive, keyboard-accessible interface with reduced-motion support
- Static export suitable for Android packaging

## Technology Stack

Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and Capacitor Android.

## Rule-Based Architecture

`normalizeInput()` cleans a message. `respondTo()` checks it against the explicit ordered rules in `lib/chatbot/rules.ts`, then returns a fixed response and category. No data is sent to a server.

## How the Chatbot Works

User input → normalization → rule matching → conditional logic → deterministic response.

## Example Rules

- `hello`, `hi`, and `good morning` return a greeting.
- `what can you do` returns the capabilities response.
- `bye`, `exit`, and `quit` close the session visually.
- An unmatched request returns an honest fallback.

## Running Locally

```bash
npm install
npm run dev
```

For a static production build, run `npm run build`. To prepare Android after the build, run `npx cap sync android`, then create an APK from the generated Android project using Android Studio or Gradle.

## Project Purpose

This project does not use a large language model or external AI API. Responses are generated through predefined rules and conditional logic.
