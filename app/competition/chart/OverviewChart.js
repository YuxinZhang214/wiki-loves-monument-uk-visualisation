import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DataContext, WindowDimensionsContext } from '@/context';

const OverviewChart = () => {

    const { yearly, daily } = useContext(DataContext);
    const { width, height } = useContext(WindowDimensionsContext);

    const ref = useRef();

    // graph
    const margin = { top: 0, right: 50, bottom: 0, left: 0 };
    const effectiveWidth = width - margin.left - margin.right;
    // const effectiveHeight = height / 2 - text_y0 - margin.top - margin.bottom;
    // text
    const text_x0 = 0;     
    const text_y0 = 25;   
    const line_space = 20;   
    // hight light
    const highlight_width = 50
    const highlight_x0 = effectiveWidth - highlight_width
    const highlight_y0 = 25
    // chart
    const chart_height = height / 2 - text_y0 - margin.top - margin.bottom;
    const title_space = 15
    const axis_space = 20
    // bar chart 
    const bar_width = effectiveWidth / 3
    const bar_height = chart_height
    const bar_x0 = margin.left
    const bar_y0 = margin.top 
    // activity chart
    const chart_space = 165
    const activity_width = effectiveWidth - bar_width
    const activity_height = chart_height
    const activity_x0 = margin.left + bar_width + chart_space
    const activity_y0 = margin.top

    useEffect(() => {
        if (!yearly || !daily) return;

        const dailyData = transformData(daily);
        const yearlyData = Object.entries(yearly).map(([year, total]) => ({
            year: +year,
            total: +total
        }));

        d3.select(ref.current).selectAll("*").remove();

        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", chart_height);

        const barChartsGroup = svg.append('g')
                .attr('transform', `translate(${bar_x0}, ${bar_y0})`);

        barChart(barChartsGroup,yearlyData)

        const activityChartsGroup = svg.append('g')
                .attr('transform', `translate(${activity_x0}, ${activity_y0})`);
                
        activityChart(activityChartsGroup,yearlyData,dailyData)

    }, [yearly, daily,width, height]);
    
    const barChart = (chartsGroup,yearlyData) => {
        const title_x = 20
        const title_y = 0

        const y_axis_x = 60
        const y_axis_y = 0

        const y_label_x = 0 - (bar_height / 2) - 20
        const y_label_y = 0

        const x_axis_x = y_axis_x + 15
        const x_axis_y = bar_height + 10

        const x_label_x = bar_width/2 + 60
        const x_label_y = x_axis_y + 50

        const legend_x = title_x
        const legend_y = title_y + title_space
        
        const yScale = d3.scaleBand()
                         .domain(yearlyData.map(d => d.year))
                         .range([y_axis_x, bar_height])
                         .padding(0.1);

        chartsGroup.append('g')
            .attr("transform", `translate(${y_axis_x},${y_axis_y})`)
            .call(d3.axisLeft(yScale))     
            .selectAll("text")
            .style("font-size", "16px");  

        // 2.2 X-axis for the bar chart
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(yearlyData, d => d.total)])
            .range([0, bar_width]);

        chartsGroup.append('g')
            .attr("transform", `translate(${x_axis_x},${x_axis_y})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("font-size", "14px"); 
        
        // x-axis label
        chartsGroup.append("text")
            .attr("transform", `translate(${x_label_x},${x_label_y})`)
            .style("text-anchor", "middle")
            .style("font-size", "16px")
            .attr('fill', '#FFFFFF')
            .text("Total Submissions");

        // bar 
        chartsGroup.selectAll('.bar')
            .data(yearlyData)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', x_axis_x)
            .attr('y', d => yScale(d.year))
            .attr('width', d => xScale(d.total))
            .attr('height', yScale.bandwidth())
            .attr('fill', '#69b3a2');

        // title
        chartsGroup.append("text")
            .attr("x", title_x)
            .attr("y", title_y)
            .attr("text-anchor", "start")
            .style("font-size", "22px")
            .style("font-weight", "bold")
            .attr('fill', '#FFFFFF')
            .text("Image Submission for 9 Competition Year");

        // legend
        const yearlyLegend = [
            { color: "#69b3a2", text: "Yearly Submission Total" }
        ];
            
        // Position the Yearly Data Legend below its title
        const yearlyLegendGroup = chartsGroup.selectAll(".yearlyLegend")
            .data(yearlyLegend)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => `translate(${legend_x},${legend_y})`);

        yearlyLegendGroup.append("rect")
            .attr("width", 16)
            .attr("height", 16)
            .style("fill", d => d.color);

        yearlyLegendGroup.append("text")
            .attr("x", 20)
            .attr("y", 12)
            .attr('fill', '#FFFFFF')
            .text(d => d.text);
    }
    
    const activityChart = (chartsGroup,yearlyData,dailyData) => {

        const title_x = 20
        const title_y = 0

        const y_axis_x = 60
        const y_axis_y = 0

        const y_label_x = 0 - (bar_height / 2) - 20
        const y_label_y = 0

        const x_axis_x = y_axis_x + 20
        const x_axis_y = activity_height + 10
        const x_axis_width = activity_width * (2/3) 

        const x_label_x = activity_width/3 + 50
        const x_label_y = x_axis_y + 50

        const legend_x = title_x
        const legend_y = title_y + title_space

        const graph_x = y_axis_x + 20
        const graph_y = 0

        const yScale = d3.scaleBand()
            .domain(yearlyData.map(d => d.year))
            .range([y_axis_x, activity_height])
            .padding(0.1)

        chartsGroup.append('g')
            .attr("transform", `translate(${y_axis_x},${y_axis_y})`)
            .call(d3.axisLeft(yScale))
            .selectAll("text")
            .style("font-size", "16px"); 

        const dayScale = d3.scaleLinear()
            .domain([1, 31])                    
            .range([5, x_axis_width])

        chartsGroup.append("g")
            .attr("transform", `translate(${x_axis_x}, ${x_axis_y})`)
            .call(d3.axisBottom(dayScale).ticks(31).tickFormat(d3.format('d')))
            .selectAll("text")
            .style("font-size", "14px"); 

        chartsGroup.append("text")
            .attr("transform", `translate(${x_label_x},${x_label_y})`)
            .style("text-anchor", "middle")
            .style("font-size", "16px")
            .attr('fill', '#FFFFFF')
            .text("Dates in September");

        const radiusScale = d3.scaleSqrt()
            .domain([0, d3.max(dailyData, d => d.submissions)])
            .range([2, 23]);
        
        // rectangles
        chartsGroup.selectAll(".activity-rect")
            .data(dailyData, d => `${d.year}-${d.day}`)
            .enter().append("rect")
            .attr("class", "activity-rect")
            .attr("x", d => graph_x + dayScale(d.day) - radiusScale(d.submissions) / 2)
            .attr("y", d => yScale(d.year) + yScale.bandwidth() / 2 - radiusScale(d.submissions) / 2)
            .attr("width", d => radiusScale(d.submissions)) 
            .attr("height", d => radiusScale(d.submissions)) 
            .attr("fill", "#69b3a2");

        // title
        chartsGroup.append("text")
            .attr("x",title_x)
            .attr("y", title_y)
            .attr("text-anchor", "start")
            .style("font-size", "22px")
            .style("font-weight", "bold")
            .attr('fill', '#FFFFFF')
            .text("Competition Activity during every September");
    
        const dailyLegend = [
            { color: "#69b3a2", text: "Daily Submission Total" } 
        ];
    
        const dailyLegendGroup = chartsGroup.selectAll(".dailyLegend")
            .data(dailyLegend)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => `translate(${legend_x},${legend_y})`);
    
        dailyLegendGroup.append("rect")
            .attr("width", 16)
            .attr("height", 16)
            .style("fill", d => d.color);
    
        dailyLegendGroup.append("text")
            .attr("x", 20)
            .attr("y", 12)
            .attr('fill', '#FFFFFF')
            .text(d => d.text);

    }

    return <svg ref={ref} style={{ overflow: 'visible' }}></svg>;
};

export default OverviewChart;


function transformData(apiData) {
    const flatData = [];
    Object.entries(apiData).forEach(([year, days]) => {
        Object.entries(days).forEach(([day, submissions]) => {
            flatData.push({
                year: +year,
                day: +day,
                submissions: +submissions
            });
        });
    });
    return flatData;
}