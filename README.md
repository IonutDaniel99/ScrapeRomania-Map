<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Scrape Romania Map</h3>
  <p align="center">
    Personal project with an interactive svg map of locations to visit in Romania.
    <br />
    <br />
    <br />
    <span>
        <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Logo" width="80" height="28">
        <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="Logo" width="109" height="28">
        <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Logo" width="109" height="28">
        <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" alt="Logo" width="109" height="28">
        <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" alt="Logo" width="82" height="28">
    </span>
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

![Scrape Romania Interactive Map](https://github.com/IonutDaniel99/ScrapeRomania-Map/blob/master/public/github/example.png)

The main goal of the project is to recreate a 125 Romania places to visit. Every clickable svg open a popup with informations about that location. In order to keep tracking of the visited locations, every user can connect with Google account and **_Mark / Unmark_** locations.  
<br>
The image above it's a `example in development` of how the project looks like.
<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

The entire applications was made with `React 17`. Some of used **_libraries_ / _utility frameworks_** are:
* [Lodash](https://www.lodash.com)
* [Tailwind](https://www.tailwindcss.com)
* [Panzoom](https://github.com/anvaka/panzoom)
* [React-icons](https://react-icons.github.io/react-icons/)
* [React-Loading](https://www.npmjs.com/package/react-loading)
* [React-Router](https://reactrouter.com/)
* [React-Mouse-Parallax](https://www.npmjs.com/package/react-parallax-mouse)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
### Installation

1. Create an account on [Firebase](https://firebase.com)
2. Create a firebase project for web apps.
3. Configure Authentication.
4. Clone the repo
   ```sh
   git clone https://github.com/IonutDaniel99/ScrapeRomania-Map.git
   ```
5. Install NPM packages
   ```sh
   npm install
   ```
6. Create a copy of `.env.example` and change it to `.env.local`
7. Go on Firebase Project Settings and copy config values.
8. Configure the `.env.local` accordingly to example in the file or below.
    ```
    REACT_APP_PUBLIC_FIREBASE_API_KEY = ""
    REACT_APP_PUBLIC_FIREBASE_AUTH_DOMAIN = ""
    REACT_APP_PUBLIC_FIREBASE_PROJECT_ID = ""
    REACT_APP_PUBLIC_FIREBASE_STORAGE_BUCKET = ""
    REACT_APP_PUBLIC_FIREBASE_MESSAGE_SENDER_ID =  ""
    REACT_APP_PUBLIC_FIREBASE_APP_ID = ""
   ```
9. After the configuration, run the following command
    ```shell
        npm start
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

In order to create your own map, you need to follow the next steps
1. Go to [Hpi Polygon Tool](http://apps.headwallphotonics.com/)
2. Draw polygons over the map and at the end, export the coordonates as *KML* extension.
3. With KML extension go to [KML TO SVG](https://products.aspose.app/gis/en/viewer/kml-to-svg) and convert KML to SVG file.
4. Download SVG file and open it.
5. For each svg you need to copy the coords content of `d` prop of tag `path` in inspect element.
    ```html
        <svg stroke-width=".50">
            <g xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width=".60" fill="#FFFFFF" aria-valuetext="test">
                <path d="M 1021.907 647.936 L 1016.37 661.13 L 1056.94 658.39 L 1062.66 649.77 L 1062.83 640.893 L 1021.907 647.936 Z" fill="white"></path>
            </g>
        </svg>
    ```
6. After coordonates, go to `data/locationsRomania.json` and edit the object accordingly. Each json object represent a svg rendered on page.  
_(You can change the name of the file but you will need to refactor the code. Wait for future updates, i`ll change it)_


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Improve performances.
  - [ ] Smooth drag on Windows and Mobile phones
  - [ ] Fix mobile phone gesture (If use slide right with the finger on app, the phone gesture will try to navigate back to the last page u come from)
- [ ] Improve code readability. Now the app works but the code it`s ugly.
- [ ] Improve UI and add features.
- [ ] Implement languages.
- [ ] Write Documentation

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License

<p align="right">(<a href="#top">back to top</a>)</p>