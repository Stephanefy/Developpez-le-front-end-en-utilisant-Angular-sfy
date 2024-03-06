# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project architecture

I kept The predefined architecture that was set by our senior frontend developer and mainly added components under the components folder (in addition to the default angular architecture):

- `components` folder: contains every reusable components.
  - `dashboard` folder: contains wrapper component for the dashboard displayed on the home page.
  - `header` folder: contains the header component of the application.
  - `pie` folder: contains the pie component.
  - `line` folder: contains the line component.
  - `loading-spinner` folder contains the loading spinner component.
- `pages` folder: contains components used for routing.
- `core` folder: contains the business logic (`services` and `models` folders).

## Third-Party Libraries

This project uses the following third-party libraries:

- Chart.js: A library that provides charts drawings on HTML5 canvas element. (License: MIT)
  - [To Chart.js documentation](https://www.chartjs.org/docs/latest/) -->


