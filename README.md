# 🛍️ LOGO | Modern E-Commerce Architecture

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge)

![Project Banner](public/images/models/modaltwo.jpeg)
## 📖 About The Project

**LOGO** is a production-ready e-commerce storefront designed with a focus on **User Experience (UX)** and **Performance**. Unlike standard template sites, this project implements advanced patterns like **Optimistic UI updates** and **Context-Aware Authentication** to create a seamless, app-like feel.

The architecture is explicitly split between a public **Storefront** and a protected **Admin Panel**, demonstrating a secure and scalable folder structure suitable for enterprise applications.

> **Live Demo:** [https://tshirt-five-lovat.vercel.app/]
>
> **Repository:** [https://github.com/ikshantshukla123/LOGO](https://github.com/ikshantshukla123/LOGO)

---

## 🏗️ Architecture & File Structure

This project follows a **Domain-Driven Design** approach using the Next.js App Router. The codebase is strictly separated into public and administrative concerns.

```text
src/
 ├── app/
 │    ├── (storefront)/       #  PUBLIC DOMAIN
 │    │     ├── layout.tsx    # Store-specific layout (Navbar/Footer)
 │    │     ├── products/     # Product Listing & Details (SSR)
 │    │     ├── cart/         # Shopping Cart (Client + Optimistic UI)
 │    │     └── custom/       # Custom Design Tool (Planned)
 │    │
 │    ├── admin/              # PROTECTED DOMAIN (CMS)
 │    │     ├── layout.tsx    # Admin Sidebar & Auth Guard
 │    │     ├── products/     # CRUD Operations for Inventory
 │    │     └── orders/       # Order Management Dashboard
 │    │
 │    └── api/                # SERVERLESS BACKEND
 │          ├── auth/         # JWT Authentication Routes
 │          ├── cart/         # Cart Sync & Persistence Logic
 │          └── webhooks/     # Payment Gateways (Stripe/Razorpay)
 │
 ├── components/              #  ATOMIC UI COMPONENTS
 │    ├── ui/                 # Reusable primitives (Buttons, Modals)
 │    ├── nav/                # Navigation & Mega-Menus
 │    └── products/           # Product Cards & Grids
 │
 ├── store/                   #  GLOBAL STATE (Zustand)
 │    ├── authStore.ts        # User Session Management
 │    └── cartStore.ts        # Optimistic Cart Logic
 │
 ├── lib/                     #  UTILITIES
 │    ├── db.ts               # Prisma Singleton Client
 │    └── jwt.ts              # Token Generation & Verification
 │
 └── prisma/                  # 💾 DATABASE
      └── schema.prisma       # PostgreSQL Schema
 Key Technical Features
1. ⚡ Optimistic Cart UI
To eliminate network latency, the cart state updates instantly on the client side using a temporary ID.

The API sync happens in the background.

If the server request fails, the state automatically rolls back, ensuring data consistency without sacrificing speed.

Code: src/store/cartStore.ts

2.  Context-Aware Global Auth
Implemented a robust "Login-First" protection system without blocking navigation.

Users can browse freely.

Smart Interception: Clicking "Add to Cart" or "Checkout" triggers a global modal if unauthenticated.

Dynamic UI: The modal title changes based on intent (e.g., "Login to add to bag" vs "Welcome Back").

3.  High-End Visual Design
Glassmorphism: Used backdrop-filter and semi-transparent layers for a modern feel.

Responsive: Mobile-first approach with a custom hamburger menu and mega-menu for desktop.

Micro-interactions: Loading spinners and success animations provide immediate user feedback.

 Getting Started
Follow these steps to run the project locally.

1. Clone & Install
Bash

git clone [https://github.com/ikshantshukla123/LOGO.git](https://github.com/ikshantshukla123/LOGO.git)
cd LOGO
npm install
2. Environment Setup
Create a .env file in the root directory:

Code snippet

# Database (NeonDB / PostgreSQL)
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"

# Authentication
JWT_SECRET="your-super-secret-key-change-this"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
3. Database Migration
Bash

npx prisma db push
npx prisma generate
4. Run Development Server
Bash

npm run dev
Open http://localhost:3000 to view the app.

 Roadmap & Status
This project is currently in Active Development.

[x] Core Architecture (Next.js 15 Setup)

[x] Authentication System (JWT + Cookies)

[x] Product Browsing (Listing & Details)

[x] Shopping Cart (Add/Remove/Sync)

[x] Admin Dashboard (UI Scaffolded, Logic In Progress) [at /admin]

[ ] Checkout & Payments (Stripe Integration Pending)

[ ] Order History (Schema Ready)