const input = require("./../partials/form/input.hbs");
const select = require("./../partials/form/select.hbs");
const textarea = require("./../partials/form/textarea.hbs");
const radio = require("./../partials/form/radio.hbs");
const checkbox = require("./../partials/form/checkbox.hbs");
const button = require("./../partials/form/button.hbs");

class Form {
  constructor(form) {
    this.form = form;
  }

  getFields(fields) {
    if (fields.constructor !== Array || !fields.length) {
      return null;
    }
    return fields.map(field => {
      switch (field.type) {
        case "text":
        case "password":
        case "number":
        case "email":
        case "tel":
        case "file":
          return input(field);
        case "select":
          return select(field);
        case "textarea":
          return textarea(field);
        case "radio":
          if (field.value) {
            const option = field.options.find(o => o.value === field.value);
            if (!!option) {
              field.options.forEach(o => {
                o.checked = false;
              });
              option.checked = true;
            }
          } else {
            const checked = field.options.find(o => o.checked);
            !checked && (field.options[1].checked = true);
          }
          return radio(field);
        case "checkbox":
          return checkbox(field);
        default:
          return null;
      }
    });
  }

  getButtons(buttons) {
    if (buttons && buttons.constructor === Array && buttons.length) {
      return buttons.map(btn => button(btn));
    }
    return null;
  }

  render(container) {
    $(container).html(
        this.getFields(this.form.fields),
        this.getButtons(this.form.buttons)
    );
  }
}

export default Form;
