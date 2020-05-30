/**
 * --------------------------------------------------------
 * This demo was created using amCharts V4 preview release.
 *
 * V4 is the latest installement in amCharts data viz
 * library family, to be released in the first half of
 * 2018.
 *
 * For more information and documentation visit:
 * https://www.amcharts.com/docs/v4/
 * --------------------------------------------------------
 */

// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);

chart.panBehavior = "rotateLongLat";

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Orthographic();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.north = 90;



// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#74B266");


let i = 0
$.getJSON("metadados.json", function(data){
   data.forEach(function(dataJson,index){
      for(let j = 256;j > 0;j--){
         if(chart.geodata.features[j].properties.name == dataJson.TableName){
            i++
            console.log(i)
         }
      }  

   })
})
console.log(i)







// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#367B25");

var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
graticuleSeries.mapLines.template.line.stroke = am4core.color("#67b7dc");
graticuleSeries.mapLines.template.line.strokeOpacity = 1;
graticuleSeries.fitExtent = false;

chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#aadaff");
chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
