# Gateways
MyReactApp is a web application built using React, Vite, TypeScript, and Firebase as the backend. This application utilizes Firestore as the database and Firebase Authentication with Email provider for secure user authentication.

# Getting Started
Follow these instructions to set up the project and create a basic Firebase server to get the app up and running.

## Prerequisites
- Node.js (v12.x or later)
- yarn (v1.x or later)
- A Firebase project with Firestore and Email Authentication enabled
## Installation
1. Clone the repository: 
**git clone https://github.com/yourusername/myreactapp.git**
2. Navigate to the project directory:
**cd gateways**
3. Install the dependencies:
**yarn install**

## Setting Up Firebase
1. Go to the Firebase Console and sign in with your Google account.
2. Create a new Firebase project or select an existing one.
3. Click on the "Firestore Database" card and set up the database in production mode.
4. Click on "Rules" and replace the default rules with the following:
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if true;
      }
    }
  }
5. Save and publish the new rules.
6. Go to the "Authentication" tab and enable the Email/Password provider.

## Configuring the Environment Variables
1. In the project directory, find the .env-template file and rename it to .env.
2. Copy the Firebase configuration values from your Firebase project settings:

  - Go to the Firebase Console.
  - Click on the gear icon in the upper left corner and select "Project settings."
  - Under "Your apps" section, select your app or create a new one by clicking on the "</>" icon.
  - Copy the Firebase SDK configuration object.
3. Set the values in the .env file with the Firebase configuration values you just copied:
  VITE_FIREBASE_API_KEY=your-firebase-api-key
  VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
  VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
  VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
  VITE_FIREBASE_APP_ID=your-firebase-app-id

## Running the App
To start the development server, run:

**yarn dev**

The app will be available at http://localhost:3000.

# Deployment
To build the app for production, run:

**yarn build**

The output files will be in the dist directory. Deploy these files to your preferred hosting provider.

# License
This project is licensed under the MIT License - see the LICENSE file for details.