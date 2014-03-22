(function () {

  'use strict'

  var n;

  var position = $(window).scrollTop();

   $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if(scroll > position) {
        $('.page').addClass('active--reading');
      } else {
        $('.page').removeClass('active--reading');
      }
      position = scroll;
  }); 


  $(document).ready(function () {

    n.Toggle.listeners();
    n.Hover.listeners();


  }),

  n = {

    Hover: {
      listeners: function() {
        $('.header, .navigation').hover(n.Hover.hover_component);
      },

      hover_component: function(e) {
        $('.page').removeClass('active--reading');
      }
    },

    Toggle: {

      listeners: function() {
        $('.toggle').on('click', n.Toggle.toggle_component);
      },

      toggle_component: function(e) {
        var ariaPressed = $(this).attr('aria-pressed');
        var target = $(this).data('target');

        if (ariaPressed == 'true') {
          $(this).attr('aria-pressed', 'false');
        }
        else {
          $(this).attr('aria-pressed', 'true');
        }

        if ($('.page.active--navigation').length) {
          $('.page').removeClass('active--navigation');
          $('.page').removeClass('active--overlay');
        }
        else {
          $('.page').addClass('active--navigation');
          $('.page').addClass('active--overlay');
        }
      }
    }
  }

}());
