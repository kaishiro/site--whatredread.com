(function () {

  'use strict'

  var n;

  $(document).ready(function () {

    n.Toggle.listeners();

  }),

  n = {

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

        if ($('.page.active--aside').length) {
          $('.page').removeClass('active--aside');
          $('.page').removeClass('active--overlay');
        }
        else {
          $('.page').addClass('active--aside');
          $('.page').addClass('active--overlay');
        }
      }
    }
  }

}());
