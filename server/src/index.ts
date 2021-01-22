import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import cors from "cors"
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { JobResolver } from "./resolvers/JobResolver";
import { RecruiterResolver } from "./resolvers/RecruiterResolver";
import refreshToken from "./routes/refreshToken"

(async () => {
  const app = express()
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  )

  app.use(cookieParser())
  app.post("/refreshToken", refreshToken)

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...options, name: "default" })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [JobResolver, RecruiterResolver],
      validate: true
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false })
  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`)
  });
})();
