
# Event app-GoGothenburg

This is an application designed to create a user-based platform where users can register, log in, and create content (posts). The content that users can create is optional but should be based on a resource in our Express API. User data should also be based on a separate resource (users), with passwords encrypted. All content created, modified, or deleted should be saved to a MongoDB database. The content created by a user can only be modified or deleted by the creator. The platform includes a client application where all the mentioned operations can be performed. Additionally, the content should be presented in the interface in some way and be visible to everyone - even if they are not logged in.

## Features

 User Registration: Users can create an account by providing necessary details.
 
 User Authentication: Users can log in securely using their credentials.

 Content Creation: Users can create posts based on a resource in the Express API.

 Data Persistence: All content created, modified, or deleted is saved to a MongoDB database.
 
 Content Visibility: Content created by users is visible to everyone, including those who are not logged in.


## Technologies Used

Express.js

MongoDB

React

TanStack Query


**Krav för godkänt:**

- [ ] Git & GitHub har använts
- [ ] Projektmappen innehåller en README.md fil (läs ovan för mer info)
- [ ] Uppgiften lämnas in i tid!
- [ ] Det ska finnas minst två stycken resurser (users & posts)
- [ ] Det ska gå att registrera sig, logga in och skapa innehåll som är kopplat till inloggad användare.
- [ ] Endast den inloggade användaren får lov att utföra C_UD actions på sitt innehåll.
- [ ] Innehållet ska vara synligt för alla besökare på sidan.
- [ ] Projektet ska ha stöd för att ladda upp och visa bilder som en del av innehållet.
- [ ] Allt innehåll ska sparas i en MongoDB databas.


**Krav för väl godkänt:**

- [ ] Alla punkter för godkänt är uppfyllda
- [ ] Det ska finnas en adminroll i systemet där man som inloggad admin har rättigheten att utföra CRUD operationer på allt innehåll.
- [ ] Admins ska ha tillgång till ett gränssnitt som listar alla användare och deras roller. En admin ska från gränssnittet kunna ta bort användare eller ändra dess roll.

