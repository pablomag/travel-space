import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';
import Waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader
{
	constructor()
	{
		this.siteHeader = $(".site-header");
		this.headerTrigger = $(".large-hero__title");
		this.createHeaderWaypoint();

		this.headerLinks = $(".primary-nav a");
		this.pageSection = $(".page-section");
		this.createPageSectionWaypoints();

		this.addSmoothScrolling();
	}

	addSmoothScrolling()
	{
		this.headerLinks.smoothScroll();
	}

	createHeaderWaypoint()
	{
		var that = this;

		new Waypoint(
		{
			element: this.headerTrigger[0],
			handler: function(direction)
			{
				if(direction == "down")
				{
					that.siteHeader.addClass("site-header--dark");
				} else {

					that.siteHeader.removeClass("site-header--dark");
				}
			}
		});
	}

	createPageSectionWaypoints()
	{
		var that = this;

		this.pageSection.each(function()
		{
			var currentPageSection = this;

			new Waypoint(
			{
				element: currentPageSection,
				handler: function(direction)
				{
					if(direction == "down")
					{
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");

						that.headerLinks.removeClass("current-link");
						$(matchingHeaderLink).addClass("current-link");
					}
				},
				offset: "18%"
			});

			new Waypoint(
			{
				element: currentPageSection,
				handler: function(direction)
				{
					if(direction == "up")
					{
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");

						that.headerLinks.removeClass("current-link");
						$(matchingHeaderLink).addClass("current-link");
					}
				},
				offset: "-40%"
			});
		});
	}
}

export default StickyHeader;