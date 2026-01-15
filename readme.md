# 🎓 Student Results Management Portal - Frontend

A modern, responsive web application for managing academic operations in educational institutions. Built with React, TypeScript, and Tailwind CSS, this application provides intuitive interfaces for administrators, lecturers, and students to manage courses, results, examinations, and academic records.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [User Roles & Access](#-user-roles--access)
- [Module Documentation](#-module-documentation)
- [Screenshots](#-screenshots)
- [Authentication Flow](#-authentication-flow)
- [State Management](#-state-management)
- [Component Library](#-component-library)
- [Scripts](#-scripts)
- [Contributing](#-contributing)

## ✨ Features

### 🔐 Multi-Role Authentication System
- **3-Step Authentication Flow** for students and lecturers
  - Step 1: Login with identifier and password
  - Step 2: Identity verification (DOB, Phone, JAMB/Staff ID)
  - Step 3: Mandatory password change on first login
- **Role-Based Access Control** (Admin, Lecturer, Student)
- **Persistent Sessions** with Redux Persist
- **Password Security** with validation and reuse prevention

### 👨‍💼 Admin Dashboard Features
- **Comprehensive Dashboard**
  - Total students, lecturers, courses, departments
  - Current academic session overview
  - Student distribution by department (Pie Chart)
  - Student enrollment by level (Bar Chart)
  
- **Course Management**
  - Create, view, edit, and delete courses
  - Filter by title, code, session, level, department
  - Course registration control (open/close)
  - Set registration deadlines and open dates
  - Track enrolled students per course
  
- **Department Management**
  - Create and manage departments
  - Assign Head of Department (HOD)
  - View department statistics (students, lecturers, courses)
  - Department-wise filtering across all modules
  - Student and course breakdowns by level
  
- **Lecturer Management**
  - Create lecturer profiles with comprehensive details
  - View lecturer statistics and performance
  - Assign courses to lecturers
  - Reset lecturer passwords
  - Track courses taught and results uploaded
  
- **Student Management**
  - Individual and bulk student creation
  - Student profile management
  - View academic records and CGPA
  - Filter by department, level, and status
  - Track course registrations
  
- **Results Management**
  - View all student results with advanced filtering
  - Single result entry
  - Bulk results upload (Excel/TXT)
  - Filter by session, semester, department, level
  - Download result templates
  - Export results (CSV/PDF)
  
- **Exam Management**
  - View all exams across departments
  - Filter by course, session, semester
  - Edit and delete exams
  - Toggle exam status (Active/Inactive)
  - Export exam lists
  
- **Academic Sessions**
  - Create and manage academic years
  - Set current active session
  - Close/reopen sessions
  - Track session dates and status

### 👨‍🏫 Lecturer Dashboard Features
- **Dashboard Overview**
  - Total students taught
  - Average GPA across courses
  - Overall pass rate
  - Total courses assigned
  - Grade distribution chart
  
- **My Students**
  - View all students across assigned courses
  - Filter by course, session, matric number
  - Add single results via dialog
  - Bulk upload results (Excel/TXT templates)
  - Edit and delete student results
  - View detailed student profiles with result history
  
- **Profile Management**
  - View and update personal information
  - Academic and professional details
  - Track total courses and students
  - View results upload statistics
  - Update profile photo
  - Change password
  
- **My Courses**
  - View all assigned courses
  - Filter by title, code, semester, session
  - Course detail pages with:
    - Enrolled students list
    - Pending results count
    - Pass rate and average score
    - Grade distribution chart
    - Student-wise result management
  
- **Exam Management**
  - Create exams for assigned courses
  - Add objective and theory questions
  - Bulk question upload (Excel/TXT)
  - Edit existing exams
  - Delete exams (if session not closed)
  - Set marks per question
  - Manage exam duration and instructions

### 👨‍🎓 Student Dashboard Features
- **Dashboard Overview**
  - Current CGPA display
  - Total credit units earned
  - Current level and session
  - Basic student information
  - Recent results snapshot
  
- **Profile**
  - Personal information
  - Academic profile
  - Contact information
  - System information
  - View registered courses
  
- **Results**
  - Cumulative CGPA
  - Results by session and semester
  - Grade-wise breakdown
  - Downloadable transcripts
  
- **Courses**
  - View all courses by session/semester
  - Course registration (when open)
  - View registered courses
  - Track course deadlines

## 🛠️ Tech Stack

### Core Technologies
- **React 19.1.1** - UI library
- **TypeScript 5.8.3** - Type safety and better DX
- **Vite 7.1.2** - Fast build tool and dev server
- **Tailwind CSS 4.1.13** - Utility-first CSS framework

### State Management
- **Redux Toolkit 2.9.1** - Global state management
- **Redux Persist 6.0.0** - Persist state across sessions
- **Zustand 5.0.8** - Lightweight state management for UI state
- **Redux Thunk 3.1.0** - Async action handling

### UI Components & Styling
- **shadcn/ui** - Accessible, customizable component library
- **Radix UI** - Headless UI primitives
  - Dialog, Dropdown Menu, Select, Tabs, Avatar
  - Accordion, Checkbox, Label, Popover, Progress
  - Separator, Slot, Toggle
- **Lucide React 0.542.0** - Icon library
- **React Icons 5.5.0** - Additional icon sets
- **Framer Motion 12.23.12** - Animation library
- **Tailwind Merge 3.3.1** - Merge Tailwind classes
- **Class Variance Authority 0.7.1** - Component variants
- **Tailwindcss Animate 1.0.7** - Animation utilities

### Forms & Validation
- **React Hook Form** (via @hookform/resolvers)
- **Zod 4.1.5** - TypeScript-first schema validation

### Data Visualization
- **Recharts 3.4.1** - Chart library for React

### Utilities
- **React Router DOM 7.8.2** - Client-side routing
- **React Toastify 11.0.5** - Toast notifications
- **Sonner 2.0.7** - Toast notification system
- **Date-fns 4.1.0** - Date utility library
- **React Day Picker 9.12.0** - Date picker component
- **React Paginate 8.3.0** - Pagination component
- **jsPDF 3.0.3** - PDF generation
- **jsPDF AutoTable 5.0.2** - PDF table generation

## 📁 Project Structure

```
src/
├── api/                        # API configuration and endpoints
│   ├── axios.ts               # Axios instance configuration
│   └── endpoints/             # API endpoint definitions
│       ├── admin.ts
│       ├── auth.ts
│       ├── lecturer.ts
│       └── student.ts
│
├── assets/                     # Static assets
│   ├── images/
│   └── icons/
│
├── components/                 # React components
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── ...
│   │
│   ├── common/                # Shared components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   └── ...
│   │
│   ├── admin/                 # Admin-specific components
│   │   ├── CourseForm.tsx
│   │   ├── DepartmentCard.tsx
│   │   ├── StudentTable.tsx
│   │   └── ...
│   │
│   ├── lecturer/              # Lecturer-specific components
│   │   ├── CourseCard.tsx
│   │   ├── ResultForm.tsx
│   │   ├── ExamBuilder.tsx
│   │   └── ...
│   │
│   └── student/               # Student-specific components
│       ├── ResultCard.tsx
│       ├── CourseList.tsx
│       └── ...
│
├── pages/                      # Page components
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── VerifyIdentity.tsx
│   │   └── ChangePassword.tsx
│   │
│   ├── admin/
│   │   ├── Dashboard.tsx
│   │   ├── Courses.tsx
│   │   ├── CourseDetails.tsx
│   │   ├── Departments.tsx
│   │   ├── DepartmentDetails.tsx
│   │   ├── Lecturers.tsx
│   │   ├── LecturerDetails.tsx
│   │   ├── Students.tsx
│   │   ├── StudentProfile.tsx
│   │   ├── Results.tsx
│   │   ├── Exams.tsx
│   │   └── Sessions.tsx
│   │
│   ├── lecturer/
│   │   ├── Dashboard.tsx
│   │   ├── MyStudents.tsx
│   │   ├── Profile.tsx
│   │   ├── MyCourses.tsx
│   │   ├── CourseDetails.tsx
│   │   └── Exams.tsx
│   │
│   └── student/
│       ├── Dashboard.tsx
│       ├── Profile.tsx
│       ├── Results.tsx
│       └── Courses.tsx
│
├── store/                      # Redux store
│   ├── store.ts               # Store configuration
│   ├── slices/                # Redux slices
│   │   ├── authSlice.ts
│   │   ├── userSlice.ts
│   │   ├── courseSlice.ts
│   │   └── ...
│   └── hooks.ts               # Custom Redux hooks
│
├── hooks/                      # Custom React hooks
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── ...
│
├── types/                      # TypeScript type definitions
│   ├── user.types.ts
│   ├── course.types.ts
│   ├── result.types.ts
│   └── ...
│
├── utils/                      # Utility functions
│   ├── gradeCalculations.ts
│   ├── formatters.ts
│   ├── validators.ts
│   ├── exportHelpers.ts
│   └── ...
│
├── lib/                        # Library configurations
│   └── utils.ts               # shadcn/ui utils
│
├── styles/                     # Global styles
│   ├── globals.css
│   └── tailwind.css
│
├── constants/                  # Application constants
│   ├── routes.ts
│   ├── permissions.ts
│   └── ...
│
├── App.tsx                     # Root component
├── main.tsx                    # Application entry point
└── vite-env.d.ts              # Vite type definitions
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd student-results-portal-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

The application will start on `http://localhost:5173` (or your configured port).

5. **Build for production**
```bash
npm run build
# or
yarn build
```

6. **Preview production build**
```bash
npm run preview
# or
yarn preview
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api/v1

# Application Configuration
VITE_APP_NAME="Student Results Portal"
VITE_APP_VERSION=1.0.0

# Feature Flags (optional)
VITE_ENABLE_BULK_UPLOAD=true
VITE_ENABLE_PDF_EXPORT=true
VITE_ENABLE_CHARTS=true
```

## 👥 User Roles & Access

### Admin (Full Access)
- **Permissions:** Full CRUD operations across all modules
- **Access:** All pages and features
- **Capabilities:**
  - Manage departments, courses, lecturers, students
  - Override closed sessions
  - Bulk operations
  - System-wide statistics
  - Course registration control
  - Exam oversight

### Lecturer (Course-Based Access)
- **Permissions:** Read, write, and delete within assigned courses
- **Access:** Personal profile, assigned courses, students, exams
- **Capabilities:**
  - View and manage assigned courses
  - Upload and edit results for their students
  - Create and manage exams
  - View course analytics
  - Update personal profile
- **Restrictions:**
  - Cannot modify closed session data
  - Cannot access other lecturers' courses
  - Cannot create courses or departments

### Student (Read-Only Access)
- **Permissions:** View-only access to personal data
- **Access:** Personal profile, courses, results
- **Capabilities:**
  - View personal academic records
  - Register for courses (when open)
  - View CGPA and results
  - Download transcripts
  - Update limited profile information
- **Restrictions:**
  - Cannot modify any academic data
  - Cannot view other students' information
  - Cannot access administrative features

## 📚 Module Documentation

### 🔐 Authentication Module

#### Login Flow
```typescript
1. User enters identifier and password
   ↓
2. System validates credentials
   ↓
3. Check if first login
   ↓
4a. First Login → Identity Verification
    - Students: DOB, Phone, JAMB Number
    - Lecturers: DOB, Phone, Staff ID
   ↓
5. Mandatory Password Change
   ↓
6. Redirect to role-based dashboard
```

**Features:**
- JWT token management
- Persistent login with Redux Persist
- Automatic token refresh
- Secure password validation
- Password reuse prevention

### 📊 Admin Dashboard

#### Overview Page
**Key Metrics:**
- Total students, lecturers, courses, departments
- Current academic session
- Quick action buttons

**Visualizations:**
- Student Distribution Pie Chart (by department)
- Student Enrollment Bar Chart (by level)

#### Course Management
**Features:**
- Create Course Dialog
  - Title, code, session, semester
  - Level, credit units
  - Department selection
  - Lecturer assignment (filtered by department)
  - Course type (Core/Elective/General)
  - Max students (optional)

**Course Table Columns:**
- Course title and code
- Department and faculty
- Lecturer name and email
- Level and semester
- Credit units
- Total registered students
- Status (Active/Inactive)
- Actions (View, Edit, Delete)

**Course Details Page:**
- Key course information
- Enrolled students list
- Registration control
  - Open/Close registration
  - Set open date and deadline
- Total enrollment count
- Protected deletion (if results/students exist)

#### Department Management
**Department Card:**
- Name, code, faculty
- HOD information
- Statistics (students, lecturers, courses)
- Active levels
- Action buttons (Edit, Delete, View Courses, View Details)

**Department Details Page:**
- Basic information
- HOD assignment
- Office location and contact
- Student breakdown by level
- Course breakdown by level
- Edit capability

**Create/Edit Department:**
- Name, code, faculty
- Description
- Contact phone
- Office location

#### Lecturer Management
**Lecturer Table:**
- Profile photo, name, staff ID
- Gender, rank, department
- Identifier and contact
- Specialization
- Status (Active/Pending/Suspended)
- Actions (View, Edit, Delete)

**Create Lecturer Form:**
- Personal: Full name, email, identifier, password
- Contact: Phone, gender, DOB, address
- Academic: Staff ID, department, rank
- Professional: Specialization, years of experience
- Education: Highest degree, institution
- Office: Location

**Lecturer Details Page:**
- Profile information
- Assigned courses with statistics
  - Course name, code, session
  - Total students
  - Average score
  - Results uploaded
- System status
  - Account activation
  - Login attempts
- Password reset button

#### Student Management
**Student Table:**
- Name and matric number
- Gender
- Program and department
- Identifier and contact
- Level (100-500)
- Status (Active/Inactive/Graduated/Suspended)
- Actions (View, Edit, Delete)

**Create Student Form:**
- Full name, email
- DOB, phone, gender
- Matric number, JAMB number
- Program, department
- Level (100-500)

**Student Profile Page:**
- Current CGPA
- Basic info (DOB, program, department, faculty, session)
- Contact information
- System information
- Registered courses (with "View All" dialog)
- Recent results (3 shown, "View All" redirects to results page)

#### Results Management
**Results Table:**
- Student name and matric number
- Department
- Level
- Contact
- Status (Active/Inactive)
- Actions (View)

**Filtering Options:**
- Name or matric number search
- Department
- Level
- Session

**Student Result Profile:**
- Student header (photo, name, matric, department)
- Contact details
- Current level and status
- Academic Results section
  - Session tabs (2024/2025, 2023/2024)
  - Semester tabs (First, Second)
  - Results table:
    - Code, Course Title
    - CA (0-40), Exam (0-60)
    - Total (0-100), Grade (A-F)
    - Actions (Edit, Delete)

**Actions:**
- Print transcript
- View full profile
- Add new result (+ Add Result button)
- Edit result (inline edit icon)
- Delete result (inline delete icon)

**Bulk Upload:**
- Download template (Excel/TXT)
- Select department and course
- Upload file
- View success/failure report

#### Exam Management
**Exam Table:**
- Exam title
- Course info (code, name)
- Duration (hours)
- Type (Objective/Theory/Mixed)
- Status (Active/Inactive)
- Actions (View, Edit, Delete)

**Filtering:**
- Search by name or code
- Session
- Department
- Course
- Reset filters

**Features:**
- View exam details
- Edit exam
- Toggle status (Active/Inactive)
- Delete exam
- Export list

#### Academic Sessions
**Session Cards:**
- Session year (2024/2025)
- Status badges (Current/Completed)
- Start and end dates
- Actions:
  - Edit (updates dates, status)
  - Lock/Unlock (closed sessions)
  - Delete (with safety checks)

**Create Session Dialog:**
- Session name (YYYY/YYYY format)
- Start date
- End date
- Set as current session (checkbox)
- Active status (checkbox)

### 👨‍🏫 Lecturer Dashboard

#### Overview Page
**Statistics Cards:**
- Total Students
- Average GPA
- Pass Rate
- Total Courses

**Grade Distribution Chart:**
- Bar/Pie chart showing grade breakdown
- Across all courses taught

#### My Students
**Results Table:**
- Student name and matric number
- Course
- Session
- CA, Exam, Total, Grade
- Actions (View, Edit, Delete)

**Filtering:**
- By name/matric number
- By academic session
- By course

**Actions:**
- Add Result (Dialog box with form)
- Bulk Upload Results
  - Download template (Excel/TXT)
  - Upload filled template
  - View upload report
- Edit Result (Inline or dialog)
- Delete Result
- View Student Profile (Redirects to detailed page)

#### Profile Page
**Sections:**

1. **Personal Information**
   - Photo
   - Name, email, phone
   - Gender, DOB, address

2. **Academic & Professional**
   - Rank, specialization
   - Highest degree, institution
   - Years of experience
   - Faculty

3. **Statistics**
   - Total courses
   - Total students
   - Total results uploaded

4. **Assigned Courses**
   - List of courses
   - Latest course highlighted
   - "Manage Course" button → redirects to course details

**Update Options:**
- Update profile photo
- Edit personal details
- Change password

#### My Courses
**Course Cards:**
- Course title and code
- Department
- Semester and session
- Credit units
- Total students enrolled
- "View Details" button

**Filtering:**
- Course title
- Course code
- Semester
- Session

**Course Details Page:**
- Course information header
- Statistics cards:
  - Total enrolled students
  - Pending results count
  - Pass rate
  - Average score

**Grade Distribution Chart**

**Enrolled Students Table:**
- Name and matric number
- Level
- Status
- Result status (Complete/Pending)
- Actions (View, Add Result)

**Students with Pending Results:**
- Highlighted list
- Quick add result action

#### Exams Page
**Exam Management:**

**Create Exam:**
- Course selection (from assigned courses)
- Exam title
- Exam type (Objective/Theory/Mixed)
- Duration (minutes)
- Total marks, passing marks
- Instructions

**Add Questions:**

*Single Question:*
- Question type (Objective/Theory)
- Question text
- Marks
- Options (for objective)
- Correct answer (for objective)
- Model answer (for theory)

*Bulk Upload:*
- Download question template
- Fill with questions
- Upload file
- Questions automatically added

**Edit/Delete:**
- Edit exam details
- Edit individual questions
- Delete questions
- Delete entire exam (if session not closed)

**Exam List:**
- Filter by course
- View exam details
- Edit existing exams
- Track exam status

### 👨‍🎓 Student Dashboard

#### Dashboard Overview
**Quick Stats:**
- Current CGPA (large, prominent)
- Total credit units earned
- Current level
- Current session

**Basic Information Card:**
- Name, matric number
- Department, program
- Email, phone

**Results Snapshot:**
- Recent 3-5 results
- Quick CGPA view
- "View All Results" button

#### Profile Page
**Sections:**

1. **Student Basic Information**
   - Program
   - Department
   - Faculty

2. **Academic Profile**
   - Current level
   - Current session
   - Academic advisor
   - Admission year
   - Academic status

3. **Personal Information**
   - University email
   - Gender
   - Address
   - State of origin
   - Phone
   - Date of birth
   - Place of birth

**Update Options:**
- Update contact information
- Update profile photo
- Change password

#### Results Page
**Header:**
- Cumulative CGPA (prominent display)
- Total courses completed
- Total credit units

**Results Organization:**

**By Session:**
- Session tabs (2024/2025, 2023/2024, etc.)

**By Semester:**
- Semester tabs (First Semester, Second Semester)

**Results Table:**
- Course code
- Course title
- Credit units
- CA (0-40)
- Exam (0-60)
- Total (0-100)
- Grade (A-F)
- Grade points

**Session Summary:**
- GPA for the session
- Total credit units for session
- Semester GPA breakdown

**Actions:**
- Print transcript
- Download results (PDF)
- Filter by session/semester

#### Courses Page
**Available Courses Section:**
(Only shown when registration is open)
- Unregistered courses for current level
- Course details (code, title, credit units, lecturer)
- Register button
- Registration deadline display

**Registered Courses:**
- Organized by session and semester
- Course cards showing:
  - Course code and title
  - Credit units
  - Lecturer name
  - Department
  - Semester
  - Status (Registered/Completed)

**Course Registration:**
- View available courses
- Register for courses (if open)
- Unregister from courses (before deadline)
- View registration deadline

**Actions:**
- Register for course (button)
- Unregister from course (button, if before deadline)
- View course details

## 📸 Screenshots

### Admin Interface

#### Academic Sessions Management
![Sessions Page](screenshot-reference-3)
- Create new academic sessions
- View current and past sessions
- Edit session details
- Close/reopen sessions
- Session status badges

#### Results Management
![Results Page](screenshot-reference-1)
- View all student results
- Filter by department, level, session
- Export options (CSV, PDF)
- Bulk upload functionality
- Student profile access

#### Exam Management
![Exams Page](screenshot-reference-4)
- View all exams
- Filter by course, session, department
- Exam status management
- Edit and delete options
- Action center dropdown

#### Student Profile & Results
![Student Profile](screenshot-reference-5)
- Comprehensive student information
- Academic results by session
- Semester-wise breakdown
- Grade visualization
- Quick actions (Print, Edit, Delete)

### Design Highlights

**Color Scheme:**
- Primary: Purple/Violet (#8B5CF6)
- Success: Green (#10B981)
- Warning: Yellow/Orange
- Error: Red
- Neutral: Gray scales

**UI Components:**
- Clean, modern card-based design
- Consistent spacing and typography
- Intuitive icon usage (Lucide React)
- Responsive tables with pagination
- Modal dialogs for forms
- Toast notifications for feedback
- Loading states and empty states

**Navigation:**
- Left sidebar with icon + text
- Top search bar
- User profile dropdown
- Breadcrumb navigation
- Quick action buttons

## 🔄 Authentication Flow

### Step 1: Login
```typescript
interface LoginRequest {
  identifier: string;  // Matric No/Email/Admin Secret
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    role: 'student' | 'lecturer' | 'admin';
    identifier: string;
  };
  nextStep: 'verification' | 'change-password' | 'dashboard';
  requiresVerification: boolean;
  requiresPasswordChange: boolean;
}
```

**Implementation:**
```typescript
// Login page component
const handleLogin = async (data: LoginRequest) => {
  const response = await api.post('/auth/login', data);
  
  if (response.requiresVerification) {
    navigate('/verify-identity');
  } else if (response.requiresPasswordChange) {
    navigate('/change-password');
  } else {
    navigate(`/${response.user.role}/dashboard`);
  }
};
```

### Step 2: Identity Verification
```typescript
interface VerifyIdentityRequest {
  dateOfBirth: string;     // YYYY-MM-DD
  phone: string;           // +234 XXX XXX XXXX
  jambNo?: string;         // For students (11 digits)
  staffId?: string;        // For lecturers
}
```

**Implementation:**
```typescript
const handleVerification = async (data: VerifyIdentityRequest) => {
  await api.post('/auth/verify-identity', data);
  
  if (response.requiresPasswordChange) {
    navigate('/change-password');
  } else {
    navigate(`/${user.role}/dashboard`);
  }
};
```

### Step 3: Password Change
```typescript
interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
```

**Password Requirements:**
- Minimum 6 characters
- Must not match previous passwords
- Must match confirmation

## 🏪 State Management

### Redux Store Structure

```typescript
interface RootState {
  auth: AuthState;
  user: UserState;
  courses: CoursesState;
  departments: DepartmentsState;
  results: ResultsState;
  sessions: SessionsState;
  ui: UIState;
}
```

### Auth Slice
```typescript
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  nextStep: 'verification' | 'change-password' | 'dashboard' | null;
}

// Actions
- login()
- logout()
- verifyIdentity()
- changePassword()
- refreshToken()
```

### User Slice
```typescript
interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// Actions
- fetchProfile()
- updateProfile()
- updatePhoto()
```

### Zustand Stores

**UI Store (Local State):**
```typescript
interface UIStore {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}
```

**Filter Store:**
```typescript
interface FilterStore {
  filters: Record<string, any>;
  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
}
```

### Redux Persist Configuration

```typescript
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user'], // Only persist auth and user
  blacklist: ['ui'], // Don't persist UI state
};
```

## 🎨 Component Library

### shadcn/ui Components Used

#### Form Components
- **Input** - Text inputs with validation
- **Select** - Dropdown selects
- **Checkbox** - Checkboxes with labels
- **Label** - Form labels
- **Dialog** - Modal dialogs
- **Popover** - Popover menus

#### Navigation
- **Tabs** - Tab navigation
- **Dropdown Menu** - Action menus
- **Separator** - Visual separators

#### Feedback
- **Progress** - Progress bars
- **Toast** (via react-toastify) - Notifications

#### Display
- **Avatar** - User avatars
- **Card** - Content cards
- **Table** - Data tables
- **Accordion** - Collapsible sections

### Custom Components

#### LoadingSpinner
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}
```

#### EmptyState
```typescript
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

#### StatCard
```typescript
interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}
```

#### DataTable
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  pagination?: boolean;
  onRowClick?: (row: T) => void;
}
```

## 📜 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code with ESLint

# Type Checking
tsc --noEmit        # Check TypeScript types

# Production
npm run build && npm run preview
```

## 🎯 Key Features Implementation

### Bulk Upload System

**Template Generation:**
```typescript
// Download template endpoint
const downloadTemplate = (format: 'excel' | 'txt') => {
  const url = `/admin/students/template/${format}`;
  // Trigger download
};
```

**Upload Processing:**
```typescript
interface BulkUploadResponse {
  success: boolean;
  successCount: number;
  failedCount: number;
  success: Array<CreatedRecord>;
  failed: Array<{
    data: any;
    error: string;
  }>;
}

// Display results in toast/modal
const handleBulkUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('department', selectedDepartment);
  
  const response = await api.post('/admin/students/bulk', formData);
  
  // Show success/failure report
  showBulkUploadResults(response.data);
};
```

### Grade Calculation

```typescript
// Grade calculation utility
const calculateGrade = (total: number): string => {
  if (total >= 70) return 'A';
  if (total >= 60) return 'B';
  if (total >= 50) return 'C';
  if (total >= 45) return 'D';
  if (total >= 40) return 'E';
  return 'F';
};

const calculateGradePoint = (grade: string): number => {
  const gradePoints: Record<string, number> = {
    'A': 5.0, 'B': 4.0, 'C': 3.0,
    'D': 2.0, 'E': 1.0, 'F': 0.0
  };
  return gradePoints[grade] || 0;
};

// CGPA calculation
const calculateCGPA = (results: Result[]): number => {
  const totalPoints = results.reduce((sum, result) => {
    const gradePoint = calculateGradePoint(result.grade);
    return sum + (gradePoint * result.course.creditUnit);
  }, 0);
  
  const totalCredits = results.reduce((sum, result) => 
    sum + result.course.creditUnit, 0
  );
  
  return totalPoints / totalCredits;
};
```

### Chart Implementation

```typescript
// Using Recharts
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';

// Student distribution by department
const DepartmentPieChart = ({ data }) => {
  const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];
  
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

// Grade distribution bar chart
const GradeDistributionChart = ({ data }) => (
  <BarChart width={600} height={300} data={data}>
    <XAxis dataKey="grade" />
    <YAxis />
    <Bar dataKey="count" fill="#8B5CF6" />
  </BarChart>
);
```

### PDF Export

```typescript
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const exportToPDF = (data: Result[], studentInfo: Student) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('Student Transcript', 105, 20, { align: 'center' });
  
  // Student info
  doc.setFontSize(12);
  doc.text(`Name: ${studentInfo.name}`, 20, 40);
  doc.text(`Matric No: ${studentInfo.matricNo}`, 20, 50);
  doc.text(`CGPA: ${studentInfo.cgpa}`, 20, 60);
  
  // Results table
  autoTable(doc, {
    startY: 70,
    head: [['Course Code', 'Course Title', 'CA', 'Exam', 'Total', 'Grade']],
    body: data.map(result => [
      result.course.code,
      result.course.title,
      result.ca,
      result.exam,
      result.total,
      result.grade
    ]),
  });
  
  doc.save(`transcript-${studentInfo.matricNo}.pdf`);
};
```

### Form Validation with Zod

```typescript
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Course creation schema
const courseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  code: z.string().regex(/^[A-Z]{3}\d{3}$/, 'Invalid course code format'),
  creditUnit: z.number().min(1).max(6),
  level: z.enum(['100', '200', '300', '400', '500']),
  semester: z.enum(['First', 'Second']),
  department: z.string().min(1, 'Department is required'),
  lecturer: z.string().min(1, 'Lecturer is required'),
});

// Usage in component
const CourseForm = () => {
  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      code: '',
      creditUnit: 3,
      // ...
    }
  });
  
  const onSubmit = async (data: z.infer<typeof courseSchema>) => {
    await createCourse(data);
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

## 🔍 Advanced Filtering

```typescript
// Filter hook
const useTableFilters = () => {
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    level: '',
    session: '',
    status: '',
  });
  
  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const clearFilters = () => {
    setFilters({
      search: '',
      department: '',
      level: '',
      session: '',
      status: '',
    });
  };
  
  return { filters, updateFilter, clearFilters };
};

// Usage
const StudentsList = () => {
  const { filters, updateFilter, clearFilters } = useTableFilters();
  
  const filteredStudents = students.filter(student => {
    if (filters.search && !student.name.includes(filters.search)) return false;
    if (filters.department && student.department !== filters.department) return false;
    if (filters.level && student.level !== filters.level) return false;
    return true;
  });
  
  return (
    <div>
      <FilterBar 
        filters={filters} 
        onFilterChange={updateFilter}
        onClear={clearFilters}
      />
      <DataTable data={filteredStudents} />
    </div>
  );
};
```

## 🚦 Route Protection

```typescript
// Protected route component
const ProtectedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: ReactNode;
  allowedRoles: UserRole[];
}) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!allowedRoles.includes(user.role)) {
      navigate('/unauthorized');
    }
  }, [isAuthenticated, user, navigate]);
  
  return isAuthenticated && allowedRoles.includes(user.role) 
    ? <>{children}</> 
    : null;
};

// Route configuration
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/verify-identity" element={<VerifyIdentity />} />
    
    {/* Admin routes */}
    <Route path="/admin/*" element={
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    }>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="courses" element={<CoursesPage />} />
      {/* ... */}
    </Route>
    
    {/* Lecturer routes */}
    <Route path="/lecturer/*" element={
      <ProtectedRoute allowedRoles={['lecturer']}>
        <LecturerLayout />
      </ProtectedRoute>
    }>
      <Route path="dashboard" element={<LecturerDashboard />} />
      {/* ... */}
    </Route>
    
    {/* Student routes */}
    <Route path="/student/*" element={
      <ProtectedRoute allowedRoles={['student']}>
        <StudentLayout />
      </ProtectedRoute>
    }>
      <Route path="dashboard" element={<StudentDashboard />} />
      {/* ... */}
    </Route>
  </Routes>
);
```

## 🎨 Theming & Styling

### Tailwind Configuration

```typescript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          50: '#F5F3FF',
          100: '#EDE9FE',
          // ... other shades
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### Custom Utility Functions

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  'base-class',
  isActive && 'active-class',
  customClass
)}>
```

## 🔄 API Integration

### Axios Configuration

```typescript
// api/axios.ts
import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/slices/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### API Endpoints Structure

```typescript
// api/endpoints/admin.ts
export const adminAPI = {
  // Students
  getStudents: (params?: FilterParams) => 
    api.get('/admin/students', { params }),
  createStudent: (data: CreateStudentDTO) => 
    api.post('/admin/students', data),
  bulkCreateStudents: (formData: FormData) => 
    api.post('/admin/students/bulk', formData),
  
  // Courses
  getCourses: (params?: FilterParams) => 
    api.get('/admin/courses', { params }),
  createCourse: (data: CreateCourseDTO) => 
    api.post('/admin/courses', data),
  
  // ... other endpoints
};
```

## 🧪 Testing Guidelines

### Component Testing
```typescript
// Example test structure (not implemented yet)
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('LoginPage', () => {
  it('renders login form', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByLabelText(/identifier/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
```

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

**Output:**
- Optimized bundle in `dist/` directory
- Tree-shaken dependencies
- Minified CSS and JavaScript
- Source maps for debugging

### Deployment Checklist
- [ ] Update environment variables
- [ ] Test production build locally (`npm run preview`)
- [ ] Verify API endpoints are correct
- [ ] Check authentication flow
- [ ] Test bulk upload features
- [ ] Verify PDF export functionality
- [ ] Test on multiple browsers
- [ ] Check mobile responsiveness
- [ ] Verify charts render correctly
- [ ] Test all user roles

### Hosting Options
- **Vercel** - Recommended for easy deployment
- **Netlify** - Good alternative with CI/CD
- **AWS S3 + CloudFront** - For enterprise
- **Nginx** - For self-hosting

### Environment-Specific Configurations

**Development:**
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

**Staging:**
```env
VITE_API_BASE_URL=https://staging-api.yourapp.com/api/v1
```

**Production:**
```env
VITE_API_BASE_URL=https://api.yourapp.com/api/v1
```

## 🐛 Common Issues & Solutions

### Issue: CORS Errors
**Solution:** Ensure backend has proper CORS configuration
```javascript
// Backend should have
cors({
  origin: ['http://localhost:5173', 'https://yourapp.com'],
  credentials: true
})
```

### Issue: Authentication Token Expires
**Solution:** Implement token refresh mechanism
```typescript
// Add refresh token logic in axios interceptor
```

### Issue: Large Bundle Size
**Solution:** Use code splitting and lazy loading
```typescript
const AdminRoutes = lazy(() => import('./pages/admin'));
const LecturerRoutes = lazy(() => import('./pages/lecturer'));
```

### Issue: Slow Initial Load
**Solution:** Optimize imports and use dynamic imports
```typescript
// Instead of
import { Button, Dialog, Select } from '@/components/ui';

// Use
import Button from '@/components/ui/button';
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Code Style
- Use TypeScript for all new files
- Follow existing component structure
- Use meaningful variable and function names
- Add comments for complex logic
- Use Prettier for formatting

### Pull Request Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test thoroughly
5. Commit with descriptive messages
6. Push to your branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Commit Message Format
```
type(scope): subject

body

footer
```

**Types:** feat, fix, docs, style, refactor, test, chore

**Example:**
```
feat(student): add course registration deadline warning

- Display warning 3 days before deadline
- Show countdown timer
- Add visual indicator on course cards

Closes #123
```

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Development Team

**Frontend Developer:** Michael

## 🙏 Acknowledgments

- React team for the excellent library
- shadcn/ui for the beautiful component library
- Radix UI for accessible primitives
- Tailwind CSS for the utility-first framework
- All contributors and maintainers

## 📞 Support & Contact

For support or questions:
- Open an issue in the repository
- Contact the development team
- Check the documentation

---

## 🚀 Quick Start Recap

```bash
# 1. Clone and install
git clone <repository-url>
cd student-results-portal-frontend
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your API URL

# 3. Start development
npm run dev

# 4. Build for production
npm run build
npm run preview
```

**Default Credentials (Development):**
- Admin: Use admin secret from backend
- Lecturer: Use email provided by admin
- Student: Use matric number provided by admin

---

**Note:** This application requires the backend API to be running. See the [Backend README](../backend/README.md) for setup instructions.

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Status:** Production Ready 🚀