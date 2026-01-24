#  Modern T-Shirt E-commerce Platform

A full-stack Next.js e-commerce platform built for custom t-shirt sales with comprehensive admin dashboard, secure authentication, and seamless shopping experience.

**Live Demo:** `https://tshirt-five-lovat.vercel.app/` 

## 📸 Screenshots

| Homepage | All Products | Product Details | Admin Dashboard |
|----------|-------------|----------------|----------------|
| ![Homepage](./public/readme/home.png) | ![All Products](./public/readme/allproduct.png) | ![Product Details](./public/readme/product.png) | ![Admin Dashboard](./public/readme/admin.png) |



---

## ✨ Features

### 🛍️ **Customer Features**
- **Product Browsing** - Responsive product catalog with filtering and search
- **Product Details** - High-quality image gallery with size selection
- **Shopping Cart** - Persistent cart with quantity management
- **User Authentication** - Secure JWT-based auth with mobile verification
- **Order Management** - Order history and status tracking
- **Responsive Design** - Mobile-first responsive UI with dark mode support

### 🔧 **Admin Features**
- **Dashboard Analytics** - Sales metrics, revenue tracking, and key statistics
- **Product Management** - CRUD operations with image upload via UploadThing
- **Order Management** - Order processing and status updates
- **User Management** - Customer data and account management
- **Secure Admin Access** - Protected admin routes with role-based authentication

---

## 🚀 Tech Stack

### **Frontend**
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **TailwindCSS 4** - Utility-first CSS framework
- **Lucide Icons** - Modern icon library
- **React Hook Form + Zod** - Form handling with validation
- **Zustand** - Lightweight state management
- **React Hot Toast** - Beautiful notifications

### **Backend & Database**
- **Next.js API Routes** - Server-side API endpoints
- **Prisma ORM** - Type-safe database client
- **Neon PostgreSQL** - Serverless PostgreSQL database
- **JWT Authentication** - Secure token-based authentication

### **File Storage & Media**
- **UploadThing** - File upload service
- **ImageKit** - Image optimization and delivery

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

---

## 📁 Project Structure

```
tshirt/
├── app/                          # Next.js App Router
│   ├── (storefront)/            # Customer-facing pages
│   │   ├── page.tsx             # Homepage (ISR - 1h revalidate)
│   │   ├── layout.tsx           # Storefront layout with Navbar/Footer
│   │   ├── products/            
│   │   │   ├── page.tsx         # Product listing (ISR - 5m revalidate)
│   │   │   ├── ProductsContent.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx     # Product details (ISR - 5m revalidate)
│   │   │       └── ProductDetailsClient.tsx
│   │   ├── cart/                
│   │   │   └── page.tsx         # Shopping cart (CSR)
│   │   ├── about/               # About page
│   │   └── custom/              # Custom design page
│   ├── admin/                   # Admin dashboard (SSR)
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Dashboard analytics
│   │   ├── products/            # Product management
│   │   │   ├── page.tsx
│   │   │   ├── ProductsClient.tsx
│   │   │   ├── DeleteProductButton.tsx
│   │   │   ├── new/             # Create product
│   │   │   └── [id]/            # Edit product
│   │   ├── orders/              # Order management
│   │   │   ├── page.tsx
│   │   │   └── OrdersClient.tsx
│   │   └── users/               # User management
│   │       ├── page.tsx
│   │       └── UsersClient.tsx
│   └── api/                     # API routes
│       ├── auth/                # Authentication endpoints
│       │   ├── admin-login/
│       │   ├── check-user/
│       │   ├── register/
│       │   └── save/
│       ├── cart/                # Cart operations
│       │   ├── route.ts
│       │   ├── [id]/
│       │   └── clear/
│       ├── products/            # Product CRUD
│       │   └── route.ts
│       ├── uploadthing/         # File upload
│       └── user/
│
├── components/                  # Reusable UI components
│   ├── home/                    # ✨ Homepage-specific components
│   │   ├── HeroSection.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── FeaturedProducts.tsx
│   │   └── PromoSection.tsx
│   ├── product/                 # ✨ Product-related components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductImageGallery.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── SizeSelector.tsx
│   │   └── ProductActions.tsx
│   ├── cart/                    # ✨ Cart-specific components
│   │   ├── CartList.tsx
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   ├── EmptyCart.tsx
│   │   └── AddToCartButton.tsx
│   ├── shared/                  # ✨ Shared/reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PageHeader.tsx
│   │   └── Button.tsx
│   ├── admin/                   # Admin-specific components
│   │   ├── AdminGuard.tsx
│   │   ├── DataTable.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatsCard.tsx
│   │   └── LoadingSpinner.tsx
│   ├── auth/                    # Authentication components
│   │   ├── AuthModal.tsx
│   │   ├── AdminLoginModal.tsx
│   │   └── GlobalAuthModal.tsx
│   ├── modals/
│   │   └── UserInfoModal.tsx
│   └── ui/                      # UI primitives
│       ├── LoadingSpinner.tsx
│       └── LoadingProducts.tsx
│
├── lib/                         # Utility functions & services
│   ├── api/                     # ✨ Centralized data fetching
│   │   ├── products.ts          # Product API functions
│   │   └── cart.ts              # Cart API functions
│   ├── db.ts                    # Prisma client
│   ├── auth.ts                  # Auth utilities
│   ├── admin-auth.ts            # Admin auth
│   ├── jwt.ts                   # JWT utilities
│   ├── uploadthing.ts           # File upload config
│   └── utils.ts                 # Helper functions
│
├── actions/                     # Server actions
│   ├── products.ts              # Product server actions
│   └── admin/
│       ├── products.ts
│       ├── orders.ts
│       └── users.ts
│
├── store/                       # Zustand state management
│   ├── authStore.ts             # Authentication state
│   └── cartStore.ts             # Shopping cart state
│
├── prisma/                      # Database
│   ├── schema.prisma            # Database schema
│   ├── migrations/              # Migration history
│   └── generated/               # Generated Prisma client
│
├── types/                       # TypeScript definitions
│   └── product.ts
│
└── public/                      # Static assets
    ├── images/
    └── readme/
```

### 🏗️ Architecture Highlights

**✨ Feature-Based Organization**
- Components organized by feature (`home/`, `product/`, `cart/`)
- Shared components in `shared/` folder
- Clean separation of concerns

**⚡ Rendering Strategies**
- **ISR (Incremental Static Regeneration):** Homepage (1h), Products (5m)
- **CSR (Client-Side Rendering):** Cart, interactive components
- **SSR (Server-Side Rendering):** Admin dashboard

**🎯 Data Layer**
- Centralized API functions in `lib/api/`
- Type-safe data fetching with proper error handling
- Consistent data transformation (Prisma Decimal → number)

**🔄 State Management**
- **Zustand:** Client-side state (auth, cart)
- **Server Actions:** Mutations and server-side operations
- Minimal global state, prefer server state where possible


---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key"

# File Upload (UploadThing)
UPLOADTHING_TOKEN="your-uploadthing-token"

# Image Optimization (ImageKit)
IMAGEKIT_PUBLIC_KEY="public_your-key"
IMAGEKIT_PRIVATE_KEY="private_your-key"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your-id"

# Admin Access
ADMIN_MOBILE="8109537034"
ADMIN_NAME="ikshant"
ADMIN_CODE="ADMIN2024"

# Environment
NODE_ENV="development"
```

---

## ⚙️ Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)

### **1. Clone & Install**
```bash
git clone https://github.com/ikshantshukla123/logo.git
cd logo
npm install
```

### **2. Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed database (optional)
npx prisma db seed
```

### **3. Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

---

## 🏗️ Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🛡️ Admin Access

### **Admin Dashboard**
- **URL:** `/admin`
- **Mobile:** `8109537034`
- **Code:** `ADMIN2024`

The admin dashboard is protected with role-based authentication. Only users with `ADMIN` role can access admin routes.

### **Admin Features:**
- Product management (create, read, update, delete)
- Order processing and status updates
- User management and analytics
- Sales dashboard with key metrics

---

## 🔌 API Routes

### **Authentication**
- `POST /api/auth/admin-login` - Admin authentication
- `POST /api/auth/register` - User registration
- `GET /api/auth/check-user` - Verify user session

### **Products**
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### **Cart & Orders**
- `GET /api/cart` - Fetch user cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/[id]` - Remove item from cart
- `POST /api/cart/clear` - Clear cart

### **File Upload**
- `POST /api/uploadthing` - Handle file uploads

---

## 🗄️ Database Schema

### **Core Models**
```prisma
Product {
  id, name, description, price
  images[], sizes[]
  cartItems[], orderItems[]
}

User {
  id, name, email, mobile, role
  cartItems[], orders[]
}

Order {
  id, userId, totalAmount, status
  orderItems[]
}

CartItem {
  id, userId, productId, quantity, size
}
```

**Database:** PostgreSQL on Neon (serverless)  
**ORM:** Prisma with type-safe client generation

---

## 🚧 Future Improvements

- **Payment Integration** - Stripe/Razorpay for secure payments
- **Inventory Management** - Stock tracking and low-stock alerts  
- **Email Notifications** - Order confirmations and status updates
- **Advanced Analytics** - Detailed sales reports and customer insights
- **Product Reviews** - Customer rating and review system
- **Wishlist Feature** - Save products for later
- **Multi-language Support** - Internationalization (i18n)
- **PWA Support** - Progressive Web App capabilities
- **Advanced Search** - Filters, sorting, and faceted search

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`  
5. **Open Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Update documentation for new features

---



*Built with ❤️ using Next.js, TypeScript, and modern web technologies*
