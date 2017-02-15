import $ from 'jquery';

class MobileMenu
{
	constructor()
	{
		this.siteHeader = $(".site-header");
		this.menuIcon = $(".site-header__menu-icon");
		this.menuContent = $(".site-header__menu-content");
		this.events();
	}

	events()
	{
		this.menuIcon.click(this.toggleMenu.bind(this));
	}

	toggleMenu()
	{
		this.menuContent.toggleClass("site-header__menu-content--visible");
		this.menuContent.toggleClass("site-header--expanded");
		this.menuIcon.toggleClass("site-header__menu-icon--x");
	}
}

export default MobileMenu;