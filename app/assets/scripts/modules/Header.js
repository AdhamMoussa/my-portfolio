import $ from 'jquery';

export default class Header {
  constructor() {
    this.header = $('#header');
    this.menuIcon = $('#menu-icon');
    this.navMenu = $('#nav-menu');
    this.closeIcon = $('#nav-close');
    this.navMenuFunctionality();
  }
  navMenuFunctionality() {
    this.menuIcon.click(() => {
      this.navMenu.addClass('navigation-menu--visible');
    });
    this.closeIcon.click(() => {
      this.navMenu.removeClass('navigation-menu--visible');
    });
  }
}