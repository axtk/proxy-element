class ProxyElement {
    constructor(element, selector, all = false) {
        if (typeof element === 'string') {
            this.element = document;
            this.selector = element;
        }
        else if (element instanceof ProxyElement) {
            this.element = element.element;
            this.selector = element.selector + ' ' + (selector || '');
        }
        else {
            this.element = element || document;
            this.selector = selector;
        }

        this.selector = String(this.selector || '').trim();
        this.all = all;
        this.listeners = [];
    }
    querySelector(selector) {
        return new ProxyElement(this, selector);
    }
    querySelectorAll(selector) {
        return new ProxyElement(this, selector, true);
    }
    addEventListener(type, handler, useCapture = false) {
        let {element, selector, all, listeners} = this;

        let proxyHandler = event => {
            if (!selector)
                handler.call(element, event);
            else if (all) {
                for (let t = event.target; t; t = t.parentNode) {
                    if (typeof t.matches === 'function' && t.matches(selector)) {
                        handler.call(t, event);
                        break;
                    }
                }
            }
            else {
                let e = element.querySelector(selector);
                for (let t = event.target; e && t; t = t.parentNode) {
                    if (t === e) {
                        handler.call(t, event);
                        break;
                    }
                }
            }
        };

        element.addEventListener(type, proxyHandler, useCapture);
        listeners.push({type, handler, useCapture, proxyHandler});
    }
    removeEventListener(type, handler, useCapture = false) {
        let {element, listeners} = this;

        for (let i = listeners.length - 1; i >= 0; i--) {
            let L = listeners[i];

            if (L.type === type && L.handler === handler && L.useCapture === useCapture) {
                element.removeEventListener(type, L.proxyHandler, useCapture);
                listeners.splice(i, 1);
            }
        }
    }
    getElement() {
        return this.element;
    }
}

export default ProxyElement;
