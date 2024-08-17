
# Event app-GoGothenburg

This is an application designed to create a user-based platform where users can register, log in, and create content (posts). The content that users can create is optional but should be based on a resource in our Express API. User data should also be based on a separate resource (users), with passwords encrypted. All content created, modified, or deleted should be saved to a MongoDB database. The content created by a user can only be modified or deleted by the creator. The platform includes a client application where all the mentioned operations can be performed. Additionally, the content should be presented in the interface in some way and be visible to everyone - even if they are not logged in.

## Features

 User Registration: Users can create an account by providing necessary details.
 
 User Authentication: Users can log in securely using their credentials.

 Content Creation: Users can create posts based on a resource in the Express API.

 Data Persistence: All content created, modified, or deleted is saved to a MongoDB database.
 
 Content Visibility: Content created by users is visible to everyone, including those who are not logged in.

## Setup Instructions
Clone the repository: 

        https://github.com/toal13/react-express-user-content-ts-tomocat.git

Navigate to the project directory: cd react-express-user-content-ts-tomocat.git

cd server npm install

npm run dev

cd client npm install

npm run dev

Access the application in your browser at 

http://localhost:3000


## Technologies Used

Express.js

MongoDB

React

TanStack Query

