'use client'

import React, { useContext, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { DataContext } from '@/context';
import { WindowDimensionsContext } from '@/context';

const MonumentInceptionTimeline = () => {

  const { inceptions } = useContext(DataContext);
  const { width, height } = useContext(WindowDimensionsContext);

  const svgRef = useRef();
  const tooltipRef = useRef();

  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipVisibility, setTooltipVisibility] = useState('hidden');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const margin = { top: 50, right: 60, bottom: 50, left: 60 };
  const svg_width = width - margin.left - margin.right; // Width adjusted for margins
  const svg_height = height*(4/5);  // Height adjusted for margins

  const centerY = svg_height / 2; 

  const legendSpacing = 20;
  const legendY = centerY + svg_height / 2 + margin.bottom / 2; // Position for the legend
  const legendSize = 10; // Size of the legend circle

  useEffect(() => {
    if (!inceptions) return;
  
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear SVG
  
    // Set SVG dimensions
    svg.attr("width", svg_width + margin.left + margin.right)
       .attr("height", svg_height + margin.top + margin.bottom);

    // 1. timeline
  
    // Add the group translated to the correct position
    const chartGroup = svg.append("g")
                          .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Scale for the x-axis
    const x = d3.scaleLinear()
      .domain([0, 2024])
      .range([0, svg_width]);
  
    // Add x axis to the chartGroup, not svg
    chartGroup.append("g")
      .attr("transform", `translate(0,${svg_height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));
  
    Object.entries(inceptions).forEach(([year, monuments]) => {
      const spread = Math.ceil(monuments.length / 2);
      monuments.forEach((monument, index) => {
        const offset = (index % 2 === 0 ? 1 : -1) * Math.ceil(index / 2) * 10;
          // Append circles to chartGroup, not svg
          const circle = chartGroup.append("circle")
            .attr("cx", x(year))
            .attr("cy", centerY + offset)
            .attr("r", 5)
            .attr("fill", "#69b3a2")
            .append("title") // Tooltip for hover-over text
            .text(`${monument.label}, ${year}`);
        
        });
    });

    // 2.  middle line
    const mainGroup = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scale from year 0 to 2024
    const xScale = d3.scaleLinear()
      .domain([0, 2024])
      .range([0, svg_width]);

    // Add x axis
    mainGroup.append("g")
      .attr("transform", `translate(0,${svg_height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    // Draw the central line parallel to the x-axis
    mainGroup.append("line")
      .attr("x1", 0)
      .attr("y1", centerY)
      .attr("x2", svg_width)
      .attr("y2", centerY)
      .attr("stroke", "#9CA3AF") // Using the provided color
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5"); 

    mainGroup.selectAll(".tick").each(function(d, i, nodes) {
        // Check if the current tick is not the last one
        if (i !== nodes.length - 1) {
          const x = d3.select(this).attr("transform").split("(")[1].split(",")[0]; // Get the x position of the tick
          mainGroup.append("line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", svg_height)
            .attr("stroke", "#9CA3AF") // Using the provided color
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "5,5"); // Dashed line pattern
        }
    });

    // solid line at the top
    mainGroup.append("line")
      .attr("x1", 0)
      .attr("x2", svg_width)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "#9CA3AF") // Using the provided color
      .attr("stroke-width", 1); // Solid line with a width of 2 pixels

    // dashed line at the end
    mainGroup.append("line")
      .attr("x1", svg_width )
      .attr("y1", 0)
      .attr("x2", svg_width)
      .attr("y2", svg_height)
      .attr("stroke", "#9CA3AF") // Use the color for the stroke
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5"); // Set the dash array for a dashed line

    mainGroup.append('text')
      .attr('x', svg_width / 2)
      .attr('y', svg_height + margin.bottom + 10)
      .style('text-anchor', 'middle')
      .text('Inception Year')
      .attr('fill', '#ffffff')
      .style('font-size', '20px');

    // Legend group
    const legendGroup = mainGroup.append('g')
      .attr('transform', `translate(0, ${legendY})`);
    
    // Legend circle
    legendGroup.append('circle')
      .attr('cx', svg_width - margin.right- legendSize*3 - 10 )
      .attr('cy', legendSpacing)
      .attr('r', legendSize)
      .attr('fill', '#69b3a2');
    
    // Legend text
    legendGroup.append('text')
      .attr('x', svg_width - margin.right - legendSize - 10)
      .attr('y', legendSpacing)
      .attr('dominant-baseline', 'middle')
      .text('Monument')
      .attr('fill', '#ffffff')
      .style('font-size', '16px');

    const titleGroup = chartGroup.append('g')
      .attr('transform', `translate(${svg_width / 2}, ${-margin.top})`); // Adjust position as needed
  
    titleGroup.append('text')
      .attr('x', 0)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle') // This will center the title
      .attr('fill', '#ffffff') // White text color
      .style('font-size', '24px') // Increase font size for title
      .style('font-weight', 'bold')
      .text('Monument Inception Timeline'); // The text of the title
        
  }, [inceptions, svg_width, svg_height, margin, centerY]);  

  return (
    <div style={{ maxWidth: width, overflowX: 'auto' }}>
      <svg ref={svgRef} />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          visibility: tooltipVisibility,
          left: `${tooltipPosition.x + 15}px`,
          top: `${tooltipPosition.y - 28}px`,
          padding: '10px',
          background: '#191B6A',
          color: 'white',
          borderRadius: '5px',
          pointerEvents: 'none', // Ensure tooltip doesn't interfere with mouse events
          border: 'none',
        }}
        dangerouslySetInnerHTML={{ __html: tooltipContent }}
      ></div>
    </div>
  );
};

export default MonumentInceptionTimeline;