
# 💸 Expense Sharing Application (Splitwise Clone)

A full-stack expense sharing application inspired by Splitwise.  
This project allows users to create groups, add shared expenses, split costs in multiple ways, track balances, and settle dues.

---

## 🚀 Features

### 👥 User & Group Management
- User registration & login (JWT authentication)
- Create groups
- Add multiple members to a group

### 💰 Expense Management
- Add shared expenses
- Supported split types:
  - **Equal Split**
  - **Exact Amount Split**
  - **Percentage Split**

### 📊 Balance Tracking
- Tracks **who owes whom**
- Shows:
  - How much a user owes
  - How much a user gets
- Balances are **simplified** by ignoring settled expenses

### ✅ Settle Up
- Settle expenses with a single click
- Settled expenses are excluded from balance calculations
- Expense history remains visible

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript
- HTML & CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## 🧠 System Design Overview

- **Group** is the source of truth for members
- **Expense** stores:
  - Paid by
  - Split details (normalized to currency)
  - Settlement status
- **Balance calculation** considers only unsettled expenses
- **Split types** affect input method, but final values are always stored and shown in currency

---

## 📂 Project Structure

