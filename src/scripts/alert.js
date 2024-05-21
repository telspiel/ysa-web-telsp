const alert = require("./../partials/alert.hbs");

class Alert {
  constructor() {
    $(".contant-holder,main").prepend(
      $("<div />", {
        id: "alert-box",
        class: "alert-box"
      })
    );
    this.container = $("#alert-box");
  }

  onAlert(options) {
    clearTimeout(this.clearTimer);
    this.clearTimer = window.setTimeout(() => {
      this.container.empty();
    }, options.clearTime || 5000);
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  success(message, options = {}) {
    this.container.append(
      alert({
        message,
        type: "success"
      })
    );
    this.onAlert(options);
  }

  error(message, options = {}) {
    this.container.append(
      alert({
        message,
        type: "danger"
      })
    );
    this.onAlert(options);
  }

  info(message, options = {}) {
    this.container.append(
      alert({
        message,
        type: "warning"
      })
    );
    this.onAlert(options);
  }

  message(message, options = {}) {
    this.container.append(
      alert({
        message,
        type: "primary"
      })
    );
    this.onAlert(options);
  }

  clearAll() {
    this.container.empty();
  }
}

export default new Alert();
