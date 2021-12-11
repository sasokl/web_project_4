
export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    /**
     * Adds element to the container.
     * @param element
     */
    addItem(element) {
        this._container.prepend(this._renderer(element));
    }
    /**
     * Clears the container
     */
    clear() {
        this._container.innerHTML = "";
    }
    /**
     * Render the items list.
     */
    renderItems() {
        this.clear();

        this._renderedItems.forEach(item => {
            this.addItem(item);
        });
    }
}
