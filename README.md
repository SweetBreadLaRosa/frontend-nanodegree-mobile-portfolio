# Frontend Nanodegree: Website Performance Optimization Project

### Desktop PSI Score: 96
### Mobile PSI Score: 90

---

## Local Setup

The project can be found on github [here](https://github.com/SweetBreadLaRosa/frontend-nanodegree-mobile-portfolio)

#### Follow these steps to build the project:

1. Clone the project locally
```
$   git clone https://github.com/SweetBreadLaRosa/frontend-nanodegree-mobile-portfolio.git
```
2. Install node modules
```
$   npm i
```
3. Install gulp globally if you haven't already done so
```
$   npm install -g gulp
```
4. To build the project and run PageSpeed Insights
```
$   gulp
```
5. The entry point of the final project can be found here:
```
dist/index.html
```

## Optimization changes below!

### index.html

* Scaled images smaller
* Added media tag to link element
* Added async keyword where necessary
* Created gulp tasks to minify the js, css, and html files

### main.js

#### resizePizzas():
    * Moved calls (select/query actions to get elements) out of loop so that they do not need to be called
     more than they need to.
    * Refactored changeSliderLabel and sizeSwitcher function logic into one switch statement
    * Moved getElementById out of for-loop where the pizzas are created and appended on page load

#### eventListener('DOMContentLoaded')
    * This function was doing way too much because no matter the size of the
      window, the for loop was always going through 200 pizzahs,
      So I added some conditions to limit the amount of pizzah's depending on the width of the window.