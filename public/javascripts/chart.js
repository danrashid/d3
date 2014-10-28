/* global $, d3 */
'use strict';

$(function() {
  var $svg = $('svg'),
    svg = d3.select('svg'),
    width = $svg.width(),
    height = $svg.height(),
    xScale = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.25, 1),
    yScale = d3.scale.linear()
      .range([height, 0]);

  function sizeRect(rect) {
    rect.attr({
      x: function (d, i) {
        return xScale(i);
      },
      y: function (d) {
        return yScale(d[1]);
      },
      width: xScale.rangeBand(),
      height: function (d) {
        return height - yScale(d[1]);
      }
    });
  }

  function appendTooltip(rect) {
    rect.append('title')
      .text(function (d) {
        return (new Date(d[0])).toLocaleString() +
          '\n' +
          d[1];
      });
  }

  function appendAxis(svg) {
    var axis = d3.svg.axis()
      .scale(yScale)
      .orient('left');

    svg.append('g')
      .attr('transform', 'translate(50,10) scale(0.95,0.95)')
      .call(axis);
  }

  $.get('/stats/', function (data) {
    xScale.domain(d3.range(0, data.length));
    yScale.domain([0, d3.max(data, function (d) {
      return d[1];
    })]);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
        .call(sizeRect)
        .call(appendTooltip);

    svg.call(appendAxis);
  });
});
