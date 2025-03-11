import { Component } from "../core/Component";
import { Form } from "./Form";
import { List } from "./List";
import { ListItem } from "./ListItem";

export class App extends Component {
  setup(props) {
    this.state = {
      total: 0,
      donates: [],
    };

    this.$rootElement = document.createElement("div");
    this.$rootElement.className = "app";

    const totalHeading = document.createElement("h1");
    totalHeading.className = "total-amount";
    totalHeading.textContent = "Итого: $";

    const totalSpan = document.createElement("span");
    totalSpan.textContent = this.state.total;
    totalHeading.append(totalSpan);
    this.$totalSpan = totalSpan;

    const donateForm = new Form({ onSubmit: this.onItemCreate.bind(this) });
    const donateList = new List({ onItemDelete: this.onItemDelete.bind(this) });
    this.$donateList = donateList;

    this.$rootElement.append(
      totalHeading,
      donateForm.$rootElement,
      donateList.$rootElement
    );
  }

  onItemCreate(amount) {
    const item = new ListItem({ amount });
    this.state.donates.push(item);
    this.$donateList.addItem(item);
    this.state.total += amount;
    this.$totalSpan.textContent = this.state.total;
  }

  onItemDelete(id) {
    const item = this.state.donates.find((donate) => donate.state.id === id);
    if (item) {
      this.state.donates = this.state.donates.filter(
        (donate) => donate !== item
      );
      this.$donateList.deleteItem(item);
      const amount = item.state.amount;
      this.state.total -= amount;
      this.$totalSpan.textContent = this.state.total;
    }
  }
}
