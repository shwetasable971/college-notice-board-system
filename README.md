College Notice Board System
A full-stack College Notice Board System built using React, Node.js, Express, and MongoDB.
The application allows administrators to create and manage college notices while students can easily view important announcements in one place.
This system helps in digitalizing the traditional college notice board, making notices accessible anytime and from anywhere.

Features
Create new notices
View all notices
Update existing notices
Delete notices
Auto-expire notices based on expiry date
Priority based pinned notices
Search notices by title
Filter notices by category
Display notice status (Active / Expired)
Responsive and user-friendly interface

Tech Stack
Frontend
React.js
Tailwind CSS
DaisyUI
React Router
Axios
React Hot Toast

Backend
Node.js
Express.js

Database
MongoDB
Mongoose

Project Structure
Frontend
HomePage.jsx → Displays all notices
CreatePage.jsx → Form to create new notices
NoticeDetailPage.jsx → View, update, and delete a specific notice
NoticeCard.jsx → Displays individual notice information
Navbar.jsx → Navigation bar
NoticeNotFound.jsx → Displayed when no notices are available
Backend
Models → Notice Schema
Controllers → Notice CRUD operations
Routes → API endpoints

Notice Schema
Each notice contains the following fields:
title (String)
description (String)
department (String) 
priority (High | Medium | Low)
publishDate (Date)
status (Active | Expired | draft)
expiryDate (Date)
postedBy (String)
createdAt (Date - auto generated)
updatedAt (Date - auto geneated)

API Endpoints
Method
Endpoint
Description
GET
/notices
Get all notices
GET
/notices/:id
Get single notice
POST
/notices
Create new notice
PUT
/notices/:id
Update notice
DELETE
/notices/:id
Delete notice

Backend Setup
cd backend
npm install
npm run dev

Frontend Setup
cd frontend
npm install
npm run dev

How Main Features Work
Auto Expire Notices
Notices automatically change their status to Expired when the expiry date passes. This ensures that outdated information is not displayed to users.

Priority Based Pinned Notices
Important notices can be marked with High Priority, which ensures they appear at the top of the notice list.

Searching Notices
Users can search notices by title using a case-insensitive search function.

Filtering Notices
Notices can be filtered by category to quickly find relevant announcements.
Conclusion
The College Notice Board System is a full-stack MERN application that demonstrates CRUD operations, REST API integration, and a responsive UI design.
It provides an efficient digital solution for managing and viewing college notices.

Conclusion
The College Notice Board System is a full-stack MERN application that demonstrates CRUD operations, REST API integration, and a responsive UI design.
It provides an efficient digital solution for managing and viewing college notices.
