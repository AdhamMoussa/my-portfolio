import $ from "jquery";

export default class MenuLinks {
  constructor() {
    this.pageMainElement = $("main#page-content");
    this.homeLink = $("#home-link");
    this.portfolioLink = $("#portfolio-link");
    this.loadingElement = $("#loading");
    this.navMenu = $("#nav-menu");
    this.portfolioLinkHandler();
    this.homeLinkHandler();
  }
  linkHandler(element, dataSrc) {
    element
      .parent()
      .addClass("navigation-menu__list-item--active")
      .siblings()
      .removeClass("navigation-menu__list-item--active");
    this.pageMainElement.html("");
    this.pageMainElement.load(dataSrc);
    this.navMenu.removeClass("navigation-menu--visible");
  }
  homeLinkHandler() {
    this.homeLink.click(e => {
      this.loadingElement.fadeIn(500, () => {
        this.linkHandler(this.homeLink, "/home.html");
      });
      this.loadingElement.fadeOut(500);
    });
  }
  portfolioLinkHandler() {
    this.portfolioLink.click(e => {
      this.loadingElement.fadeIn(500, () => {
        this.linkHandler(this.portfolioLink, "/portfolio.html");
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.0.2/fullpage.js", () => {
          new fullpage('#fullpage', {
            licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
            navigation: true,
            loopBottom: true
          });
        });
      });
      this.loadingElement.fadeOut(500);
    });
  }
}
