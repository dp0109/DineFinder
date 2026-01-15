# DineFinder - Restaurant Recommendation & Reservation System

DineFinder is a full-stack web application designed to help users discover top restaurants, filter them by cuisine and location, and make table reservations seamlessly.

---

## Features

* Restaurant Discovery: Browse a collection of 1000+ restaurants.
* Advanced Filtering: Filter restaurants by location, cuisine, rating, and price range.
* Authentication: Secure sign up and login system using JWT.
* Smart Booking: Real-time table reservation with instant confirmation modal.
* My Bookings Dashboard: Dedicated area to view, update, or cancel reservations.
* Interactive UI: Smooth animations, responsive design, and intuitive navigation.
* Real Data: Integrated with Google Maps for location visualization.

---

## Technology Stack

### Frontend

* React.js
* Tailwind CSS
* Framer Motion
* Lucide Icons

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose ODM)

### Authentication

* JSON Web Tokens (JWT)
* bcryptjs

---
## GUI

<img width="1915" height="1003" alt="Screenshot 2026-01-14 141337" src="https://github.com/user-attachments/assets/d39edbfb-1acd-4dcb-b7d6-642740d7e0d1" />
--
<img width="1913" height="1001" alt="Screenshot 2026-01-14 141351" src="https://github.com/user-attachments/assets/4872fe42-16ea-4873-a65e-ba56726f8541" />
--
<img width="1917" height="1000" alt="Screenshot 2026-01-14 141422" src="https://github.com/user-attachments/assets/dea20eae-ef0d-4103-8dbe-2007b35bbcb2" />
--
<img width="1914" height="1000" alt="Screenshot 2026-01-14 141451" src="https://github.com/user-attachments/assets/5e2f94f6-fdb8-44c5-a3c9-fd166c13acea" />
--
<img width="1917" height="1002" alt="Screenshot 2026-01-14 141513" src="https://github.com/user-attachments/assets/28a6ee34-8ca7-4112-a4b3-a7de599f67d5" />
---
## Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites

* Node.js (v14+)
* MongoDB (Local or Atlas)

---

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/restaurant_app
JWT_SECRET=your_secret_key
```

Seed the database with 1000+ restaurants:

```bash
node data/megaSeed.js
```

Start the server:

```bash
npm start
```

The server will run on `http://localhost:5000`.

---

### 2. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm run dev
```

The application will run on `http://localhost:5173`.

---

## Usage

1. Open the frontend URL.
2. Browse the curated list of restaurants.
3. Filter using quick filters or the detailed filter bar.
4. Register or log in to unlock booking features.
5. Select a restaurant, view details, and book a table.

---

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License.
