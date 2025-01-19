# Twitter Clone - MERN Stack

A fully functional Twitter Clone built using the MERN stack (MongoDB, Express, React, and Node.js). This application replicates core features of Twitter, such as posting tweets, following users, liking tweets, and more, providing a seamless social media experience.

## Live link - https://twitter-clone-mern-j4di.onrender.com/


---

## Features

- User Authentication: Sign up, log in, and secure authentication using `bcryptjs` and `jsonwebtoken`.
- Real-time data fetching and updates using `@tanstack/react-query`.
- Media Uploads: Upload profile pictures and tweets with images using `Cloudinary`.
- Responsive Design: Styled with `TailwindCSS` for a sleek and modern UI.
- Routing: Navigate seamlessly with `react-router-dom`.
- Notifications: Toast notifications using `react-hot-toast`.
- Protected Routes: Secure access to pages using `cookie-parser`.
- Backend: Scalable REST API built with `Express` and connected to `MongoDB` using `Mongoose`.
- Cross-Origin Resource Sharing enabled with `cors` for frontend-backend communication.

---

## Tech Stack

**Frontend:**
- React
- TailwindCSS
- React Icons
- React Router DOM
- React Hot Toast
- @tanstack/react-query

**Backend:**
- Node.js
- Express
- MongoDB (via Mongoose)
- Cloudinary
- bcryptjs
- JSON Web Tokens
- dotenv
- cookie-parser

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn
- MongoDB

### Clone the Repository
```bash
git clone https://github.com/your-username/twitter-clone.git
cd twitter-clone
```

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```

4. Access the application at `http://localhost:3000`.

---

## Folder Structure
```plaintext
twitter-clone/
|-- backend/
|   |-- models/        # Mongoose models
|   |-- routes/        # Express routes
|   |-- controllers/   # Logic for routes
|   |-- middleware/    # Middleware functions
|   |-- server.js      # Entry point
|-- frontend/
|   |-- src/
|       |-- components/   # Reusable components
|       |-- pages/        # Page components
|       |-- context/      # React context
|       |-- App.js        # Main App component
|-- .env
|-- package.json
```

---

## Scripts

### Backend
- **Start server:** `npm start`
- **Dev mode:** `npm run dev`

### Frontend
- **Start React app:** `npm start`

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request for review.

---

## Contact
For any questions or feedback, feel free to reach out:
- Email: mtm.kcs@gmail.com
- GitHub: [[your-username](https://github.com/your-username)](https://github.com/mohan7401647399)

---

Happy Coding!
