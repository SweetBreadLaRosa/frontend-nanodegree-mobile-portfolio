# Frontend Nanodegree: Website Performance Optimization Project

#### Desktop PSI Score: 30: in progress
#### Mobile PSI Score: 30: in progress

---

### Local Setup

The project can be found on github [here](https://github.com/SweeetBreadLaRosa/frontend-nanodegree-mobile-portfolio)

##### Follow these steps to build the project:

1. Clone the project locally
```
$   git clone https://github.com/SweetBreadLaRosa/frontend-nanodegree-mobile-portfolio.git
```
2. Install node modules
```
$   npm install
```
3. Install gulp globally if you haven't already done so
```
$   npm install -g gulp
```
4. To build the project and run PageSpeed Insights (PSI), run the following command:
```
$   gulp
```
5. The entry point of the final project can be found here:
```
    dist/
        index.html
```

### Refactors

#### index.html

* Added media tag to link element
* Added style.css content within the file
* Created gulp tasks to minify the js, css, and html files, this reduces number of bytes per file.

#### main.js

* changePizzaSizes(): Extracted calls to grab elements out of the for loop for efficiency and cleaner code
* resizePizzas(): Extracted calls to grab elements out of the switch statement and refactored to be called once
* eventListener('DOMContentLoaded'): This function was doing way too much because no matter the size of the
window, the for loop was always going through 200 pizzahs ('I like spelling pizza pizzah "PIZZAH PIZZAH"'),
So I added some conditions to limit the amount of pizzah's depending on the width of the window.