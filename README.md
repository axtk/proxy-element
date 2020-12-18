```js
import {proxySelector, proxySelectorAll} from 'proxy-element';

let container = document.querySelector('#container');

// delegating events from any existing and future elements
// within the container to the container itself:
proxySelector('h2', container).addEventListener('click', event => {
    console.log(event.target);
});
proxySelectorAll('.list-item', container).addEventListener('click', event => {
    console.log(event.target);
});
```

```js
// unspecified second argument: host element === document
let button = proxySelector('.header button');
let onButtonClick = () => console.log(button.query().textContent);

button.addEventListener('click', onButtonClick);
button.removeEventListener('click', onButtonClick);
```
