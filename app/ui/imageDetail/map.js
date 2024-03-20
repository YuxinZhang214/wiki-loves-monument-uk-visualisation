import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import ukGeoJson from '../../util/gadm41_GBR_1.json';

const Map = ({ imageLocations }) => {
  
  const mapContainerRef = useRef();
  const svgRef = useRef();

  useEffect(() => {
    // Ensure the container is rendered and has dimensions
    if(mapContainerRef.current) {
      const { width, height } = mapContainerRef.current.getBoundingClientRect();

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

      // Plot the image locations
      svg.selectAll(".image-location")
         .data(imageLocations)
         .enter().append("circle")
         .attr("class", "image-location")
         .attr("cx", d => projection([d.longitude, d.latitude])[0])
         .attr("cy", d => projection([d.longitude, d.latitude])[1])
         .attr("r", 5)
         .style("fill", "red");
    }
  }, []); 

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Map;