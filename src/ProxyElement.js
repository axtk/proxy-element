class ProxyElement {
    constructor(hostElement, selector, all = false) {
        if (typeof hostElement === 'string') {
            this.hostElement = document;
            this.selector = hostElement;
        }
        else if (hostElement instanceof ProxyElement) {
            this.hostElement = hostElement.hostElement;
            this.selector = hostElement.selector + ' ' + (selector || '');
        }
        else {
            this.hostElement = hostElement || document;
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
        let {hostElement, selector, all, listeners} = this;

        let proxyHandler = event => {
            if (!selector)
                handler.call(hostElement, event);
            else if (all) {
                for (let t = event.target; t; t = t.parentNode) {
                    if (typeof t.matches === 'function' && t.matches(selector)) {
                        handler.call(t, event);
                        break;
                    }
                }
            }
            else {
                let e = hostElement.querySelector(selector);
                for (let t = event.target; e && t; t = t.parentNode) {
                    if (t === e) {
                        handler.call(t, event);
                        break;
                    }
                }
            }
        };

        hostElement.addEventListener(type, proxyHandler, useCapture);
        listeners.push({type, handler, useCapture, proxyHandler});
    }
    removeEventListener(type, handler, useCapture = false) {
        let {hostElement, listeners} = this;

        for (let i = listeners.length - 1; i >= 0; i--) {
            let L = listeners[i];

            if (L.type === type && L.handler === handler && L.useCapture === useCapture) {
                hostElement.removeEventListener(type, L.proxyHandler, useCapture);
                listeners.splice(i, 1);
            }
        }
    }
    getHost() {
        return this.hostElement;
    }
    materialize() {
        let {hostElement, selector, all} = this;

        if (!hostElement)
            return;

        if (!selector)
            return hostElement;

        return all ?
            hostElement.querySelectorAll(selector) :
            hostElement.querySelector(selector);
    }
}

export default ProxyElement;
