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
    this.header = $("#header");
    this.current = null;
    this.fullpage = false;
    this.routing();
  }
  initLazySizes() {
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.1/lazysizes.min.js');
  }
  initSmoothScroll() {
    $.getScript(
      "https://cdnjs.cloudflare.com/ajax/libs/smooth-scroll/14.2.1/smooth-scroll.min.js",
      () => {
        new SmoothScroll("a.scroll-link", {
          speed: 700
        });
      }
    );
  }
  switchContent(dataSrc, type) {
    const that = this;
    this.mainElement.html("");
    // load target html and append to main element
    this.mainElement.load(dataSrc, null, function() {
      if (type === "portfolio") {
        // set section padding-top
        const headerHeight = that.header.height();
        $(".portfolio__project").each(function() {
          $(this).css("padding-top", `${headerHeight+50}px`);
        });
      }
    });
  }
  switchActiveLink(navLink) {
    this.navLinks.each(function() {
      $(this).removeClass("navigation-menu__list-item--active");
    });
    // add active class to the target nav link
    navLink.addClass("navigation-menu__list-item--active");
  }
  initGoogleMap() {
    $.getScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCdpFC1FwAfGw8q-qA85XIx-W6Xu4U-8Ik",
      () => {
        const pos = {
          lat: 31.208683,
          lng: 29.937724
        };
        const map = new google.maps.Map(document.getElementById("map"), {
          center: pos,
          zoom: 16
        });
        const marker = new google.maps.Marker({
          position: pos,
          map: map
        });
      }
    );
  }
  initFullpage() {
    this.fullpage = true;
    const that = this;
    $.getScript(
      "https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.0.2/vendors/scrolloverflow.min.js",
      () => {
        $.getScript(
          "https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.0.2/fullpage.extensions.min.js",
          () => {
            that.fullpageSlider = new fullpage("#fullpage", {
              licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
              navigation: true,
              loopBottom: true,
              scrollOverflow: true,
              touchSensitivity: 18,
              scrollOverflowReset: true,
              onLeave: function(origin, destination, direction) {
                if (destination.index > 0) {
                  that.header.addClass("header--solid");
                } else {
                  that.header.removeClass("header--solid");
                }
              }
            });
          }
        );
      }
    );
  }
  destroyFullPage() {
    if (this.fullpage) {
      this.fullpageSlider.destroy("all");
      this.fullpage = false;
    }
  }
  routesHandler(dataSrc, navLink, type) {
    this.current = type;
    // show loading page
    this.loadingElement.fadeIn(500);
    // hide Nav menu
    this.navMenu.removeClass("navigation-menu--visible");
    if (type !== "portfolio") {
      this.destroyFullPage();
    }
    this.switchActiveLink(navLink);
    this.switchContent(dataSrc, type);
    if (type === "home") {
      this.initSmoothScroll();
      this.initLazySizes();
    } else if (type === "portfolio") {
      this.initFullpage();
    } else if (type === "contact") {
      this.initGoogleMap();
    }
    // remove loading page
    this.loadingElement.fadeOut(1000);
  }
  routing() {
    const router = new Navigo("#/", true);
    const that = this;
    router
      .on({
        "": function() {
          that.routesHandler("/home.html", that.homeLink, "home");
        },
        "/portfolio": function() {
          that.routesHandler(
            "/portfolio.html",
            that.portfolioLink,
            "portfolio"
          );
        },
        "/contact": function() {
          that.routesHandler("/contact.html", that.contactLink, "contact");
        }
      })
      .resolve();
    router.notFound(() => {
      console.log("not found");
    });
  }
}
