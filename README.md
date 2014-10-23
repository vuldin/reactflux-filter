reactflux-filter
================

![initial filter section screenshot](https://joshuapurcell.github.io/reactflux-filter/images/filter-221013.png)

A data-driven React component (using the Flux pattern) that provides filtering on a predefined dataset.

Quick start
-----------

Clone this repo:
```
git clone https://github.com/joshuapurcell/reactflux-filter.git
```

Install dependencies:
```
npm install
```

Build the project:
```
gulp bootstrap (only needed once)
gulp
```

Start the web server:
```
http-server dist/
```
Open [http://localhost:8080](http://localhost:8080) in your browser (tested mainly in Firefox nightly). This project handles multiple instances, so feel free to open up a few windows and any filter changes will automatically be updated with changes.

Development
-----------

Gulp can watch the project and automatically update the distribution files as needed:
```
gulp watch
```

If gulp is not in watch mode, then any changes to project files will have to be followed by running this command after each change:
```
gulp
```
