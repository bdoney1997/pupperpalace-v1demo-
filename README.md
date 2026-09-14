  

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a  name="readme-top"></a>

<!--

*** Thanks for checking out the Best-README-Template. If you have a suggestion

*** that would make this better, please fork the repo and create a pull request

*** or simply open an issue with the tag "enhancement".

*** Don't forget to give the project a star!

*** Thanks again! Now go create something AMAZING! :D

-->

  
  
  

<!-- PROJECT SHIELDS -->

<!--

*** I'm using markdown "reference style" links for readability.

*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).

*** See the bottom of this document for the declaration of the reference variables

*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.

*** https://www.markdownguide.org/basic-syntax/#reference-style-links

-->

  
<!-- PROJECT LOGO -->

<br  />

<div  align="center">

<a  href="https://github.com/reza-s/pupper-palace">

<img  src="src/images/PUPPER_PALACE_LOGO.png"  alt="Logo"  width="160"  height="300">

</a>

  

<h3  align="center">Pupper Palace</h3>

  

<p  align="center">Pupper Palace, by Fatal Push, plans to utilize the individual health statuses of the customer's pets to provide the best and safest experience for your pet. An intuitive appointment-booking and tracking interface will be optimized to quicken the check-in/check-out time.

</p>

<p  align="center">My work I have committed to this project include mainly the front-end design of elements on the page and the overall look and organization of the project. It turned it really nicely with the back-end being flown seamlessly with the front-end.

</p>

</div>

  
  
  

<!-- TABLE OF CONTENTS -->

<details>

<summary>Table of Contents</summary>

<ol>

<li>

<a  href="#about-the-project">About The Project</a>

<ul>

<li><a  href="#built-with">Built With</a></li>

</ul>

</li>

<li>

<a  href="#getting-started">Getting Started</a>

<ul>

<li><a  href="#prerequisites">Prerequisites</a></li>

<li><a  href="#installation">Installation</a></li>

</ul>

</li>

<li><a  href="#usage">Usage</a></li>

<li><a  href="#roadmap">Roadmap</a></li>

<li><a  href="#contributers">Contributers</a></li>

</ol>

</details>

  
  
  

<!-- ABOUT THE PROJECT -->

## About The Project

  

[![Appointment Page][appointment-page]]()

  

Pupper palace was created for Shoaf Studio seeking a data management application for a pet sitting company opening in the greater Sacramento area. Our client, Steven Shoaf, wanted to be able to update the older application to have a more "modern" UI with updated features such as a calandar. Pupper Palace is an appointment management system used for a pet daycare business. The way this application is handled is through an employee to customer 
interaction. Employees will be able to see a calandar and list of all current and upcoming pets, manage appointments, and be able to see notes on the pet. Customers will be in contact with an employee to schedule appointments for their pets and pay for their appointments through Stripe. 

   

<p  align="right">(<a  href="#readme-top">back to top</a>)</p>

  

### Built With

  

* [![Electron][]][Electron-url]

* [![Node.js][]][Node-url]

* [![SQLite][]][SQLite-url]

* [![MUI][]][MUI-url]

* [![React][React.js]][React-url]


  

<p  align="right">(<a  href="#readme-top">back to top</a>)</p>

  
  
  

<!-- GETTING STARTED -->

## Getting Started

  

Copy-paste both the installation commands depending if you are using Yarn or NPM.

  

### Installation

1. Clone the repo

```sh

git clone https://github.com/bdoney1997/pupperpalace-v1demo-

```

2. Install Packages

* []()Install with NPM

```bash

npm install  --dev  electron

npm install  --dev  @babel/core  @babel/preset-react  babel-loader

npm install  react  react-dom

npm install  react-router-dom

npm install  @mui/material  @mui/styled-engine-sc  styled-components

npm install  @fontsource/roboto

npm install  @mui/icons-material

npm uninstall  sqlite3  --save

npm install  sqlite3  --no-save

npm install --save react-window

npm install stripe

npm install react-text-mask

npm install --save-dev file-loader

```

* []() Install with Yarn

```bash

yarn add  --dev  electron

yarn add  --dev  @babel/core  @babel/preset-react  babel-loader

yarn add  react  react-dom

yarn add  react-router-dom

yarn add  @mui/material  @emotion/react  @emotion/styled

yarn add  @fontsource/roboto

yarn add  @mui/icons-material

yarn add  @mui/x-data-grid

yarn add react-window

yarn add stripe

yarn add react-text-mask

yarn add file-loader --dev
```

3. To Run

```bash

yarn run  electron

#or

npm run  electron

```

4. Problems Running?

* []() Try installing both Yarn and NPM

* []() If trouble regarding SQLite, try uninstalling and reinstalling SQLite
```bash

npm uninstall  sqlite3  --save

npm install  sqlite3  --no-save

```

<p  align="right">(<a  href="#readme-top">back to top</a>)</p>

  
  
  

<!-- USAGE EXAMPLES -->

## Usage

Pupper Palace, the innovative pet care app, is poised to revolutionize the way we prioritize the well-being of your furry companions. By harnessing the unique health profiles of your beloved pets, Pupper Palace is committed to curating an unparalleled and secure experience for your furry friends. This groundbreaking platform aims to leverage the individual health statuses of your pets, ensuring a tailored and meticulous approach to their care.

The app boasts an intuitive and user-friendly interface, designed to streamline the process of scheduling appointments and seamlessly tracking your pet's health progress. The cutting-edge technology integrated into Pupper Palace is set to redefine efficiency, significantly reducing check-in and check-out times to prioritize more quality moments with your pets.

Embrace peace of mind and convenience with Pupper Palace as it leads the charge in prioritizing your pet's safety and well-being like never before.

  

<p  align="right">(<a  href="#readme-top">back to top</a>)</p>

  
  
  

<!-- ROADMAP -->

## Roadmap

  

- [x] Added Appointment Booking

- [x] Working pages

- [x] Log-in Screen

- [x] Refine the UI

- [x] Add analytical dashboard

- [x] Add payments



<p  align="right">(<a  href="#readme-top">back to top</a>)</p>

  
  
  

<!-- TESTING -->

## Testing

As part of Pupper Palace's commitment to delivering a seamless and robust user experience, each facet of the application has undergone meticulous testing to ensure optimal functionality and database accuracy. The core pages and functionalities have been subjected to thorough scrutiny, leaving no stone unturned in guaranteeing their reliability and responsiveness.

The login page, serving as the gateway to the app, has been rigorously tested for both security and usability. Verification procedures ensure that user authentication operates seamlessly while safeguarding sensitive information.

The appointment page, a crucial component of Pupper Palace's service, has been meticulously assessed. Its functionality in scheduling, modifying, and canceling appointments has been rigorously examined to ensure precision and user-friendliness.

The home page, the central hub of the app, has been subjected to comprehensive testing to ensure swift navigation and access to essential features. Its responsiveness and ability to provide intuitive access to diverse functionalities have been fine-tuned for an enhanced user experience.

Furthermore, the customer page, settings page, and pet page have undergone meticulous testing for accurate database changes and button functionality. Any interactions that trigger database modifications have been scrutinized to ensure that data updates occur seamlessly and accurately.

  



  
  
  
<p  align="right">(<a  href="#readme-top">back to top</a>)</p>
<!-- Deployment -->

## Deployment
To setup and run refer to <a href ="#Installation"> installation</a>. 

Pupper Palace Electron App:
* []() The 'Pupper Palace' app, an Electron-based application, will be installed on the desktop compgiuter.
* []() The app manages appointments, customers, pets, and employees using a local SQLite3 database.
* []() This app has been tested and deployed on: Windows 10, Windows 11, MacOS.
* []() Stripe supports the following browsers and versions: Chrome 38+, Safari 10.1+, Firefox 29+, Edge 15+, Opera 25+
* []() The following NPM version was utilized in the production of this project: npm version 9.5.1
* []() The following Yarn version was utilized in the production of this project: npm version 1.22.19
* []() Additional version checks: SQLite3 version 3.44.2, React version 18.2.0+, Stripe 14.4.0+

  
<p  align="right">(<a  href="#readme-top">back to top</a>)</p>

<!-- Contributers -->

## Contributers
Pupper Palace was created by Fatal Push for Shoaf Studio. 

Fatal Push members:

Brian Shao bshao@csus.edu

Matthew Dominguez matthewdominguez@csus.edu

Micah Richardson micahrichardson@csus.edu

Tou Vang touvang5@csus.edu

Gurvinder Dhuncy gurvinderdhuncy@csus.edu

Abel Ontiveros abelontiveros@csus.edu

Reza Selseleh rselseleh@csus.edu

Brandon Doney brandondoney@csus.edu


Shoaf Studio

Steven Shoaf steven@shoafstudio.io
  
<p  align="right">(<a  href="#readme-top">back to top</a>)</p>
  

<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge

[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge

[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge

[stars-url]: https://github.com/github_username/repo_name/stargazers

[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge

[issues-url]: https://github.com/github_username/repo_name/issues

[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge

[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/linkedin_username

[product-screenshot]: images/screenshot.png

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white

[Next-url]: https://nextjs.org/

[Electron]: https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=Electron&logoColor=white

[Electron-url]: https://www.electronjs.org/ 

[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white

[Node-url]:https://nodejs.org/en

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB

[React-url]: https://reactjs.org/

[MUI]: https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white

[MUI-url]:https://mui.com/

[SQLite]: https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white

[SQLite-url]: https://sqlite.org/index.html


  

[appointment-page]: https://cdn.discordapp.com/attachments/1067968594207584317/1180045734544949298/Readme_pic.png?ex=657bfe3b&is=6569893b&hm=332fc9eb82d31d08412ab1525622f8627c068a8cadb623cb90cd543e4c347480&
