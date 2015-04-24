/**
 * respondJsEvents 0.0.1 - jQuery Plugin
 * http://www.antiblanks.com/
 * Copyright (c) 2014 Daniel Ivanovic
 * Licensed under MIT and GPL
 * Date: Fri, May 24 2015 15:58:56 -0800
 */

if (!window["$"]) {
	var jQueryErrorMessage = "jquery-respondjsevents.js: Error: JQuery must be defined";
	if (window["console"])
		console.log(jQueryErrorMessage);
	else
		alert(jQueryErrorMessage);
}

(function ($) {
	if (!$.fn.respondJsEvents) {
		$.fn.respondJsEvents = function (options) {
			var self = this,
				options = $.extend({
					"debugLevel": 1,
					"pollingIterationsMax": 20
				}, options),
				viewModePollingTimer,
				viewModes,
				currentViewMode,
				initiated = false,
				$element = $(this);

			// Events

			self.RESPONDJS_UPDATE_COMPLETE = "respondJsEvents.onRespondJsUpdateComplete";
			
			// Public

			/**
			 * startPolling
			 * Public pointer to internal startPolling method
			 */
			self.startPolling = function() {
				startPolling();
			};

			/**
			 * getData
			 * Returns the current state object
			 */
			self.getStateData = function() {
				return {
					"currentViewMode": currentViewMode,
					"viewModes": viewModes
				};
			};

			/**
			 * debug
			 * Debug based upon debug level
			 */
			function debug() {
				if (!window["console"])
					return;
				if (options.debugLevel != 0)
					console.log("jquery-respondjsevents.js:", arguments);
				if (options.debugLevel == 2) {
					if (typeof arguments.join == "function") {
						alert("jquery-respondjsevents.js: " + arguments.join(",")); 
					}
					else {
						var alertString = "jquery-respondjsevents.js: ";
						for (var i=0; i<arguments.length; i++) {
							if (i != 0)
								alertString += ", ";
							alertString += arguments[i];
						}
						alert(alertString);
					}
				}
			};

			/**
			 * init
			 * Initiate the plugin
			 */
			function init() {
				initiated = true;
				var $viewModes = $element.find(".respond-js-view-mode");
				if ($viewModes.length <= 1) {
					debug("Error:", "Requires at least two view modes");
					initiated = false;
					return;
				}
				viewModes = [];
				$.each($viewModes, function(index, viewMode) {
					var $viewMode = $(viewMode);
					viewModes.push($viewMode.attr("data-view-mode"));
				});
				debug("Info:", "init();",  viewModes);
				startPolling();
			};

			/**
			 * startPolling
			 * Start polling the DOM for respond.js behavior
			 */
			function startPolling() {
				if (!initiated)
					return;
				var viewModePollingTimerCount = 0;
				clearInterval(viewModePollingTimer);
				viewModePollingTimer = setInterval(function() {
					if (viewModePollingTimerCount > options.pollingIterationsMax) // @note: Stop the loop running forever
						clearInterval(viewModePollingTimer);
					var newViewMode = $element.find(".respond-js-view-mode:visible").attr("data-view-mode");
					debug("Info:", "polling();",  newViewMode, currentViewMode);
					if (newViewMode != currentViewMode) {
						clearInterval(viewModePollingTimer);
						currentViewMode = newViewMode;
						$element.trigger(self.RESPONDJS_UPDATE_COMPLETE, self.getStateData());
					}
					viewModePollingTimerCount++;
				}, 250);
			};

			// Init

			$element.data("respondJsEvents", self);

			$(window).resize(function(evt) {
				startPolling();
			});

			$(document).ready(function(evt) {
				init();
			});

			return this;
		}
	}
}(jQuery));