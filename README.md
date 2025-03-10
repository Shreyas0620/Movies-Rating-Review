# Movies Rating App

Welcome to the **Movies Rating App**! This project is a full-stack application that allows users to browse, rate, and review movies. It consists of a frontend (`movie-app`) built with React and a backend (`Server`) built with Node.js and Express.

---

## Features

- **Browse Movies**: View a list of movies with details like title, description, and rating.
- **Rate Movies**: Users can rate movies on a scale of 1 to 5.
- **User Authentication**: Secure user registration and login.
- **Admin Panel**: Admins can add, update, or delete movies.
- **Responsive Design**: The app is fully responsive and works on all devices.

---

## Technologies Used

### Frontend (`movie-app`)
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Redux**: For state management.
- **Axios**: For making HTTP requests to the backend.

### Backend (`Server`)
- **Node.js**: A JavaScript runtime for building the server.
- **Express**: A web framework for Node.js.
- **MongoDB**: A NoSQL database for storing movie and user data.
- **JWT**: For user authentication and authorization.
- **AWS S3**: For storing movie posters and other media files.

---

## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. Download it from [here](https://nodejs.org/).
- **MongoDB**: Install MongoDB locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **AWS S3**: Set up an S3 bucket for storing media files 

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/movies-rating.git
   cd movies-rating
   
2 . **Set up the backend:**
Navigate to the Server folder:
cd Server
**Install dependencies:**
npm install
Create a .env file in the Server folder and add your environment variables:

plaintext
Copy
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_s3_bucket_name
AWS_REGION=your_s3_bucket_region

**Start the server:**
npm start
Set up the frontend:

Navigate to the movie-app folder:
cd ../movie-app
**Install dependencies:**
npm install
Create the public folder:

If the public folder is not included in the repository, create it manually:
mkdir public
Add the following subfolders and files to the public folder:

public/
├── images/       # For storing static images
├── vids/         # For storing static videos
├── favicon.png   # Favicon for the app
├── index.html    # HTML template for React
└── manifest.json # PWA manifest file

**Start the development server:**
npm start

**Let me know if you need further assistance!**
