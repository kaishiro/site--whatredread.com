$(function() {

  'use strict'

  var n;

  $(document).ready(function () {
    n.Search.listeners();
  }),

  n = {

    Search: {

      listeners: function() {
        $('.search .search__submit').on('click', n.Search.return_results);
      },

      return_results: function(e) {

        var _searchInput = $('.search .search__input');
        var _searchTerms = _searchInput.val().toLowerCase();
        var _searchResults = $('.search .seach__results');
        var _searchEntries = '/search/entries.json';

        e.preventDefault();

        return $.getJSON(_searchEntries, function(data) {

          var i, result, results, value, _i, _j, _l, _len1, _results;

          results = [];

          for (_i = 0, _l = data.length; _i < _l; _i++) {
            i = data[_i];
            value = 0;
            if (i.title.toLowerCase().split(_searchTerms).length - 1 !== 0) {
              value = 10;
            }
            //if (i.content.toLowerCase().split(search_term).length - 1 !== 0) {
            //  value += (i.content.toLowerCase().split(search_term).length - 1) * 5;
            //}
            if (value !== 0) {
              i.value = value;
              results.push(i);
            }
          }

          _searchResults.html('');
          if (results.length > 0) {
            _results = [];
            for (_j = 0, _len1 = results.length; _j < _len1; _j++) {
              result = results[_j];
              _results.push($('.search .search__results').append('<p><a href="/' + result.url + '">' + result.title + '</a></p>'));
            }
            return _results;
          } else {
            $('.search .search__results').append('<p>No results found. Sorry.</p>');
          }
        });
      }
    }
  }

}());

