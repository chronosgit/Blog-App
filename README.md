App name: EngiWorld
KBTU "JS Framework. React", Fall - final project

Backend application: https://github.com/chronosgit/EngiWorldBackend

About this file:
The purpose of this file is to provide overview, setup instructions and background information of the project.

App description:
EngiWorld is an online social media platform for engineers of all kinds: software, electrical, chemical, mechanical, civil, etc. It aims at providing convenience of communication between engineers all over the globe. Although one might wonder, why need this application when there already are dedicated groups for engineers in existing social media platforms? The answer is simple, first of all our webapp provides a unique sense of unity among engineers, the importance of which is not to be underestimated, secondly it is dedicated solely to engineering with nothing but only top content from fellow engineers, this all of course means more convenience for the users. It also has additional UX features like predefined subtopics that make categorizing posts easier.
Disclaimer: the app is a student project and as such it isn't currently hosted anywhere on the Web.

Functionality:
Guests can read posts, visit certain pages and log in/sign up.
Authentication is provided with JWT tokens. Guests are free to create new accounts with their emails, as well as logging into existing ones.
Sign in/sign up is validated on the client-side, only strong passwords are permitted.
Authenticated users can make new posts, comment existing ones, like, repost, alter their own profile information, log out, follow and unfollow other users, view other users' profiles.
Aside from username, password and email, personal information includes a short bio and a profile picture, both could be changed on the profile page.
From the profile page users can also list the posts they liked or reposted, as well as their own posts, and also get a list of people they follow.
Users can also alter the contents of their posts and comments as well as delete them.
Both guests and users can view the feed. The feed contains all of the posts available, but it loads them ad hoc as the user scrolls down the page.
Everyone can access specific posts from the feed, inspecting their contents and comments.
Everyone can use search to find specific posts, the search automatically provides matching entries as hints if they're available.
Writing new posts is convenient as the editor provides users with a number of subtopics for each branch of engineering.
News feed can be filtered by time, likes or reposts.
Users receive notifications when other users like or comment under their posts, or when they like their comments, or when someone you follow posts something.
The webapp has exquisite UI/UX in huge part thanks to the MaterialUI library.

Development team:
Kidirmaganbetov Nurken (frontend, UI/UX, testing, backend)
Saginbek Iskander (frontend, UI/UX, testing, documentation)

Technologies used:
The app is built with the MERN stack (MongoDB, Express, React, Node) and RESTful API
Frontend (for more details check package.json):
HTML/CSS/JSX:
ReactJS
Emotion
Material UI
Jest
Axios

Backend (for more details check package.json):
JS:
Node.js
Express
MongoDB
Mongoose
JWT

Requirements:
Software:
preferrably Ubuntu OS for running MongoDB
Nodejs
npm (or yarn)
Mongodb

Hardware:
x64 CPU
at least 12 GB of free disk space
more than 4 GB of RAM

Technical specifications:
This project is a MERN app and as such it's built entirely with JS. Frontend code gets transpiled into backwards-compatible, compact JS code for production using babel.

Setup Instructions:
In these steps it is assumed you already have all the necessary software installed and configured on your system, including Node.js and MongoDB, also in the following steps npm is used as the package manager but you can also use other managers like yarn
Create an empty react app by running "npm create-react-app" in an empty folder, in this folder delete everything you won't need, including all the files that will be replaced by the ones from this repo
Initialize git
Copy the frontend source code by running "git clone https://github.com/chronosgit/EngiWorld.git" in the desired folder
Now copy the backend by running "git clone https://github.com/chronosgit/EngiWorldBackend.git" in another folder
The main working branches of both projects are the "main" branch
Install all the required dependencies by running "npm install" in the same directory as package.json, repeat this step for the backend code
You are advised to use the dependencies with the same versions as in their respective package.json files or higher
To simply run the react app use "npm start"
To build the react app type "npm run build", the production files will go into the dedicated "build" folder
To serve the react app use "serve -s build" after building it

Create a ".env" file in the backend folder, insert the following 2 lines:
ACCESS_TOKEN_SECRET="some_string"
REFRESH_TOKEN_SECRET="some_string"

To run the backend side of the app, first start the database by typing "mongod --port 27017" in the backend folder, then type "node app.js"

If necessary you can change the ports used by the application which are 3000 (frontend-react), 3001 (backend-node), 27017 (database-mongo)
To change the React port number either use a .env file like with Node.js, or specify "PORT=your_port_number_here" in "start" and/or "build" scripts in package.json
To change the Node.js port number change the PORT variable in app.js
To change the MongoDB port number simply run the same command as above except with a number different from 27017

Source code structural overview:
Frontend:
"public" folder - contains the service worker file as well as the main index.html file, it also has favicon and static images in their respective subfolders
"src" folder - contains the main part of the React code, including the React app itself - the "App.js" file, as well as index.css, index.js, the components folder that contains all of the React components used in this app, as well as some other files

Backend:
"handlers" folder - contains the main part of the backend code, including all of the http server functions
"middleware" folder - contains the middleware files for file processing and managing JWT
app.js file - the app itself, defines the main variables, URLs, dependencies, etc.
models.js file - the file that contains schemas for data storage