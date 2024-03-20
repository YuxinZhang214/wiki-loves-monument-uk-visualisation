import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import ukGeoJson from '../../util/gadm41_GBR_1.json';

const categories = [
    "Grade II Listed Building", "category A listed building", 
    "category B listed building", "category C listed building", 
    "grade A listed building", "grade C listed building", 
    "grade I Listed Building", "grade IIs Listed Building", 
    "scheduled Monument"
];


const LocationMap = ({ locations }) => {
  
  const mapContainerRef = useRef();
  const svgRef = useRef();

  const margin = { top: 20, right: 30, bottom: 30, left: 100 };

  useEffect(() => {
    // Ensure the container is rendered and has dimensions
    if(mapContainerRef.current) {
      const { width, height } = mapContainerRef.current.getBoundingClientRect();

      d3.select(svgRef.current).selectAll("*").remove();

      const svg = d3.select(svgRef.current)
                    .attr("width", width)
                    .attr("height", height);

      const projection = d3.geoAlbers()
                    .center([0, 55.4])
                    .rotate([4.4, 0])
                    .parallels([50, 60])
                    .scale(Math.max(width, height) * 4.5)
                    .translate([width / 3, height / 2]);

      const path = d3.geoPath().projection(projection);

      svg.selectAll("path")
         .data(ukGeoJson.features)
         .enter().append("path")
         .attr("d", path)
         .style("fill", "#ddd")
         .style("stroke", 'black');
  
        const colorScale = d3.scaleOrdinal()
                             .domain(categories)
                             .range(generateGradientColors("#69b3a2", categories.length));
  
      svg.selectAll(".image-location")
          .data(locations)
          .enter().append("circle")
          .attr("class", "image-location")
          .attr("cx", d => projection([d.longitude, d.latitude])[0])
          .attr("cy", d => projection([d.longitude, d.latitude])[1])
          .attr("r", 5)
          .attr('fill', '#69b3a2')
          .attr('stroke', 'white')
          .attr('stroke-width', 1); 

      const mapCenterX = (width / 3); 
      const mapTopY = margin.top;
      const mapTitle = "Locations of Monuments you documented";

      svg.append('text')
          .attr('x', margin.right*(7/4))
          .attr('y', mapTopY + 20)        // Position the title slightly above the map, adjust as needed
          .attr('fill', '#FFFFFF')
          .style('text-anchor', 'start') // Ensures the text is centered on the calculated X position
          .style('font-weight', 'bold')
          .style('font-size', '22px')
          .text(mapTitle);

      const legendData = [{'color': '#69b3a2', 'label': 'Monument'}];
      const legendGroup = svg.append('g')
        .attr('transform', `translate(${margin.right*(7/4)},30)`); // Position the legend at the top left

      legendData.forEach((item, index) => {
        // Draw legend color boxes
        legendGroup.append('circle')
          .attr('cx', 0)                // x position of the circle center
          .attr('cy', mapTopY + 25)       // y position, stacking items vertically
          .attr('r', 7)                 // radius of the circle
          .style('fill', item.color);

        // Legend text
        legendGroup.append('text')
          .attr('x', 20)                // Position text next to the color box
          .attr('y', mapTopY + 30)   // Align text with the color box
          .text(item.label)
          .attr('fill', '#FFFFFF')
          .style('font-size', '16px');

      })      
    }
  }, [locations]); 

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

const generateGradientColors = (baseColor, count) => {
  let colors = [];
  const base = d3.rgb(baseColor);

  for (let i = 0; i < count; i++) {
    const ratio = i / (count - 1);
    const brightness = 1.2 + (0.4 * ratio); // Adjust brightness from 0.8 to 1.2
    colors.push(d3.rgb(base.r * brightness, base.g * brightness, base.b * brightness));
  }

  return colors;
};

export default LocationMap;