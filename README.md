# AngularBaseCourse

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

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

## Utilities

> ng n angular-movie-app-base --routing=true        -- creo il progetto
> ng update										    -- aggiorno i packages 
> ng add @ng-bootstrap/ng-bootstrap				    -- installo il package bootstrap
> npm i @fortawesome/angular-fontawesome			-- installo il package font-awesome per le icons
> npm i ngx-toastr                                  -- installo il package per le notifiche

## Check Version Application

> node -v
> npm -v
> ng --version
> tsc -v

## Json Server

> npm i json-server                             -- installo il package
> json-server got.json                          -- inizializzo il web server sul file json 
> json-server got.json -d 1000 -p 7000			-- [d: delay  p: port]

es: 
> json-server .\src\assets\api\movies.json -d 1000 -p 7000