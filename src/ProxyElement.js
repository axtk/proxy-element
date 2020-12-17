class ProxyElement {
    constructor(host, selector, all = false) {
        if (typeof host === 'string') {
            this.host = document;
            this.selector = host;
        }
        else if (host instanceof ProxyElement) {
            this.host = host.host;
            this.selector = host.selector + ' ' + (selector || '');
        }
        else {
            this.host = host || document;
            this.selector = selector;
        }

        this.selector = String(this.selector || '').trim();
        this.all = all;
        this.listeners = [];
    }
    proxySelector(selector) {
        return new ProxyElement(this, selector);
    }
    proxySelectorAll(selector) {
        return new ProxyElement(this, selector, true);
    }
    addEventListener(type, handler, useCapture = false) {
        let {host, selector, all, listeners} = this;

        let proxyHandler = event => {
            if (!selector)
                handler.call(host, event);
            else if (all) {
                for (let t = event.target; t; t = t.parentNode) {
                    if (typeof t.matches === 'function' && t.matches(selector)) {
                        handler.call(t, event);
                        break;
                    }
                }
            }
            else {
                let e = host.querySelector(selector);
                for (let t = event.target; e && t; t = t.parentNode) {
                    if (t === e) {
                        handler.call(t, event);
                        break;
                    }
                }
            }
        };

        host.addEventListener(type, proxyHandler, useCapture);
        listeners.push({type, handler, useCapture, proxyHandler});
    }
    removeEventListener(type, handler, useCapture = false) {
        let {host, listeners} = this;

        for (let i = listeners.length - 1; i >= 0; i--) {
            let L = listeners[i];

            if (L.type === type && L.handler === handler && L.useCapture === useCapture) {
                host.removeEventListener(type, L.proxyHandler, useCapture);
                listeners.splice(i, 1);
            }
        }
    }
    getHost() {
        return this.host;
    }
    query() {
        let {host, selector, all} = this;

        if (!host)
            return;

        if (!selector)
            return host;

        return all ?
            host.querySelectorAll(selector) :
            host.querySelector(selector);
    }
}

export default ProxyElement;
