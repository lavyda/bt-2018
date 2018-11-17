# Lynis GUI


Application code for Bachelor Thesis: [Security evaluation of Linux operating system](http://opac.crzp.sk/?fn=detailBiblioForm&sid=5301BA0C1F12FE31B0464BA915FD&seo=CRZP-detail-kniha) ([KPI FEI TUKE](https://kpi.fei.tuke.sk/), 2018)


## Dependencies
* node.js (only for development)
* Lynis (installed from [repository](https://packages.cisofy.com/community/))

   Debian/Ubuntu
  * libjson-perl

   RHEL/CentOS/Fedora
  * perl-Module-Load-Conditional
  * perl-JSON

## Development
1. Start the development server for React application:

```
yarn start
```
or
```
npm start
```

2. Open Electron window:

```
yarn electron-dev
```
or
```
npm run electron-dev
```

## Building and Packaging
1. Build React application:

```
yarn build
```
or
```
npm build
```

2. Create application package:

> *Optional:* It is possible to use attached Vagrant configuration to package application for Linux:

```
# start vagrant guest
cd vagrant/ && vagrant up
# ssh into guest
vagrant ssh
# go to development directory
cd /vagrant
```

> Remember you have to be using platform you want to build package for.

```
yarn dist
```
or
```
npm run dist
```

## Production
You need to have root permission to run the application. To start the application run *lynis-gui*. Report files are stored in $HOME/.lynis-gui.

---
For more information visit:
* https://github.com/CISOfy/lynis
* https://github.com/d4t4king/lynis-report-converter