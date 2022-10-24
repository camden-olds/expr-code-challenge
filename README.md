# Code Challenge for Expression Networks
This repository contains a small demo application that allows users to browse, add, and remove books from a bookshelf.

#### Requirements
1. Install and configure docker desktop [Click Here](https://docs.docker.com/get-docker/)

#### Getting Started
1. Using terminal (osx/linux) or command prompt (windows) navigate to the directory this application is checked out into
2. Type `docker-compose up -d` and hit enter
_This will use docker to initialize and run the entire environment on your computer. The API will be accessible at http://localhost:3001. The frontend application will be accessible at http://localhost:3000. Mongo Express (A GUI to view & edit the mongodb collections) will be accessible at http://localhost:3002._

#### Shutting Down The Application
1. Using terminal (osx/linux) or command prompt (windows) navigate to the directory this application is checked out into
2. Type `docker-compose down` and hit enter


#### Directory Structure
```
api
    models/             contains data models
    node_modules/       contains npm dependancies
    src/                
        dict/           contains dictionary files for static content
        middleware/     contains middleware functions used for express requests
        routes/         contains all api routes & logic
frontend
```