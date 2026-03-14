# 📔 ContactBook Pro | Fullstack JavaScript Application

A robust contact management system built with the **Node.js ecosystem**. This project demonstrates a complete **CRUD** flow, implementing a decoupled **MVC (Model-View-Controller)** architecture and RESTful principles.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** Vanilla JavaScript (ES6+), Webpack, Babel
- **Templating Engine:** EJS (Embedded JavaScript templates)
- **Styling:** CSS3 (Flexbox & Grid)
- **Database:** MongoDB (via Mongoose)

## 🏗️ Architectural Overview

The project is structured to separate concerns, ensuring scalability and maintainability:

- **Models:** Handles data logic, schema validation, and database communication.
- **Views:** Dynamic UI rendering using EJS and client-side assets bundled with Webpack.
- **Controllers:** Orchestrates the flow between the user interface and the data models.
- **Middlewares:** Global security layers, session handling, and flash message management.



[Image of MVC architecture for web applications]


## 🚀 Key Features

- **Full CRUD:** Create, Read, Update, and Delete contacts with ease.
- **Authentication:** Secure login/signup system with session persistence.
- **Server-side Validation:** Robust data integrity checks to prevent invalid entries.
- **CSRF Protection:** Security middleware to prevent Cross-Site Request Forgery.
- **Responsive Design:** Aesthetic and functional UI across different device sizes.

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/DaviGGC/project_contact_book.git](https://github.com/DaviGGC/project_contact_book.git)

2. **Install dependencies:**
   npm install

3. **Configure Environment Variables:**
Create a .env file and add your MongoDB connection string:
   CONNECTIONSTR=your_mongodb_uri_here

4. **Run the application:**
   npm start
