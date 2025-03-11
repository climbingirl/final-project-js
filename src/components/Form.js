import { Component } from "../core/Component";

export class Form extends Component {
  setup(props) {
    this.state = {
      amount: "",
    };

    this.$rootElement = document.createElement("form");
    this.$rootElement.className = "donate-form";
    this.$rootElement.addEventListener("submit", this.handleSubmit.bind(this));

    const amountLabel = document.createElement("label");
    amountLabel.className = "donate-form__input-label";
    amountLabel.textContent = "Введите сумму в $";

    const amountInput = document.createElement("input");
    amountInput.className = "donate-form__donate-input";
    amountInput.name = "amount";
    amountInput.type = "number";
    amountInput.max = "100";
    amountInput.min = "1";
    amountInput.required = true;
    amountInput.textContent = this.state.amount;
    amountInput.addEventListener("input", this.handleInput.bind(this));
    amountLabel.append(amountInput);
    this.$amountInput = amountInput;

    const submitButton = document.createElement("button");
    submitButton.className = "donate-form__submit-button";
    submitButton.type = "submit";
    submitButton.disabled = true;
    submitButton.textContent = "Задонатить";
    this.$submitButton = submitButton;

    this.$rootElement.append(amountLabel, submitButton);
  }

  handleInput(event) {
    this.state.amount = event.target.value;
    if (this.isValidAmount) {
      this.$submitButton.disabled = false;
    } else {
      this.$submitButton.disabled = true;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isValidAmount) {
      this.props.onSubmit(Number(this.state.amount));
      this.state.amount = "";
      this.$amountInput.value = "";
    }
  }

  get isValidAmount() {
    const amount = Number(this.state.amount);
    return amount >= 1 && amount <= 100;
  }
}
