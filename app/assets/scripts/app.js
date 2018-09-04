import $ from 'jquery';
import Header from './modules/Header';
import Routes from './modules/Routes';



const header = new Header();
const routing = new Routes();


$(function () {
  $('#loading').fadeOut();
});