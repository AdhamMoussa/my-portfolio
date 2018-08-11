import $ from 'jquery';
import Header from './modules/Header';
// import MenuLinks from './modules/MenuLinks';
import Routes from './modules/Routes';



const header = new Header();
const routing = new Routes();
// const navMenu = new MenuLinks();

$(function () {
  $('#loading').fadeOut();
});