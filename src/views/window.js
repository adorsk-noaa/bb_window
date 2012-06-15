define([
	"jquery",
	"use!backbone",
	"use!underscore",
	"use!ui",
	"jqwindow",
		],
function($, Backbone, _, ui, jqwindow){

	// Currently a wrapper around jquery.window <https://github.com/adorsk/jquery.window>
	var WindowView = Backbone.View.extend({
		tagName: "div",
		events: {},

		initialize: function(){
			if (! this.model){
				this.model = new Backbone.Model();
			}
			var _this = this;
			this.w = $.window({
				"title": this.model.get('title'),
				onResize: function(){ _this.resize();},
				afterResize: function(){_this.resizeStop();},
				afterMinimize: function(){_this.resizeStop();},
				afterMaximize: function(){_this.resizeStop();},
				afterCascade: function(){_this.resizeStop();}
			});
			this.el = this.w.getContainer()[0];
			$(this.el).addClass("window");

			if (this.model.get('inline-block')){
				$(this.el).addClass("inline-block");
			}
		},

		resize: function(){
			this.trigger('resize');
		},

		resizeStop: function(){
			this.resize();
			this.trigger('resizeStop');
			if (this.model.get('inline-block')){
				this.unsetHeightWidth(this.el);
				this.unsetHeightWidth(this.w.getFrame());
			}
		},

		getBody: function(){
			return this.w.getFrame();
		},

		unsetHeightWidth: function(el){
			$(el).css('width', '');
			$(el).css('height', '');
		}

	});

	return WindowView;
});
		

