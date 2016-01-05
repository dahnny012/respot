# "ReSpot"


<!--
The "App Overview" section intends to be a high level description of your app. Think of what you might want to know if considering a purchase in an app store. 
-->

## App Overview

"My Contest App" enables students to control notifications related to their classes from their cell phone. This improves their awareness of assignments and due dates through customizable alerts. It is proven that today's students are more tech savvy than ever. They expect to interact with classes in the same way as their social networks. "My Contest App" makes courses more mobile and social by doing something remarkable...

### Planning

[See this project's hackathon entry page!](http://www.hackathon.io/pearson)

### Demo

[Watch a video of the application in action!](https://www.youtube.com/watch?v=8BFMaQjrw4s)

### Screenshots

![Login Screenshot](http://developer.pearson.com/sites/default/files/LSDashboard_Login_small.png)
![Launch Screenshot](http://developer.pearson.com/sites/default/files/LSDashboard_NewActivity_small.png)
![Settings Screenshot](http://developer.pearson.com/sites/default/files/LSDashboard_Settings_small.png)


<!--
The "App Details" section intends to explain how your app works. Describe the major components, what APIs were used, and what is missing to make this production ready.
-->

## App Details



### API Usage

 * [3rd Party Messaging API](#) - provides communication services
 * [LearningStudio API](http://developer.pearson.com/learningstudio/course-apis/course-info/enrollment/reference) - provides class schedules and rosters
 * [LearningStudio Eventing](http://developer.pearson.com/learningstudio/receive-events) - provides realtime notifications of class happenings

### Scope of Functionality 

This application is mostly functional. The number of users able to use this application is limited by shortcuts taken for data storage. These were necessary to finish by the deadline, but replacing the temporary data store with a more scaleble solution would make this application ready for prime time!

<!--
The "Prerequisites" section intends to assist someone get started with your source code. They might not be familar with your frameworks or project structure. Help them out by explaining what you already know. 
-->

## Prerequisites

### Build Environment 

 * Node 4.1.1 or Greater
 * NPM 2.14.4 or Greater

### Server Environment 

 * Node 4.1.1 or Greater
 * Mongo 2.6.11 or Greater


<!--
The "Installation" section intends to assist someone deploy your project themselves. What do they need to configure, package, and distribute?
-->

## Installation

### Application Configuration


~~~~~~~~~~~~~~
PORT={Port of your choosing}
~~~~~~~~~~~~~~

### Application Deployment

#### Build

Node Server

~~~~~~~~~~~~~~
1. Navigate to /app
2. Run "npm install"
3. Make a mongo folder by "mkdir mongo"
~~~~~~~~~~~~~~


#### Deploy 

~~~~~~~~~~~~~

1. Give the file to to start mongo permissions, "chmod 667 scripts/mongoInit.sh"
2. Start mongo, "./scripts/mongoInit.sh"
3. On a seperate terminal start the server "npm start"

~~~~~~~~~~~~~

<!--
The "Credit" section intends to highlight your team. Tell who contributed to what parts of the project. Give thanks to mentors that were helpful.
-->

## Credit

### Team

This project was a collaborative effort. We are all friends at the University of Minnesota Twin Cities.

 * [Danh Nguyen](#) - Lead Full-Stack Developer
 * [Wen Chuan Lee](#) - Full-Stack Developer

### Other

This project would have not been possible without ![C9.io](https://c9.io).

<!--
The "License" section intends to be a license declaration. Checkout choosealicence.com to become familar with different licences. The full license should be included in the LICENSE file, but you can also declare and link to it here.
-->

## License

~~~~~~~~~~~~~~
The MIT License (MIT)

Copyright (c) [2015] [Danh Nguyen, Wen Chuan Lee]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
~~~~~~~~~~~~~~