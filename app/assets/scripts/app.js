import $ from 'jquery';
import MobileMenu from './modules/mobile-menu';
import StickyHeader from './modules/sticky-header';
import RevealOnScroll from './modules/reveal-on-scroll';

var mobileMenu = new MobileMenu();
var stickyHeader = new StickyHeader();

new RevealOnScroll($(".feature-item"), "90%");
new RevealOnScroll($(".testimonial"), "90%");