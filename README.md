# proxy-element

*[Event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_delegation) via virtual proxy elements*

## Usage

```js
import {proxySelector, proxySelectorAll} from 'proxy-element';

let container = document.querySelector('#container');

// delegating events from any existing and future elements
// within the container to the container itself:
proxySelector('h2', container).addEventListener('click', event => {
    // ...
});
proxySelectorAll('.list-item', container).addEventListener('click', event => {
    // ...
});

// unspecified container === document
proxySelector('h1').addEventListener('click', event => {
    // ...
});
```

## Exports

**`proxySelectorAll(selector, host?)`**<br>
**`proxySelector(selector, host?)`**

- **`selector: string`**
- **`host?: DOMNode | ProxyElement`**
  - Default: `document`.
- Both methods return a `ProxyElement`.

**`class ProxyElement`**

Represents a virtual context for elements (or a single element) matching a `selector` within a `host` element allowing for event subscription with all events being delegated to the `host` element.

- **`.addEventListener(type, listener, useCapture)`**
  - &rarr; [`EventTarget.addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- **`.removeEventListener(type, listener, useCapture)`**
  - &rarr; [`EventTarget.removeEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
- **`.proxySelectorAll(selector)`**
- **`.proxySelector(selector)`**
  - Both methods create a proxy with the same `host` element and a nested selector.
- **`.query()`**
  - Returns DOM nodes (or a single DOM node) currently matching the proxy selector.

## Installation

```
npm i github:axtk/proxy-element
```
