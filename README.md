# Suraj Dhawal Portfolio

A modern, responsive portfolio website showcasing my journey as an aspiring software developer. Built with a full-stack architecture featuring real-time contact form submissions, admin dashboard, and interactive animations.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with glassmorphism UI using Tailwind CSS
- **Interactive Animations**: GSAP-powered scroll animations and particle effects
- **Real-time Updates**: Socket.IO integration for live contact form submissions
- **Admin Dashboard**: Secure authentication system with JWT and MySQL
- **Contact Management**: Form submissions stored in database with admin panel
- **Project Showcase**: Dynamic project filtering and modal details
- **Skills Visualization**: Animated skill bars and progress indicators
- **Multi-page Architecture**: Public portfolio and protected admin area

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - Database management
- **Socket.IO** - Real-time communication
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **dotenv** - Environment variables

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with Tailwind CSS
- **JavaScript (ES6+)** - Interactivity
- **GSAP** - Animations
- **Swiper** - Carousel/slider
- **Font Awesome** - Icons

### Development Tools
- **Tailwind CSS** - Utility-first CSS framework
- **Nodemon** - Development server
- **Git** - Version control

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dev-Suraj-Dhawal/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASS=your_mysql_password
   DB_NAME=portfolio_db
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   PORT=3000
   ```

4. **Database Setup**
   - Create a MySQL database named `portfolio_db`
   - Run the following SQL to create tables:

   ```sql
   -- Contacts table
   CREATE TABLE contacts (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Admins table
   CREATE TABLE admins (
     id INT AUTO_INCREMENT PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Build CSS**
   ```bash
   npm run build
   ```

## 🚀 Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Admin Access
- Navigate to the Dashboard link on the portfolio
- Login with admin credentials
- View and manage contact form submissions

## 📁 Project Structure

```
portfolio/
├── server.js                 # Main server file
├── package.json             # Dependencies and scripts
├── .env                     # Environment variables
├── data.json                # Contact form backup
├── public/                  # Static files
│   ├── index.html           # Main portfolio page
│   ├── ven.html             # Admin dashboard (protected)
│   ├── css/
│   │   ├── style.css        # Custom styles
│   │   └── input.css        # Tailwind input
│   ├── js/
│   │   ├── logic.js         # Main portfolio logic
│   │   ├── login-modal.js   # Authentication modal
│   │   └── admin.js         # Admin dashboard logic
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── admin.js         # Admin API routes
│   ├── assets/              # Images and media
│   └── portfolio-data.json  # Portfolio content data
├── private/                 # Protected pages
│   └── ven.html             # Admin dashboard
└── README.md               # This file
```

## 🔐 Authentication

The admin system uses:
- JWT tokens stored in HTTP-only cookies
- bcrypt password hashing
- Protected routes with middleware
- Session verification

## 📊 Database Schema

### Contacts Table
- `id` - Primary key
- `name` - Contact name
- `email` - Contact email
- `message` - Contact message
- `created_at` - Timestamp

### Admins Table
- `id` - Primary key
- `email` - Admin email (unique)
- `password_hash` - Hashed password
- `created_at` - Timestamp

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Suraj Dhawal**
- Email: surajdhawal115@gmail.com
- LinkedIn: [Suraj Dhawal](https://www.linkedin.com/in/suraj-dhawal-25055a2a5/)
- GitHub: [Dev-Suraj-Dhawal](https://github.com/Dev-Suraj-Dhawal)

## 🙏 Acknowledgments

- GSAP for smooth animations
- Tailwind CSS for rapid styling
- Socket.IO for real-time features
- Font Awesome for icons
- All contributors and supporters

---

⭐ Star this repo if you found it helpful!
