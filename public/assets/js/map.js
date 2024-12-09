const width = 800;
const height = 500;

const svg = d3
    .select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Load and render a TopoJSON map
d3.json("world-110m.json").then((topology) => {
    const projection = d3.geoMercator().scale(100).translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    svg.append("g")
        .selectAll("path")
        .data(topojson.feature(topology, topology.objects.countries).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "lightblue")
        .attr("stroke", "black");
});
