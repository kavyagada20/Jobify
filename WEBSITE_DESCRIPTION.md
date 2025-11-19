# Jobify - Job Tracking Application

## What is Jobify?

**Jobify** is a comprehensive, full-stack job application tracking platform designed to help job seekers organize, manage, and analyze their job search journey. It's a modern web application built with Next.js 14, TypeScript, and a complete authentication and database system.

---

## Core Features

### 1. **Job Application Management**
   - **Add Job Applications**: Create new job entries with details like:
     - Position/Job Title
     - Company Name
     - Location
     - Application Date
     - Job Status (Pending, Interview, Declined)
     - Job Mode (Full-time, Part-time, Internship)
     - Notes (for interview prep, follow-ups, reminders)
   
   - **View All Jobs**: Browse all your job applications in a clean, card-based layout
   
   - **Edit Jobs**: Update job details and status as your application progresses
   
   - **Delete Jobs**: Remove applications that are no longer relevant

### 2. **Search & Filter Functionality**
   - **Search by Company/Position**: Quickly find specific job applications
   - **Filter by Status**: View only pending, interview, or declined applications
   - **Real-time Search**: Instant results as you type

### 3. **Dashboard & Analytics**
   - **Statistics Overview**: See counts of:
     - Pending applications
     - Interviews scheduled
     - Declined applications
   
   - **Charts & Visualizations**: Track your application trends over time
   - **Progress Tracking**: Visual representation of your job search progress

### 4. **User Authentication & Security**
   - **Secure Sign-In**: Powered by Clerk authentication
   - **User Sessions**: Secure session management
   - **Personal Data**: Each user's jobs are private and isolated

### 5. **Role-Based Access Control**
   - **Three User Roles**:
     - **Admin**: Can manage products, set user roles, full access
     - **User**: Can manage their own jobs, view products (read-only)
     - **Guest**: Limited access (not signed in)
   
   - **Protected Routes**: Different access levels for different features
   - **Admin Panel**: Manage user roles and system settings

### 6. **Product Catalog (Admin Feature)**
   - **View Products**: Browse available job tracking tools and features
   - **Manage Products** (Admin only): Create, edit, and delete products
   - **Product Details**: View detailed information about each product

### 7. **Responsive Design**
   - **Mobile-Friendly**: Works seamlessly on phones, tablets, and desktops
   - **Dark/Light Mode**: Toggle between themes for comfortable viewing
   - **Consistent UI**: Reusable layout components ensure a polished experience

---

## Technical Architecture

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Modern, responsive styling
- **shadcn/ui**: Beautiful, accessible UI components
- **React Query**: Efficient data fetching and caching
- **React Hook Form + Zod**: Form validation

### Backend
- **Next.js API Routes**: RESTful API endpoints
- **Prisma ORM**: Database management
- **SQLite Database**: Local development database (can be switched to PostgreSQL/MongoDB)
- **Server Actions**: Type-safe server-side operations

### Authentication
- **Clerk**: Complete authentication solution
- **Session Management**: Secure user sessions
- **Role Management**: Database-backed role system

---

## User Workflow

### For Job Seekers (Regular Users):

1. **Sign Up/Sign In**: Create an account or log in
2. **Add Job Application**: Click "Add Job" and fill in details
3. **Track Applications**: View all jobs on the "Find Jobs" page
4. **Update Status**: Change status as you progress (Pending → Interview → Offer/Declined)
5. **Add Notes**: Keep track of interview questions, follow-ups, etc.
6. **View Statistics**: Check your dashboard for application metrics
7. **Search & Filter**: Quickly find specific applications

### For Administrators:

1. **Access Admin Panel**: Navigate to the Admin section
2. **Manage User Roles**: Set users as admin, user, or guest
3. **Manage Products**: Create, edit, and delete products in the catalog
4. **View System Data**: Access all system information

---

## Navigation Structure

### Public Pages (Not Signed In):
- **Home**: Landing page with app overview
- **Sign In**: Authentication page

### Authenticated Pages (Signed In):
- **Add Job**: Create new job application
- **Find Jobs**: Search and browse all job applications (with search/filter)
- **Stats**: View analytics and charts
- **Admin**: Manage roles and system settings (if admin)

### Sidebar Navigation (Dashboard):
- Add Job
- Find Jobs (with search functionality)
- Stats
- Admin

---

## Key Benefits

1. **Organization**: Keep all job applications in one place
2. **Tracking**: Never lose track of where you applied
3. **Analytics**: Understand your job search patterns
4. **Efficiency**: Quick search and filter capabilities
5. **Security**: Your data is private and secure
6. **Flexibility**: Works on any device, any time

---

## Database Models

- **Job**: Stores job application details
- **UserProfile**: Manages user roles and account info
- **Product**: Product catalog (for admin features)

---

## Current Status

✅ Job creation, editing, deletion  
✅ Search and filter functionality  
✅ Statistics and analytics  
✅ User authentication  
✅ Role-based access control  
✅ Responsive design  
✅ Dark/Light mode  
✅ Admin panel  
✅ Product management (admin)

---

This is a production-ready job tracking application that helps job seekers stay organized and make data-driven decisions in their job search journey.

