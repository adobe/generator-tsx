# <%= appname %>

[![Travis Build Status](https://img.shields.io/travis/<%= githubUsername %>/<%=
appname %>.svg)](https://travis-ci.org/<%= githubUsername %>/<%= appname %>)
[![codecov](https://codecov.io/gh/<%= githubUsername %>/<%= appname
%>/branch/master/graph/badge.svg)](https://codecov.io/gh/<%= githubUsername
%>/<%= appname %>)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A TypeScript/React starter project, bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## Features

The following features are included to align with the
[Magento Front-End Technical Vision](https://github.com/magento/architecture/blob/master/design-documents/frontend/technical-vision.md#front-end-technical-vision):

- [CRA](https://facebook.github.io/create-react-app/)
- [TypeScript](http://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [React Redux](https://react-redux.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk#redux-thunk)
- [Reach Router](https://reach.tech/router) (see
  [The Future of React Router and @reach/router](https://reacttraining.com/blog/reach-react-router-future/))
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [React Intl](https://github.com/formatjs/react-intl#react-intl)
- [Prettier](https://prettier.io/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br> You will also see any lint errors in
the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

For server-side i18n support, you'll need to
[run the server with full-icu data](https://github.com/formatjs/react-intl/blob/master/docs/Getting-Started.md#nodejs):

```bash
NODE_ICU_DATA=$(npx node-full-icu-path) serve -s build
```

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (Webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
