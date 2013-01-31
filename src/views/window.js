define(
  [
    "jquery",
    "backbone",
    "underscore",
    "ui",
    "jqwindow",
],
function($, Backbone, _, ui, jqwindow){

  // Currently a wrapper around jquery.window <https://github.com/adorsk/jquery.window>
  var WindowView = Backbone.View.extend({
    tagName: "div",
    events: {},

    initialize: function(opts){
      opts = opts || {};

      if (! this.model){
        this.model = new Backbone.Model();
      }
      var _this = this;

      // Set caller element.
      var $caller = opts.caller || $;

      this.w = $caller.window(_.extend(
        {
        maxHeight: -1,
        maxWidth: -1
      },
      {
        onResize: function(){ _this.resize();},
        afterResize: function(){_this.resizeStop();},
        afterMinimize: function(){_this.afterMinimize();},
        afterMaximize: function(){_this.resizeStop();},
        afterCascade: function(){_this.afterCascade();},
        afterDrag: function(){_this.dragStop();},
        onClose: function(){_this.onClose();},
      },
      opts,
      this.model.toJSON()
      ));

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
      this.updateDimensionsPosition();
      var dimensions = this.w.getDimensions();
      this.model.set({
        width: dimensions.w,
        height: dimensions.h,
      });
    },

    dragStop: function(){
      this.trigger('dragStop');
      this.updateDimensionsPosition();
    },

    afterCascade: function(){
      this.resizeStop();
      $(this.el).removeClass('minimized');
    },

    afterMinimize: function(){
      this.trigger('minimize');
      $(this.el).addClass('minimized');
    },

    onClose: function(){
      this.trigger('close');
      this.remove();
    },

    getBody: function(){
      return this.w.getFrame();
    },

    // Sync model attributes with current dimensions and position.
    updateDimensionsPosition: function(opts){
      var pos = this.w.getPosition();
      var dimensions = this.w.getDimensions();
      this.model.set({
        width: dimensions.w,
        height: dimensions.h,
        x: pos.x,
        y: pos.y
      }, opts);
    },

    unsetHeightWidth: function(el){
      $(el).css('width', '');
      $(el).css('height', '');
    }

  });

  return WindowView;
});


