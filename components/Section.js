export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = containerSelector;

    }

    addItem(element){
        this._container.prepend(element)
    }

    renderItems() {

        this._renderedItems.forEach(item => {
            const renderItem = this._renderer(item);
            this._container.append(renderItem);
        });
    }
}
