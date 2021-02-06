[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

# Shanghai

This is a react based web app for playing a rummy style card game called Shanghai. The website is is live at:

- Production: [https://hart-shanghai.herokuapp.com/](https://hart-shanghai.herokuapp.com/)
- Dev: [https://shielded-eyrie-81823.herokuapp.com/](https://shielded-eyrie-81823.herokuapp.com/)

## Built With

The main technologies used in this project are:

- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [React](https://reactjs.org/) and [create-react-app](https://create-react-app.dev/) - library for building user interfaces
- [Firebase Realtime Database](https://firebase.google.com/docs/database/) - backend database
- [Heroku](https://www.heroku.com/home) - pipeline and deployment

## Get Started

Make sure you have the following installed:

1. Install [Node 8](https://nodejs.org) or newer. Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)
2. Clone this repo:
```git clone https://github.com/claudiaareneee/shanghai.git```
3. Navigate to this project's root directory on the command line.
4. Install Node packages
```npm install```
5. Install [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) in Chrome.
6. Having issues? See below.

## Having Issues? Try these things first

1. Run `npm install` - If you forget to do this, you'll get an error when you try to start the app later.
2. Don't run the project from a symbolic link. It will cause issues with file watches.
3. On Windows? Open your console as an administrator. This will assure the console has the necessary rights to perform installs.
4. Ensure you do not have NODE_ENV=production in your env variables as it will not install the devDependencies. To check run this on the command line: `set NODE_ENV`. If it comes back as production, you need to clear this env variable.
5. Nothing above work? Delete your node_modules folder and re-run npm install.

## Usage

To run this project locally, run the following command:

```bash
npm run start-dev
```

Heroku requires a simple server to be spun up. Heroku runs:

```bash
npm start
```

## Roadmap

See the [open issues](https://github.com/claudiaareneee/shanghai/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contact

Your Name - claudiaareneee@gmail.com

Project Link: [https://github.com/claudiaareneee/shanghai/](https://github.com/claudiaareneee/shanghai/)

## Acknowledgements

- [React Toastify](https://www.npmjs.com/package/react-toastify)
- [Othneildrew ReadMe Template](https://github.com/othneildrew/Best-README-Template)

### Production Dependencies

| **Dependency**   | **Use**                                              |
| ---------------- | ---------------------------------------------------- |
| bootstrap        | CSS Framework                                        |
| express          | Server library to help deploy to heroku              |
| express-favicon  | Companion library for express                        |
| firebase         | Firebase library for the backend database            |
| immer            | Helper for working with immutable data               |
| prop-types       | Declare types for props passed into React components |
| node-sass        | Node.js bindings to libsass                          |
| react            | React library                                        |
| react-dom        | React library for DOM rendering                      |
| react-redux      | Connects React components to Redux                   |
| react-router-dom | React library for routing                            |
| react-toastify   | Display messages to the user                         |
| redux            | Library for unidirectional data flows                |
| redux-thunk      | Async redux library                                  |
| reselect         | Memoize selectors for performance                    |

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/claudiaareneee/shanghai.svg?style=for-the-badge
[contributors-url]: https://github.com/claudiaareneee/shanghai/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/claudiaareneee/shanghai.svg?style=for-the-badge
[forks-url]: https://github.com/claudiaareneee/shanghai/network/members
[stars-shield]: https://img.shields.io/github/stars/claudiaareneee/shanghai.svg?style=for-the-badge
[stars-url]: https://github.com/claudiaareneee/shanghai/stargazers
[issues-shield]: https://img.shields.io/github/issues/claudiaareneee/shanghai.svg?style=for-the-badge
[issues-url]: https://github.com/claudiaareneee/shanghai/issues
[license-shield]: https://img.shields.io/github/license/claudiaareneee/shanghai.svg?style=for-the-badge
[license-url]: https://github.com/claudiaareneee/shanghai/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/claudia-nelson-23941616b
[product-screenshot]: images/screenshot.png
