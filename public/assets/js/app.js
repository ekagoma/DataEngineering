// Sample Data
const data1 = [
    { category: "Not at all", value: 2 },
    { category: "Somewhat", value: 5 },
    { category: "Often", value: 6 },
    { category: "Completely", value: 2 },
];

const data2 = [
    { importance: 1, value: 2 },
    { importance: 8, value: 6 },
    { importance: 9, value: 4 },
];

const data3 = [
    { reason: "Don't know how", value: 5 },
    { reason: "Inconvenient", value: 9 },
    { reason: "Not important", value: 2 },
    { reason: "Don't support", value: 0 },
];

// Utility function to calculate percentages
const addPercentages = (data) => {
    const total = d3.sum(data, d => d.value);
    return data.map(d => ({ ...d, percentage: ((d.value / total) * 100).toFixed(1) + '%' }));
};

// Chart 1: Pie Chart
const createPieChart = (data, elementId) => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(`#${elementId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.category));

    svg.selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .text(d => d.data.percentage);
};

// Chart 2 & 3: Bar Chart
const createBarChart = (data, elementId, xLabel) => {
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    const svg = d3.select(`#${elementId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
        .domain(data.map(d => d[xLabel]))
        .range([0, width - margin.left - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height - margin.top - margin.bottom, 0]);

    svg.append("g")
        .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d[xLabel]))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - margin.top - margin.bottom - y(d.value))
        .attr("fill", "steelblue");

    svg.selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => x(d[xLabel]) + x.bandwidth() / 2)
        .attr("y", d => y(d.value) - 5)
        .attr("text-anchor", "middle")
        .text(d => d.percentage);
};

// Render Charts
createPieChart(addPercentages(data1), "chart1");
createBarChart(addPercentages(data2), "chart2", "importance");
createBarChart(addPercentages(data3), "chart3", "reason");
