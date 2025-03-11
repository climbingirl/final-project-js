import { Component } from "../core/Component";

export class List extends Component {
  setup() {
    this.$rootElement = document.createElement("div");
    this.$rootElement.className = "donates-container";

    const heading = document.createElement("h2");
    heading.className = "donates-container__title";
    heading.textContent = "Список донатов";

    const listContainer = document.createElement("div");
    listContainer.className = "donates-container__donates";
    this.$listContainer = listContainer;
    listContainer.addEventListener("click", this.handleItemDelete.bind(this));

    this.$rootElement.append(heading, listContainer);
  }

  addItem(item) {
    this.$listContainer.append(item.$rootElement);
  }

  deleteItem(item) {
    item.$rootElement.remove();
  }

  handleItemDelete(event) {
    const { target } = event;
    if (target.matches(".delete-button")) {
      this.props.onItemDelete(Number(target.dataset.donateId));
    }
  }
}
