import checkmarkSvg from "./checkmark.svg";
import "./checkbox.css";

export class Checkbox {
  constructor(checked, onChangeCallback, id = "") {
    this.checked = checked;
    this.onChangeCallback = onChangeCallback;
    this.id = id;
    this.checkmark = undefined;
  }

  onChange(e) {
    this.checked = e.target.checked;
    this.onChangeCallback(e);
  }

  onChangeUpdateIcon(e) {
    e.target.checked
      ? this.checkmark.classList.remove("hidden")
      : this.checkmark.classList.add("hidden");
  }

  renderImg() {
    const checkmarkImg = document.createElement("img");
    checkmarkImg.alt = "checkmark";
    checkmarkImg.src = checkmarkSvg;
    checkmarkImg.classList.add("checkmark");
    if (!this.checked) checkmarkImg.classList.add("hidden");
    return checkmarkImg;
  }

  renderInput() {
    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.name = "checkbox";
    checkboxInput.checked = this.checked ? true : false;
    checkboxInput.classList.add("checkbox-input");
    if (this.id) checkboxInput.id = this.id;
    return checkboxInput;
  }

  renderCheckboxLabel() {
    const checkbox = document.createElement("label");
    checkbox.classList.add("checkbox");
    return checkbox;
  }

  render() {
    const checkbox = this.renderCheckboxLabel();
    const checkboxInput = this.renderInput();
    checkbox.appendChild(checkboxInput);
    this.checkmark = this.renderImg();
    checkbox.appendChild(this.checkmark);

    checkboxInput.addEventListener("change", (e) => {
      this.onChangeUpdateIcon(e);
      this.onChange(e);
    });
    return checkbox;
  }
}
