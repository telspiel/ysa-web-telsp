class Loader {
  constructor() {
    this.$mainLoader = $("#main-loader");
  }

  showMainLoader() {
    this.$mainLoader.fadeIn();
  }

  hideMainLoader() {
    this.$mainLoader.fadeOut();
  }
}

export default new Loader();
