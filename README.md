# 🏕️ YelpCamp

A full-stack web application where users can discover, create, and review campgrounds.

🚀 **Live Demo:**  
https://yelpcam-g6qy.onrender.com/

---

## 📌 Overview

YelpCamp is a dynamic web application that allows users to:

- Browse campgrounds created by others
- Add new campgrounds with images
- Edit and delete their own campgrounds
- Post reviews and ratings
- Register and log in securely

This project demonstrates full-stack development using Node.js, Express, MongoDB, and modern authentication techniques.

---

## ✨ Features

- 🔐 User Authentication (Register/Login/Logout)
- 🏕️ Create, Edit, Delete Campgrounds
- 📝 Add & Delete Reviews
- 📷 Image Upload using Cloudinary
- ⚡ Flash Messages for user feedback
- 🛡️ Security using Helmet & Data Sanitization
- 🌐 Fully responsive UI

---

## 🛠 Tech Stack

**Frontend**
- HTML
- CSS
- Bootstrap
- EJS (Embedded JavaScript)

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB (MongoDB Atlas)

**Authentication**
- Passport.js

**Cloud & Deployment**
- Cloudinary (Image Hosting)
- Render (Deployment)

---

## 📂 Project Structure

```
YelpCamp
│
├── models/          # Mongoose models
├── routes/          # Express routes
├── views/           # EJS templates
├── public/          # Static files (CSS, JS, Images)
├── utils/           # Custom utilities (errors, sanitization)
├── seeds/           # Database seed script
│
├── app.js           # Main application file
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository



### 2️⃣ Navigate to the project folder


### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Setup environment variables

Create a `.env` file and add:

```
DB_URL=your_mongodb_connection_string
SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
```

### 5️⃣ Run the app

```bash
node app.js
```

Visit:

```
http://localhost:5000
```

---

## 🌍 Deployment

This project is deployed on **Render**:

👉 https://yelpcam-g6qy.onrender.com/

---


---

## 🔒 Security Features

- Helmet for securing HTTP headers
- MongoDB Sanitization to prevent injection attacks
- Input validation using Joi
- Session-based authentication

---

## 👨‍💻 Author

**Umang Singhal**

- GitHub: https://github.com/umangsinghal7

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!

---

## 📜 License

This project is licensed under the MIT License.

---
