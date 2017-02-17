import $ from 'jquery';
import MobileMenu from './modules/mobile-menu';
import StickyHeader from './modules/sticky-header';
import RevealOnScroll from './modules/reveal-on-scroll';
import Modal from './modules/open-modal';

var mobileMenu = new MobileMenu();
var stickyHeader = new StickyHeader();
var modal = new Modal();

new RevealOnScroll($(".feature-item"), "90%");
new RevealOnScroll($(".testimonial"), "90%");