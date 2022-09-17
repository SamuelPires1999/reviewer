# Reviewer
A Monorepo containing the "reviewer" project packages

Reviewer is a web application where users can register and post Products, and ask for a review from other users who happen to have these products.

A review can have a rating of 0 to 10 and can be followed by a comment from the user reviewing.

Users can also link a reference to a e-commerce so people can see more details from their product.

# Server stack
- Typescript
- Mongodb
- Koa
- Graphql 

# Web App stack
- Typescript
- React ( using vite as a template )
- Material UI as design system
- Relay

# Running the project

First of all you gonna need a mongodb instance, for this you can either host one yourself or run from a docker container (recommended)

Just run this command to set it up: 

```docker run -d -p 27017:27017 --name reviewer-db -d mongo:latest```

Now that you got a mongodb instance running, you can just clone this repo and start at the root folder doing: 

```yarn install```

This commmand should install all the needed dependencies for the server and web app to run. If you run into any problem, you can do:

``` cd packages/server && yarn ``` to install server dependencies only and ```cd packages/web && yarn``` to install the web application dependencies only.

If you didn't run at any trouble till this point, you can new run: 
```yarn server:dev``` to run the server instance at ```localhost:3000``` 

and ```yarn web:dev``` to run the web app at ```localhost:5173```
