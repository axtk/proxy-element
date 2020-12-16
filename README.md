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
container.querySelector('h1').addEventListener('click', event => {
    // ...
});
container.querySelectorAll('.list-item').addEventListener('click', event => {
    // ...
});
```

Replacing the `container` DOM node with its proxy enables [event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_delegation) with the rest of the code left intact.

```diff
- let container = containerElement;
+ let container = createProxy(containerElement);
```

#### `proxySelectorAll(selector)`

A shortcut to `createProxy(document).querySelectorAll(selector)`.

```js
import {proxySelectorAll} from 'proxy-element';

proxySelectorAll('.menu li').addEventListener('click', event => {
    // ...
});
```

#### `proxySelector(selector)`

A shortcut to `createProxy(document).querySelector(selector)`.

#### `proxyElement.getHost()`

Returns the host DOM element of the proxy.

```js
proxySelectorAll('.menu li').getHost() === document;
```

#### `proxyElement.materialize()`

Returns currently existing DOM nodes (or a single DOM node) represented by the proxy selector.

## Installation

```
npm i github:axtk/proxy-element
```
