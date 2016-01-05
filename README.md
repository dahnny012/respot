# "ReSpot"

## App Overview

"My Contest App" enables students to control notifications related to their classes from their cell phone. This improves their awareness of assignments and due dates through customizable alerts. It is proven that today's students are more tech savvy than ever. They expect to interact with classes in the same way as their social networks. "My Contest App" makes courses more mobile and social by doing something remarkable...

### Planning

[See this project's devPost entry page!](http://devpost.com/software/respot-nwi1s5)



### API Usage

 * [3rd Party Messaging API](#) - provides communication services
 * [LearningStudio API](http://developer.pearson.com/learningstudio/course-apis/course-info/enrollment/reference) - provides class schedules and rosters
 * [LearningStudio Eventing](http://developer.pearson.com/learningstudio/receive-events) - provides realtime notifications of class happenings

### Scope of Functionality 

This application is mostly functional. The number of users able to use this application is limited by shortcuts taken for data storage. These were necessary to finish by the deadline, but replacing the temporary data store with a more scaleble solution would make this application ready for prime time!


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
1. Navigate to `/app`
2. Run `npm install`
3. Make a mongo folder with `mkdir mongo`
~~~~~~~~~~~~~~


#### Deploy 

~~~~~~~~~~~~~

1. Give the file to to start mongo permissions, `chmod 667 scripts/mongoInit.sh` (sudo may be required)
2. Start mongo, `./scripts/mongoInit.sh`
3. Open a new terminal and navigate to `/app`
3. Start the server with `npm start`

~~~~~~~~~~~~~

<!--
The "Credit" section intends to highlight your team. Tell who contributed to what parts of the project. Give thanks to mentors that were helpful.
-->

## Credit

### Team

This project was a collaborative effort. We are all friends at the University of Minnesota Twin Cities.

 * [Danh Nguyen](https://github.com/dahnny012) - Lead Full-Stack Developer
 * [Wen Chuan Lee](https://github.com/leewc) - Full-Stack Developer

### Other

This project would have not been possible without [C9.io](https://c9.io).

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