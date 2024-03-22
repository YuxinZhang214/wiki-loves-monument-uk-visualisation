import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DataContext, WindowDimensionsContext } from '@/context';
import ukGeoJson from '../../util/gadm41_GBR_1.json';

const CombinedChart = () => {
  
  const { cumulativeYearly, locations } = useContext(DataContext);
  const { width, height } = useContext(WindowDimensionsContext);

  const svgRef = useRef();
  // svg
  const margin = { top: 50, right: width * (3/7)+20, bottom: 50, left: 100 };
  const effectiveWidth = width - margin.left - margin.right;
  const effectiveHeight = height - margin.top - margin.bottom;
  // area
  const areaChartMarginLeft = 170;
  const areaChartBottomMargin = 100;
  const areaChartWidth = effectiveWidth * (3/5);
  const areaChartHeight = effectiveHeight * (3/5);
  const translateY = height - areaChartHeight - margin.bottom - areaChartBottomMargin;
  // map
  const mapMargin = { top: 20, right: 50, bottom: 20, left: 50 };
  const legendMargin = { top: 10, left: 10 };

  useEffect(() => {
    if (!cumulativeYearly || !locations) return;
    
    const cumulativeDataArray = Object.entries(cumulativeYearly).map(([year, total]) => ({
      year: +year,
      total: +total
    }));

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', height);

    // 1. Text section
    svg.append('text')
    .attr('x', margin.left/ 2)
    .attr('y', margin.top / 2 + 10) // Position the title in the reserved space
    .attr('fill', '#FFFFFF') // White text color
    .style('font-size', '30px') // Larger font size for the title
    .style('font-weight', 'bold')
    .text('Image Submissions Over the Years');

    // Append the description below the title
    svg.append('text')
      .attr('x', margin.left/ 2)
      .attr('y', margin.top / 2 + 10 + 40) // Position below the title
      .attr('fill', '#9CA3AF') // White text color
      .style('font-size', '16px') // Smaller font size for the description
      .text('The impact of our project reaches far beyond the individual contributions; it\'s about the');

    svg.append('text')
      .attr('x', margin.left/ 2)
      .attr('y', margin.top / 2 + 10 + 40 + 20) // Position below the title
      .attr('fill', '#9CA3AF') // White text color
      .style('font-size', '16px') // Smaller font size for the description
      .text('cumulative effect of every single image and story brought to light. Our endeavor illuminates  ');

    svg.append('text')
      .attr('x', margin.left/ 2)
      .attr('y', margin.top / 2 + 10 + 40 + 20*2) // Position below the title
      .attr('fill', '#9CA3AF') // White text color
      .style('font-size', '16px') // Smaller font size for the description
      .text('the significance of each documented site, bringing into focus the indispensable role of  ');

    svg.append('text')
      .attr('x', margin.left/ 2)
      .attr('y', margin.top / 2 + 10 + 40 + 20*3) // Position below the title
      .attr('fill', '#9CA3AF') // White text color
      .style('font-size', '16px') // Smaller font size for the description
      .text('public participation in the conservation of cultural heritage. Together, we\'re not just');

    svg.append('text')
      .attr('x', margin.left/ 2)
      .attr('y', margin.top / 2 + 10 + 40 + 20*4) // Position below the title
      .attr('fill', '#9CA3AF') // White text color
      .style('font-size', '16px') // Smaller font size for the description
      .text('documenting history; we\'re shaping the way it\'s remembered.');

    // 2. Area chart for cumulative yearly data
    const xScale = d3.scaleTime()
      .domain(d3.extent(cumulativeDataArray, d => d.year))
      .range([0, areaChartWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(cumulativeDataArray, d => d.total)])
      .range([areaChartHeight, 0]);

    const areaGenerator = d3.area()
      .x(d => xScale(d.year))
      .y0(areaChartHeight)
      .y1(d => yScale(d.total))
      .curve(d3.curveMonotoneX);

    const areaChartGroup = svg.append('g')
      .attr('transform', `translate(${areaChartMarginLeft},${translateY})`);

    areaChartGroup.append('path')
      .datum(cumulativeDataArray)
      .attr('fill', '#69b3a2')
      .attr('d', areaGenerator);

    areaChartGroup.append("g")
      .attr('transform', `translate(0,${areaChartHeight})`)
      .call(d3.axisBottom(xScale).ticks(13).tickFormat(d3.format('y')))
      .selectAll("text")
      .style("font-size", "14px"); 

    areaChartGroup.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "14px"); 

    // Title
    areaChartGroup.append('text')
      .attr('x', 0)
      .attr('y', -45)
      .text('Received 90,666 image submission over 9 year ')
      .style('font-size', '22px')
      .style('font-weight', 'bold')
      .style('fill', '#FFFFFF');

    // X-Axis Label
    areaChartGroup.append('text')
      .attr('transform', `translate(${areaChartWidth/2},${areaChartHeight + 40})`)
      .attr('fill', '#FFFFFF')
      .style('font-size', '18px')
      .style('text-anchor', 'middle')
      .text('Year');
    
    // Y-Axis Label
    areaChartGroup.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 15 - margin.left)
      .attr('x', -(areaChartHeight/2))
      .attr('fill', '#FFFFFF')
      .style('font-size', '18px')
      .style('text-anchor', 'middle')
      .text('Image Submissions');

    // Assuming you have a legend data array similar to the map legend
    const areaChartLegendData = [
      { color: '#69b3a2', label: 'Total Image Submissions' }
    ];

    // Define the position for the area chart legend
    const areaChartLegendPosition = {
      x: margin.left + 65, // Right next to the area chart
      y: translateY - 25 // Above the area chart
    };

    // Create a group for the area chart legend
    const areaChartLegendGroup = svg.append('g')
      .attr('transform', `translate(${areaChartLegendPosition.x},${areaChartLegendPosition.y})`);

    // Add legend items
    areaChartLegendData.forEach((item, index) => {
      // Draw legend color boxes
      areaChartLegendGroup.append('rect')
        .attr('x', 0)
        .attr('y', index * 20) // Stacking the legend items vertically
        .attr('width', 10)
        .attr('height', 10)
        .style('fill', item.color);

      // Add legend text
      areaChartLegendGroup.append('text')
        .attr('x', 15) // Position text next to the color box
        .attr('y', index * 20 + 9) // Align text with the color box
        .text(item.label)
        .attr('fill', '#FFFFFF')
        .style('font-size', '16px');
    });

    // 3. Map for MonumentCoverage
    const mapGroup = svg.append('g')
      .attr('transform', `translate(${margin.right},0)`);

    const projection = d3.geoAlbers()
      .center([0, 55.4])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(Math.max(effectiveWidth, effectiveHeight) * 5.5)
      .translate([effectiveWidth / 3, effectiveHeight / 2]);

    const path = d3.geoPath().projection(projection);

    mapGroup.selectAll("path")
      .data(ukGeoJson.features)
      .join("path")
      .attr("d", path)
      .style("fill", "#ddd")
      .style("stroke", 'black');

    locations.forEach(location => {
      mapGroup.append("circle")
        .attr("cx", projection([location.long, location.lat])[0])
        .attr("cy", projection([location.long, location.lat])[1])
        .attr("r", 3)
        .style("fill", "#69b3a2")
    });

    const mapCenterX = (effectiveWidth / 3); 
    const mapTopY = margin.top;
    const mapTitle = "UK Heritage Sites";

    mapGroup.append('text')
        .attr('x', mapCenterX)
        .attr('y', mapTopY - 10)        // Position the title slightly above the map, adjust as needed
        .attr('fill', '#FFFFFF')
        .style('text-anchor', 'middle') // Ensures the text is centered on the calculated X position
        .style('font-weight', 'bold')
        .style('font-size', '20px')
        .text(mapTitle);

    const legendData = [{'color': '#69b3a2', 'label': 'Monument'}];
    const legendGroup = svg.append('g')
      .attr('transform', `translate(${margin.right*(7/4)- 30},30)`); // Position the legend at the top left

    legendData.forEach((item, index) => {
      // Draw legend color boxes
      legendGroup.append('circle')
        .attr('cx', 0)                // x position of the circle center
        .attr('cy', index * 20)       // y position, stacking items vertically
        .attr('r', 5)                 // radius of the circle
        .style('fill', item.color);

      // Legend text
      legendGroup.append('text')
        .attr('x', 10)                // Position text next to the color box
        .attr('y', index * 20+ 5)   // Align text with the color box
        .text(item.label)
        .attr('fill', '#FFFFFF')
        .style('font-size', '16px');
    }
  );
  
  }, [cumulativeYearly, locations, width, height]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default CombinedChart;