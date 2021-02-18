
## Tech Stack
This project was created using nodejs and typescript it consists of a graphql api and since using graphql with typescript can be a bit of pain I used typegraphql wich makes the process much better and it works perfectly with typeorm.

## Structure
- server
   - src 
     - index.ts->the project's entry point  
     - resolvers->Resolvers folders
     - InputTypes->Types for resolvers arguments
     - entity->Database entities
     - helpers->A folder that contains utility functions used in the project
   - ormconfig.js->Configuration file for typeorm
   - tsconfig.js->TypeScript configuration file
   
  

## How to run the server locally
- Inside the server folder run `npm install` to add the necessary dependencies
- When all the the dependencies are installed run:
	- `npm start` to start the server
	- `npm run dev` to start the dev server(includes hot reloading :fire:)

