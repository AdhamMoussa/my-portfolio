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
    this.routing();
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
  switchContent(dataSrc) {
    this.mainElement.html("");
    // load target html and append to main element
    this.mainElement.load(dataSrc);
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
    const that = this;
    $.getScript(
      "https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.0.2/fullpage.js",
      () => {
        that.fullpageSlider = new fullpage("#fullpage", {
          licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
          navigation: true,
          loopBottom: true,
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
  destroyFullPage() {
    if (this.fullpageSlider) {
      this.fullpageSlider.destroy("all");
    }
  }
  routesHandler(dataSrc, navLink, type) {
    // show loading page
    this.loadingElement.fadeIn(500);
    // hide Nav menu
    this.navMenu.removeClass("navigation-menu--visible");
    this.switchActiveLink(navLink);
    this.switchContent(dataSrc);
    if (type !== 'portfolio') {
      this.destroyFullPage();
    }
    if (type === 'home') {
      this.initSmoothScroll();
    } else if (type === 'portfolio') {
      this.initFullpage();
    } else if (type === 'contact') {
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
          that.routesHandler("/my-portfolio/home.html", that.homeLink, 'home');
          console.log("home routing");
        },
        "/portfolio": function() {
          that.routesHandler(
            "/my-portfolio/portfolio.html",
            that.portfolioLink,
            'portfolio'
          );
          console.log("portf routing");
        },
        "/contact": function() {
          that.routesHandler("/my-portfolio/contact.html", that.contactLink, 'contact');
        }
      })
      .resolve();
    router.notFound(() => {
      console.log("not found");
    });
  }
}
