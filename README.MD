<h1 align="center">
  <br>
  <a href="#"><img src="https://raw.githubusercontent.com/virena-app/virena/master/assets/readme-logo.png" alt="Logo Here" width="200"></a>
  <br>
  <br>
</h1>

## <strong>Virena</strong> [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<h4 align="center">A simple and easy-to-use prototyping tool. Create your React Native Navigation in minutes!
<br>
 Built on top of <a href="http://electron.atom.io" target="_blank">Electron</a>.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

## <strong>Key Features</strong> 
***
* Drag-And-Drop Tree Structure
  - Build out your navigation in a way that is extremely easy to think about.
* Live Preview - Make changes, See changes
  - Instantly see what your navigation structure looks like in a phone simulator before you export.
* Login and Save Projects
  - Securely login with your Github or Gmail account to save projects for later.
* Export Project Files
  - Have a project instantly created for you when you place it at the root of a Create-React-Native scaffolding.
* Cross platform
  - Windows, MacOS and Linux ready.



## <strong>How To Use</strong>
***

* STEP 1: INSTALL DEPENDENCIES
  - Virena uses the React Navigation library to build out a navigation structure.
  (https://reactnavigation.org/en/)  <br>
  Before getting started, you must npm/yarn install it as a dependency in your own project.

  ```bash
  npm install --save react-navigation

  # or with yarn
  # yarn add react-navigation
  ```

* Step 2: ADD YOUR ENTRY POINT
  - Add a root navigational component by submitting the required information (name and type) in the top right options panel. The root component serves as the entry point into your React Native app.

<img src="https://github.com/virena-app/virena/blob/master/assets/AddingScreens.gif"/>

* Step 3: ADD CHILDREN
  - Follow similar steps as above to add children. You can nest navigational components within navigational components, or add components of the type "Simple Screen" which are the presentational components for your app. It is important to note that presentational components / "Simple Screens" cannot have children--only navigators can have children. In addition, all navigators must have at least ONE child.
  
<img src="https://github.com/virena-app/virena/blob/master/assets/exportfiles.gif"/>

* Step 4: EXPORT / SAVE / LOAD FILES
  - When you are done with your session, you can either 1) Save your project for later or 2) Export the files for immediate use in your project. In order to save, simply click the "Save Project" button in the top nav menu. You can then log out and come back to it later by clicking the "Load Project" button adjacent to it. Simple enough! In order to export, simply click the blue "Export" button in the bottom region of the right panel and specify where you want it exported. Our application generates templates with the assumption that you will be exporting everything at the same directory level. The contents of the export include a "navigation.js" file--essentially the code manifest detailing the layout of your navigation structure--as well as files which define your presentational components (components of type "Simple Screen" in our app).



## <strong>Download</strong>
***
Download the latest installable version of Virena for [MacOS](https://github.com/virena-app/virena/releases/download/v0.5.0/virena-0.5.0.dmg), [Windows](https://github.com/virena-app/virena/releases/download/v0.5.0/virena.Setup.0.5.0.exe), and [Linux](https://github.com/virena-app/virena/releases/download/v0.5.0/virena_0.5.0_amd64.deb).
* For Mac Users ONLY: As of right now, you may need to grant permission to allow the app to run your system as we do not have an Apple license.

## <strong>Authors</strong>
***
[Sam Hickey](https://linkedin.com/in/) [@samaugust](https://github.com/samaugust)

[Daniel Matuszak](https://linkedin.com/in/) [@daniel-matuszak](https://github.com/daniel-matuszak)

[Jacky Chan](https://linkedin.com/in/) [@jcisbroke](https://github.com/jcisbroke)

[Gerret Kubota](https://linkedin.com/in/gerretkubota) [@gerretkubota](https://github.com/gerretkubota)



## <strong>Credits</strong>
***
This software uses following open source packages.

- [React](https://reactjs.org)
- [Redux](https://reduxjs.org)
- [React-Native](https://facebook.github.io/react-native/)
- [React Sortable Tree](https://github.com/mikcaweb/react-sortable-tree)
- [Electron](http://electron.atom.io/)
