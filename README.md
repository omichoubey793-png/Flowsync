# FlowSync - Creative Space 🚀

A modern digital experience and aesthetic creative platform inspired by Pinterest.

## Live Deployments 🔗

- **Frontend Website:** [https://flowsync-rho.vercel.app](https://flowsync-rho.vercel.app)
- **Backend API Server:** [https://flowsync-cfu5.onrender.com](https://flowsync-cfu5.onrender.com)

---

## Tech Stack 🛠️

- **Frontend:** React, Vite, TailwindCSS, Framer Motion, Axios, Lucide React
- **Backend:** Node.js, Express, MongoDB (Mongoose), AWS S3 (Multer-S3)
- **Hosting:** Vercel (Frontend), Render (Backend)

---

## Features ✨

1. **Full-screen Image Preview Modal:** Click any image to view it full-screen along with details like title, description, tags, upload date, and owner.
2. **Metadata Cards:** Displays tags, formatted upload date, and owner's name directly on cards.
3. **AWS S3 File Upload:** Uploads and hosts images directly on AWS S3 storage.
4. **Owner-Only Deletions:** Authenticated owners of pins can safely delete their pins, which removes records from MongoDB and the corresponding object from the AWS S3 bucket.
