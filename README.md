# 6string

# ![6string logo](https://github.com/mihainsto/6string/blob/main/client/public/IconWhite_Background.png?raw=true)

6string is a web application that aims to help guitar players learn new songs and visualize the songs and the chords into a friendly 3D environment.  

This is my Bachelor's Degree Final Project for the Faculty of Mathematics and Computer Science of the University of Bucharest.
This project combines multiple fields like Frontend web development, Backend web development, Algorithmics, Mathematics, and 3D Modelling and Animation.



## Table of contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Built with](#built-with)
- [License](#license)


## Demo
- Youtube video with all features: https://youtu.be/Ymx6AeqlOyk
<img alt="song play page image" src = "https://raw.githubusercontent.com/mihainsto/6string/main/songPlayPage.png?token=AKRZOGD5V5CCHYSHRFV3B3TAXSCOA" />
## Features
- Song uploading using the .gp5 file format
- Admin management for approving songs sent by the users
- Application user management by admins
- Settings for the user profile
- Song search, filtering, and sorting
- Play a song with the interactive guitar
- Control the song speed with the corresponding slider
- Left hand guitar feature and current chord popup where you can see the chord currently played
- Playground page where you can experiment with different  chord shapes and use the keys 'q''w''e''a''s''d'' for string picking

## Installation
- run `yarn`
- start the database with `sudo docker-compose up postgres`
- start the client with `yarn workspace client start`
- start the api with `yarn workspace api start:dev`
- migrate the db with `yarn workspace api migrate:dev`
- generate prisma types with `yarn workspace api prisma:generate`
- seed the database with `yarn workspace api seed`
- start the gp5-parser with `cd gp5-parser` and `docker-compose up`

## Built with
- [React](https://github.com/facebook/react)
- [Material-UI](https://github.com/mui-org/material-ui)
- [Babylon.js](https://github.com/BabylonJS)
- [Nest.js](https://github.com/nestjs/nest)
- [GraphQL](https://github.com/graphql)
- [GraphQL Code Generator](https://www.graphql-code-generator.com/)
- [Postgresql](https://www.postgresql.org/)
- [Prisma](https://github.com/prisma/prisma)
- [Docker](https://github.com/docker)
- [Blender](https://github.com/blender)
- [Fusion 360](https://www.autodesk.com/products/fusion-360/overview)

## [License](https://github.com/mihainsto/6string/blob/main/LICENSE)
6string is under the Mozilla Public License 2.0.
