
export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    /**
     *
     * @param element
     */
    addItem(element) {
        this._container.prepend(this._renderer(element));
    }

    clear() {
        this._container.innerHTML = "";
    }

    renderItems() {
        this.clear();

        this._renderedItems.forEach(item => {
            this.addItem(item);
        });
    }
}
