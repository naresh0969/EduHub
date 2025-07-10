# 🎓 EduHub – RGUKT Student Platform

**EduHub** is a dedicated platform built for students of **RGUKT** to simplify **communication**, enable **resource sharing**, and foster **peer-to-peer collaboration** in a centralized online hub.

---

## ✨ Features

- 🔐 **Email Login with OTP**  
  Only RGUKT students (with `@rgukt.ac.in` emails) can register and log in using secure OTP verification.

- 📚 **Preparation Resources**  
  Students can upload and access materials like **previous year question papers**, **placement preparation content**, and **subject notes**.

- 💼 **Internship & Event Posting**  
  Central space to view or post **internship opportunities**, **hackathons**, **competitions**, and **college events**.

- 🧠 **AI Chatbot**  
  An integrated **AI assistant** helps:
  - Answer student queries
  - Recommend useful resources
  - Analyze uploaded content contextually

- 🤝 **Peer-to-Peer Connectivity**  
  Connect with fellow students from different departments and semesters.

> More features like search filters, upvotes on helpful content, and content moderation are planned for upcoming versions.

---

## 🛠️ Tech Stack

| Layer         | Technology       |
|---------------|------------------|
| Frontend      | React + Tailwind CSS |
| Backend       | Node.js + Express |
| Database      | MongoDB          |
| Email Service | Gmail SMTP       |
| Deployment    | Render (Backend), Vercel (Frontend) |

---

## 🚀 Getting Started

To run the project locally, follow these steps:

### 📦 Backend

```bash
cd backend
npm install
node index.js

cd frontend
npm install
npm run dev
