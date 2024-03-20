import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DataContext, WindowDimensionsContext } from '@/context'; 

const CommunityChart = () => {

  const { community } = useContext(DataContext);
  const { width, height } = useContext(WindowDimensionsContext); 

  const margin = { top: 0, right: 50, bottom: 0, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svgRef = useRef();
  const tooltipRef = useRef();
  const currentTooltipNodeIdRef = useRef(null);

  useEffect(() => {
    if (community && community.length) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      svg.attr('width', innerWidth)
         .attr('height', innerHeight);

      const sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(community, d => d.total_submissions)])
        .range([5, 100]); 

      const simulation = d3.forceSimulation(community)
        .force('charge', d3.forceManyBody().strength(1))
        .force('center', d3.forceCenter(innerWidth / 2, innerHeight / 2))
        .force('collision', d3.forceCollide().radius(d => sizeScale(d.total_submissions) + 2.5))
        .on('tick', ticked);

      function ticked() {
        svg.selectAll('circle')
          .data(community)
          .join('circle')
          .attr('r', d => sizeScale(d.total_submissions))
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('fill', '#69b3a2')
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5)
          .on('mouseenter', (event, d) => {
            const currentTooltipNodeId = currentTooltipNodeIdRef.current;
            if (currentTooltipNodeId !== d.id) {      // Check if the hovered node is different
              currentTooltipNodeIdRef.current = d.id; // Update the current node ID
          
              const tooltip = d3.select(tooltipRef.current);
              tooltip
                .style('visibility', 'visible')
                .style('background', '#191B6A')
                .style('color', 'white')
                .style('padding', '10px')       
                .style('border-radius', '4px')  
                .style('text-align', 'center')  
                .style('position', 'absolute')  
                .html(`Author: ${d.image_author}<br/>Submissions: ${d.total_submissions}`)
                .style('left', `${event.pageX}px`)
                .style('top', `${event.pageY - 28}px`);
          
              d3.select(event.target)
                .attr('stroke-width', 5);
            }
          })
          .on('mouseleave', (event, d) => {
            currentTooltipNodeIdRef.current = null; // Reset the current tooltip node ID
            d3.select(tooltipRef.current).style('visibility', 'hidden');
            d3.select(event.target)
              .attr('stroke', '#fff')
              .attr('stroke-width', 1.5);
          });

        const legendGroup = svg.append('g')
          .attr('transform', `translate(${innerWidth - 150}, 20)`); // Adjust position as needed
    
        const sizes = [5, 10, 15]; // Example sizes for the legend circles
        const labels = ['< 10', '< 500', '< 1000']; // Labels for the sizes
        
        legendGroup.append('circle')
          .attr('cx', 0) // X position of all circles (aligned)
          .attr('cy', 20) // Y position (stacked with spacing)
          .attr('r', sizes[0]) // Radius from sizes array
          .style('fill', '#69b3a2');
      
        // Append labels to the legend
        legendGroup.append('text')
          .attr('x', 25) // Offset text to the right of the circles
          .attr('y', 20)
          .attr('dy', '0.35em') // Vertically center align text with circles
          .style('text-anchor', 'start')
          .text(labels[0]) // Text label from labels array
          .style('font-size', '14px')
          .attr('fill', '#fff');

        legendGroup.append('circle')
          .attr('cx', 0) // X position of all circles (aligned)
          .attr('cy', 15 + 30) // Y position (stacked with spacing)
          .attr('r', sizes[1]) // Radius from sizes array
          .style('fill', '#69b3a2');
      
        // Append labels to the legend
        legendGroup.append('text')
          .attr('x', 25) // Offset text to the right of the circles
          .attr('y', 15 + 30 + 5)
          .attr('dy', '0.35em') // Vertically center align text with circles
          .style('text-anchor', 'start')
          .text(labels[1]) // Text label from labels array
          .style('font-size', '14px')
          .attr('fill', '#fff');

        legendGroup.append('circle')
          .attr('cx', 0) // X position of all circles (aligned)
          .attr('cy', 20 + 30*2) // Y position (stacked with spacing)
          .attr('r', sizes[2]) // Radius from sizes array
          .style('fill', '#69b3a2');
      
        // Append labels to the legend
        legendGroup.append('text')
          .attr('x', 25) // Offset text to the right of the circles
          .attr('y', 20 + 30*2 )
          .attr('dy', '0.35em') // Vertically center align text with circles
          .style('text-anchor', 'start')
          .text(labels[2]) // Text label from labels array
          .style('font-size', '14px')
          .attr('fill', '#fff');

      }
    }
  }, [community, width, height]); 

  return (
    <>
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef} style={{ position: 'absolute', visibility: 'hidden' }}></div>
    </>
  );
};

export default CommunityChart;