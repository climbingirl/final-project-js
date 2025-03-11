import { Component } from "../core/Component";
import { formatDate } from "../utils";

export class ListItem extends Component {
  setup(props) {
    this.state = {
      id: Date.now(),
      date: new Date(),
      amount: props.amount,
    };

    this.$rootElement = document.createElement("div");
    this.$rootElement.className = "donate-item";

    const donateAmount = document.createElement("b");
    donateAmount.textContent = `${formatDate(this.state.date)} - $${this.state.amount}`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.dataset.donateId = this.state.id;
    deleteButton.textContent = "Удалить";

    this.$rootElement.append(donateAmount, deleteButton);
  }
}
