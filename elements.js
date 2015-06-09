/**
*  ElementsJS Framwwork.
*  A little framework to manipulate the DOM Element.
*/

;(function(window, document, undefined) {
	"use strict";

	// Public variables
	var i, lenght, displayProp = null;


	/**
	*	ElementsJS base framework.
	*
	*	Uses this method to select a DOM element
	*
	*	@el: element target
	*	@event: the event's name
	*	@handler: the function handler events
	*/
	var els = function(selector) {

		// Checks if 'this' is instance of ElementsJS.
		if(!(this instanceof els))
			return new els(selector);

		if(selector) {
			if(typeof selector == "string") {

				// Creates a element properties on els object
				this.element = document.querySelectorAll(selector);
			}
			else if(Array.isArray(selector)) {
				this.element = [];

				// scan the elements array
				i = 0;
				length = selector.length;
				for(i; i < length; i++) {
					this.element.push(selector[i]);
				}
			}
			else if(typeof selector == "object") {

				// Attributes the selector to element properties on els object
				this.element = [selector];
			}
			else {
				this.element = [];
			}
		}
		else {
			this.element = [];
		}

		// Return the scope
		return this;
	};



	/**
	*	Register a event to DOM element
	*
	*	@el: element target
	*	@event: the event's name
	*	@handler: the function handler events
	*/
	els.prototype.on = function(event, handler) {

		// Scan the elements array
		i = 0;
		length = this.element.length;
		for(i; i < length; i++) {

			// Add event for each element of elements array
			this.element[i][window.addEventListener ? 'addEventListener' : 'attachEvent'](event, handler, false);
		}

		// Return the scope
		return this;
	}



	/**
	*	Remove a event to DOM element
	*
	*	@el: element target
	*	@event: the event's name
	*	@callback: the function callback when event is removed
	*/
	els.prototype.off = function(el, event, callback) {

      i = 0;
		length = this.element.length;
		for(i; i < length; i++) {

			// Add event for each element of elements array
			this.element[i][window.removeEventListener ? 'removeEventListener' : 'detachEvent'](event, handler, false);
		}

		// Return the scope
		return this;
	};



	/**
	*	Find a child element
	*
	*	@selector: a CSS selector string or DOM element
	*/
	els.prototype.find = function(selector) {

		// Returns a new els instance with "find element"
		return new els(selector);
	};


	/**
	*	Gets a parent element
	*
	*/
	els.prototype.parent = function() {

		// List of parent elements
		var parents = [];

		// Scan the elements array
		i = 0;
		length = this.element.length;
		for(i; i < length; i++) {

			// For each element parent, add to list
			parents.push(this.element[i].parentElement);
		}

		// Returns a new els instance of parents elements
		return new els(parents);
	};



	/**
	*	Appends HTML contents to DOM Element
	*
	*/
	els.prototype.append = function(content) {

		// Checks if content is not null
		if(content) {

			// Checks if content is string
			if(typeof content == "string") {

				// Scan the elements array
				i = 0;
				length = this.element.length;
				for(i; i < length; i++) {

					// Add the content string to inner html
					this.element[i].innerHTML += content;
				}
			}
			// Checks if content is DOM Element object
			else if(typeof content == "object") {

				// Scan the elements array
				i = 0;
				length = this.element.length;
				for(i; i < length; i++) {

					// Add DOM element to select element
					this.element[i].appendChild(content);
				}
			}
		}

		// Return the scope
		return this;
	};



	/**
	*	Add a class to DOM element
	*
	*	@className: name of the class
	*/
	els.prototype.addClass = function(className) {

		// Checks if className is not null
		if(className) {

			// Scan the elements array
			i = 0;
			length = this.element.length;
			for(i; i < length; i++) {

				// Checks if the class has in the element
				if(this.element[i].className.indexOf(" " + className) == -1) {

					// Add class on element
					this.element[i].className += " " + className;
				}
			}
		}

		// Return the scope
		return this;
	};



	/**
	*	Remove a class to DOM element
	*
	*	@className: name of the class
	*/
	els.prototype.removeClass = function(className) {

		// Checks if className is not null
		if(className) {

			// Scan the elements array
			i = 0;
			length = this.element.length;
			for(i; i < length; i++) {

				// Checks if the class has in the element
				if(this.element[i].className.indexOf(" " + className) > -1) {

					// Removes the class from element
					this.element[i].className = this.element[i].className.replace(new RegExp("\\s?\\b" + className + "\\b", "g"), "");
				}
			}
		}

		// Return the scope
		return this;
	};



	/**
	*	Set a new attribute or gets a attribute on DOM Element
	*
	*	@attr: name of the attribute
	*	@value: value of the attribute
	*/
	els.prototype.attr = function(attr, value) {

		// Checks if has element on els.element array
		if(this.element.length > 0) {

			// Checks if has attribute name and value, the is a set method
			if(attr && value) {

				// scan the elements array
				i = 0;
				length = this.element.length;
				for(i; i < length; i++) {

					this.element[i].setAttribute(attr, value);
				}
			}
			// Else the is a get method
			else {
				// Returns the attribute from first element match
				return this.element[0].getAttribute(attr);
			}
		}

		// Return the scope
		return this;
	};



	/**
	*	Gets or set a innerHMTL
	*
	*	@value: value of the inner HTML
	*/
	els.prototype.html = function(value) {

		// Checks if has element on els.element array
		if(this.element.length > 0) {

			// Check if value is defined, then is set method
			if(value !== undefined) {
				// scan the elements array
				i = 0;
				length = this.element.length;
				for(i; i < length; i++) {

					this.element[i].innerHTML = value;
				}
			}
			// Else is get method. Returns the innerHTML of the first match element
			else {
				return this.element[0].innerHTML;
			}
		}

		// Return the scope
		return this;
	};



	/**
	*	Shows a element
	*
	*/
	els.prototype.show = function() {

		// scan the elements array
		i = 0;
		for(i; i < this.element.length; i++) {

			// Checks if supports IE
			if(this.element[i].currentStyle) {
				displayProp = this.element[i].currentStyle["display"];
			}
			// Checks if supports Others Browsers
			else if (window.getComputedStyle) {
				displayProp = window.getComputedStyle(this.element[i], null).getPropertyValue("display");
			}

			// Checks the display property
			if(displayProp != null && displayProp == "none") {
				this.element[i].style.display = "block";
			}
		}

		// Return the scope
		return this;
	};



	/**
	*	Hides a element
	*
	*/
	els.prototype.hide = function() {

		// scan the elements array
		i = 0;
		length = this.element.length;
		for(i; i < length; i++) {

			// Checks if supports IE
			if(this.element[i].currentStyle) {
				displayProp = this.element[i].currentStyle["display"];
			}
			// Checks if supports Others Browsers
			else if (window.getComputedStyle) {
				displayProp = window.getComputedStyle(this.element[i], null).getPropertyValue("display");
			}

			// Checks the display property
			if(displayProp != null && displayProp != "none") {
				this.element[i].style.display = "none";
			}
		}

		// Return the scope
		return this;
	};



	/**
	*	Shows a element
	*
	*/
	els.prototype.toggle = function() {

		// scan the elements array
		i = 0;
		length = this.element.length;
		for(i; i < length; i++) {

			// Checks if supports IE
			if(this.element[i].currentStyle) {
				displayProp = this.element[i].currentStyle["display"];
			}
			// Checks if supports Others Browsers
			else if (window.getComputedStyle) {
				displayProp = window.getComputedStyle(this.element[i], null).getPropertyValue("display");
			}

			// Checks the display property
			(displayProp != null && displayProp == "none") ?
				this.element[i].style.display = "block" : this.element[i].style.display = "none";
		}

		// Return the scope
		return this;
	};



	/**
	*	Parse a string to HMTL
	*
	*	@value: value of the string HTML
	*/
	els.parseHTML = function(value) {
		var d = document.createElement("div");
		d.innerHTML = value;

		return d.firstChild;
	};


	// Exposing to els to global
	window.els = els;

})(window, document);
