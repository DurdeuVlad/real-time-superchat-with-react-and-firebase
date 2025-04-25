# Real-Time Superchat with React and Firebase

## Introduction

This was one of the first serious projects I built with React and Firebase. I followed a YouTube tutorial to get the basics down and then built this real-time chat app to really get a feel for how frontend and backend can work together in real-time.

It covers Google sign-in, real-time Firestore updates, and a clean React setup. Simple goal: make something that actually works and feels smooth.

## What It Does

Google sign-in with Firebase Authentication  
Send and receive messages in real-time  
Messages are stored in Firestore  
Responsive frontend built with React  
Instant updates across all users without refreshing the page

## Tech Stack

React  
Firebase (Authentication and Firestore)  
React Firebase Hooks  
Plain CSS for styling

## How to Use

### 1. Clone the repo

```bash
git clone https://github.com/DurdeuVlad/Real-time-superchat-with-react-and-firebase.git
cd Real-time-superchat-with-react-and-firebase
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Firebase

- Go to [https://console.firebase.google.com](https://console.firebase.google.com) and create a new project  
- Enable Firestore Database  
- Enable Google Sign-In in the Authentication section  
- Copy your Firebase config and paste it into `firebase.js`

### 4. Run the app

```bash
npm start
```

App will be live on `http://localhost:3000`
