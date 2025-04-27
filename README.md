## 📊 DoughnutChartApp
This project is a user-friendly Angular standalone component application to display financial year data in a Doughnut Chart using ng2-charts and Chart.js.

Users can select a year from a dropdown and view:

The financial details (Invoice, VAT, Expense, Bonus, Other Income)

Gross Salary (displayed at the center of the doughnut)

Financial Year Start and End dates

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.1.

## 🛠 Tech Stack
Angular 17 (Standalone Components)

ng2-charts

Chart.js

Bootstrap 5 (for layout & styling)

## 📦 Configuration Details
Chart Library Setup:
This app uses ng2-charts package:
npm install ng2-charts chart.js

Standalone Component Usage:
The chart component is built as a standalone Angular component (standalone: true), meaning no need for traditional modules.

Chart Display:
Using <canvas baseChart> with custom plugins to show Gross Salary in the center.

Financial Year Calculation:
Start and end dates are calculated based on the first and last working days (non-eekends) of the selected year.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
