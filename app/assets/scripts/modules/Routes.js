import $ from "jquery";
import Navigo from "navigo";

export default class Routes {
  constructor() {
    this.mainElement = $("#page-content");
    this.loadingElement = $("#loading");
    this.navLinks = $(".navigation-menu__list-item");
    this.navMenu = $("#nav-menu");
    this.homeLink = $("#home-link");
    this.portfolioLink = $("#portfolio-link");
    this.contactLink = $("#contact-link");
    this.routing();
  }
  routesHandler(dataSrc, navLink) {
    const that = this;
    // show loading page
    this.loadingElement.fadeIn(500, () => {
      // close nav menu
      this.navMenu.removeClass("navigation-menu--visible");
      // remove active class from all nav links
      this.navLinks.each(function() {
        $(this).removeClass("navigation-menu__list-item--active");
      });
      // add active class to the target nav link
      navLink.addClass("navigation-menu__list-item--active");
      // remove main content
      this.mainElement.html("");
      // load target html and append to main element
      this.mainElement.load(dataSrc);
      if (navLink === this.portfolioLink) {
        // get fullpage.js script and then initialize
        $.getScript(
          "https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.0.2/fullpage.js",
          () => {
            that.fullpageSlider = new fullpage("#fullpage", {
              licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
              navigation: true,
              loopBottom: true,
              afterLoad: function () {
                // remove loading page
                $('#loading').fadeOut(800);
              }
            });
          }
        );
      } else {
        if (that.fullpageSlider) {
          that.fullpageSlider.destroy("all");
          // remove loading page
          this.loadingElement.fadeOut(500);
        }
      }
    });
  }
  routing() {
    const router = new Navigo("#/", true);
    const that = this;
    router
      .on({
        "": function() {
          that.routesHandler("/portfolio/home.html", that.homeLink);
          console.log("home routing");
        },
        "/portfolio": function() {
          that.routesHandler("portfolio/portfolio.html", that.portfolioLink);
          console.log("portf routing");
        },
        "/contact": function() {
          that.routesHandler("portfolio/contact.html", that.contactLink);
        }
      })
      .resolve();
    router.notFound(() => {
      console.log("not found");
    });
  }
}
