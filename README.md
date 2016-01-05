# "ReSpot"

*Remember Everything, Never Forget.*

## App Overview

All flashcard systems (such as Anki, Quizlet) today all work, but each of them have major flaws such as lacking the ability to edit a card, a beautiful UI, and some lack a SRS (spaced repetition system).

ReSpot is the result of us taking everything good from these systems and implementing all the features that they lack, leaving only what's necessary and great.


### ReSpot has:
- Beautiful, minimal UI
- Accessible from everywhere
- Centralized progress and data stores (as ReSpot is one web app). 
- No need for a custom app.
- Uses an SRS algorithm. 
- Has a unique timeline for each user. 
- Ability to add and delete cards, as well as decks in a centralized manner.
- **Ability to generate cards using PEARSON dictionaries for vocabulary, tailored for English, GRE English and Chinese-English words.**


### Planning

[See this project's devPost entry page!](http://devpost.com/software/respot-nwi1s5)

### API Usage

 * [Pearson Content API](http://developer.pearson.com/apis/dictionaries) - Provides Dictionaries for users to generate GRE study cards, English and other languages.
 
  The dictionaries used were: 
    * Longman Dictionary of Contemporary English (5th edition)
    * Longman English-Chinese Dictionary of 100,000 Words (New 2nd Edition)


### Scope of Functionality 

This application is fully functional. The number of users able to use the current application instance on our C9 instance is limited by the CPU and Memory limits of the instance. 

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

### Application Deployment

Deploy easily by cloning the repo into a C9 (Cloud9 IDE) instance! Alternatively, clone the repository and build in an environment with Node, NPM and Mongo.


### Build

Node Server


1. Navigate to `/app`
2. Run `npm install`
3. Make a mongo folder with `mkdir mongo`



### Deploy 



1. Give the file to to start mongo permissions, `chmod 667 scripts/mongoInit.sh` (`sudo` may be required)
2. Start mongo, `./scripts/mongoInit.sh`
3. Open a new terminal and navigate to `/app`
3. Start the server with `npm start`



<!--
The "Credit" section intends to highlight your team. Tell who contributed to what parts of the project. Give thanks to mentors that were helpful.
-->

## Credit

This project would have not been possible without [C9.io](https://c9.io).
This project is a result of multiple open source projects, frameworks, and technologies. (e.g. Bootstrap, Node, NPM, MaterializeCSS, Mongo, Express)
Special thanks to the online developer community on StackOverflow.

### Team

This project was a collaborative effort. We are all friends at the University of Minnesota -Twin Cities.

 * [Danh Nguyen](https://github.com/dahnny012) - Lead Full-Stack Developer
 * [Wen Chuan Lee](https://github.com/leewc) - Full-Stack Developer

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