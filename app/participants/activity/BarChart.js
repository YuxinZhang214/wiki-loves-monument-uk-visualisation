import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { WindowDimensionsContext } from '@/context';

const BarChart = ({ author_yearly }) => {
  const { width, height } = useContext(WindowDimensionsContext);
  const svgRef = useRef();

  // Adjust margins as needed
  const margin = { top: 100, right: 30, bottom: 30, left: 100 };
  const barChartWidth = width * (3/7)
  const barChartHeight = height / 2; // Use only 1/3 of the available height for the bar chart
  const effectiveWidth = barChartWidth - margin.left - margin.right;
  const effectiveHeight = barChartHeight - margin.top - margin.bottom;

  useEffect(() => {
    if (!author_yearly) return;

    const combinedData = Object.entries(author_yearly).map(([year, total]) => ({
      year: +year,
      total: +total,
    }));

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', barChartWidth).attr('height', barChartHeight);

    const xScale = d3.scaleBand()
      .domain(combinedData.map(d => d.year))
      .rangeRound([margin.left, effectiveWidth + margin.left])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(combinedData, d => d.total)])
      .range([effectiveHeight + margin.top, margin.top]);

    // Drawing bars for author's contributions
    svg.selectAll(".bar-author")
      .data(combinedData)
      .enter().append("rect")
      .attr("class", "bar-author")
      .attr("x", d => xScale(d.year))
      .attr("y", d => yScale(d.total))
      .attr("width", xScale.bandwidth())
      .attr("height", d => effectiveHeight + margin.top - yScale(d.total))
      .attr("fill", "#69b3a2");

    // Adding X axis
    svg.append("g")
      .attr("transform", `translate(0,${effectiveHeight + margin.top})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
      .selectAll("text")
      .style("font-size", "14px"); 

    // Adding Y axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "14px"); 

    // Adding Title
  svg.append("text")
  .attr("x", margin.left/3 + 20) 
  .attr("y", margin.top / 3 -5)
  .style('text-anchor', 'start')
  .style('font-weight', 'bold')
  .style('font-size', '22px')
  .attr('fill', '#FFFFFF')
  .text("Your Yearly Contributions");

  // Adding Legend
  const legend = svg.append("g")
    .attr("class", "legend") // Optional: for styling
    .attr('fill', '#FFFFFF')
    .attr("transform", `translate(${margin.left/3 + 20}, ${margin.top / 2})`);

  legend.append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", "#69b3a2");

  legend.append("text")
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", "0.25em") 
    .attr('fill', '#FFFFFF')
    .text("Total Contributions");

  }, [author_yearly, width, height]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default BarChart;
