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
    this.header = $('#header');
    this.routing();
  }
  routesHandler(dataSrc, navLink) {
    const that = this;
    // show loading page
    this.loadingElement.fadeIn(500, () => {
      // initialize smooth scroll
      $.getScript(
        "https://cdnjs.cloudflare.com/ajax/libs/smooth-scroll/14.2.1/smooth-scroll.min.js",
        () => {
          new SmoothScroll("a.scroll-link", {
            speed: 700
          });
        }
      );
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
              onLeave: function (origin, destination, direction) {
                if (destination.index > 0) {
                  that.header.addClass('header--solid');
                } else {
                  that.header.removeClass('header--solid');
                }
              }
            });
          }
        );
      } else {
        if (that.fullpageSlider) {
          that.fullpageSlider.destroy("all");
        }
      }
      if (navLink === this.contactLink) {
        $.getScript(
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyCdpFC1FwAfGw8q-qA85XIx-W6Xu4U-8Ik',
          () => {
            const pos = {
              lat: 31.208683,
              lng: 29.937724
            };
            const map = new google.maps.Map(
              document.getElementById('map'), {
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
    });
    // remove loading page
    this.loadingElement.fadeOut(1000);
  }
  routing() {
    const router = new Navigo("#/", true);
    const that = this;
    router
      .on({
        "": function() {
          that.routesHandler("/docs/home.html", that.homeLink);
          console.log("home routing");
        },
        "/portfolio": function() {
          that.routesHandler("/docs/portfolio.html", that.portfolioLink);
          console.log("portf routing");
        },
        "/contact": function() {
          that.routesHandler("/docs/contact.html", that.contactLink);
        }
      })
      .resolve();
    router.notFound(() => {
      console.log("not found");
    });
  }
}
