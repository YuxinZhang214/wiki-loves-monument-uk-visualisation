import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DataContext, WindowDimensionsContext } from '@/context';

const CommunityTreemap = () => {
  const { community } = useContext(DataContext);
  const { width, height } = useContext(WindowDimensionsContext);

  const margin = { top: 50, right: 60, bottom: 50, left: 60 };
  const svg_width = width - margin.left - margin.right; // Width adjusted for margins
  const svg_height = height*(4/5);  // Height adjusted for margins

  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (community && community.length) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
      svg.attr('width', svg_width).attr('height', svg_height);

      const root = d3.hierarchy({ children: community })
        .sum(d => d.total_submissions);

      const treemap = d3.treemap()
        .size([width, height])
        .padding(2);

      treemap(root);

      const colorScale = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, d3.max(community, d => d.total_submissions)]);

      const nodes = svg.selectAll('g')
        .data(root.leaves())
        .join('g')
        .attr('transform', d => `translate(${d.x0}, ${d.y0})`);

      nodes.append('rect')
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        // .attr('fill', d => colorScale(d.data.total_submissions))
        .attr('fill', '#69b3a2')
        // .attr('stroke', '#fff')
        .on('mouseenter', (event, d) => {
          d3.select(tooltipRef.current)
            .style('visibility', 'visible')
            .html(`Author: ${d.data.image_author}<br/>Submissions: ${d.data.total_submissions}`)
            .style('left', `${event.pageX}px`)
            .style('top', `${event.pageY - 28}px`);
        })
        .on('mouseleave', () => {
          d3.select(tooltipRef.current).style('visibility', 'hidden');
        });

      nodes.append('text')
        .attr('x', 10)
        .attr('y', 20)
        .attr('fill', 'white')
        .attr('font-size', d => Math.max(10, (d.x1 - d.x0) / 25)) // Scale text size
        .attr('font-weight', 'bold')
        .text(d => {
          const rectWidth = d.x1 - d.x0;
          
          // If rectWidth > 80, show full name or truncate if it's too long
          if (rectWidth > 80) {
            if (d.data.image_author.length > 20) {
              return d.data.image_author.slice(0, 20) + '...';  // Truncate to 20 chars
            }
            return d.data.image_author;  // Full name
          }

           // For rectWidth > 40, show truncated name
          if (rectWidth > 40) {
            return d.data.image_author.slice(0, 8) + '...';  // Truncate to 8 chars
          }
          
          // For rectWidth > 40, show truncated name
          if (rectWidth > 30) {
            return d.data.image_author.slice(0, 3) + '...';  // Truncate to 8 chars
          }
        
          // For rectWidth > 20, show an ellipsis '...'
          if (rectWidth > 20) {
            return '...';
          }
        
          // For very small blocks, no text
          return '';
        });
    }
  }, [community, width, height]);

  return (
    <>
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef} style={{ position: 'absolute', visibility: 'hidden' }}></div>
    </>
  );
};

export default CommunityTreemap;