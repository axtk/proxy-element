# proxy-element

*Event delegation via virtual proxy elements*

## Usage

#### `createProxy(element)`

```js
import {createProxy} from 'proxy-element';

let containerElement = document.querySelector('#container');
let container = createProxy(containerElement);

// delegating events from any existing and future elements
// within the container to the container itself:

container.querySelector('h1').addEventListener('click', () => {
    // ...
});

container.querySelectorAll('.list-item').addEventListener('click', () => {
    // ...
});
```

Replacing a `container` DOM node with its proxy enables [event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_delegation) with the rest of the code left intact.

```diff
- let container = containerElement;
+ let container = createProxy(containerElement);
```

#### `proxySelector(selector)`, `proxySelectorAll(selector)`

These methods are effectively equivalent to `createProxy(document).querySelector(selector)` and `createProxy(document).querySelectorAll(selector)` respectively.

## Installation

```
npm i github:axtk/proxy-element
```
