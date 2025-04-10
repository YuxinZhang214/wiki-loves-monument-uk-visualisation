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
    if (community && community.length && innerWidth > 0 && innerHeight > 0) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
      svg.attr('width', innerWidth).attr('height', innerHeight);

      const sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(community, d => d.total_submissions)])
        .range([5, 100]);

      // Create nodes
      const nodes = svg.selectAll('circle')
        .data(community, d => d.id)
        .join('circle')
        .attr('r', d => sizeScale(d.total_submissions))
        .attr('fill', '#69b3a2')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .on('mouseenter', (event, d) => {
          const currentTooltipNodeId = currentTooltipNodeIdRef.current;
          if (currentTooltipNodeId !== d.id) {
            currentTooltipNodeIdRef.current = d.id;
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

            d3.select(event.target).attr('stroke-width', 5);
          }
        })
        .on('mouseleave', (event, d) => {
          currentTooltipNodeIdRef.current = null;
          d3.select(tooltipRef.current).style('visibility', 'hidden');
          d3.select(event.target)
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5);
        });

      // Run simulation
      d3.forceSimulation(community)
        .force('charge', d3.forceManyBody().strength(1))
        .force('center', d3.forceCenter(innerWidth / 2, innerHeight / 2))
        .force('collision', d3.forceCollide().radius(d => sizeScale(d.total_submissions) + 2.5))
        .on('tick', () => {
          nodes
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
        });

      // Add legend once
      const legendGroup = svg.append('g')
        .attr('transform', `translate(${innerWidth - 150}, 20)`);

      const sizes = [5, 10, 15];
      const labels = ['< 10', '< 500', '< 1000'];

      sizes.forEach((size, i) => {
        const y = 20 + i * 40;
        legendGroup.append('circle')
          .attr('cx', 0)
          .attr('cy', y)
          .attr('r', size)
          .style('fill', '#69b3a2');

        legendGroup.append('text')
          .attr('x', 25)
          .attr('y', y)
          .attr('dy', '0.35em')
          .style('text-anchor', 'start')
          .text(labels[i])
          .style('font-size', '14px')
          .attr('fill', '#fff');
      });
    }
  }, [community, innerWidth, innerHeight]);

  return (
    <>
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef} style={{ position: 'absolute', visibility: 'hidden' }}></div>
    </>
  );
};

export default CommunityChart;