import { Chart, Legend, Title, Tooltip } from "chart.js";

Chart.register(Legend, Title, Tooltip);

Chart.defaults.color = "#657b83";
Chart.defaults.borderColor = "rgba(147, 161, 161, 0.25)";
Chart.defaults.font.family = "'Fira Sans', 'sans-serif'";
Chart.defaults.font.size = 15;
Chart.defaults.font.lineHeight = 1;
Chart.defaults.layout.padding = 10;
Chart.defaults.plugins.legend.position = "bottom";
Chart.defaults.plugins.title.display = false;
Chart.defaults.plugins.title.padding = 1;
