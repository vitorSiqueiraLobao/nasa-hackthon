
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
polygonTemplate.fill = am4core.color("yellow");


let names = []
let nomes = []

chart.geodata.features.forEach(element => {
   names.push(element.properties.name)
});


names.sort(function(a,b){
   if(a<b)return -1
   if(a>b)return 1
   return 0
})



$.getJSON('dadoscertoscertos.json',function(data){
      data.forEach(function(data2){
         nomes.push(data2.Country.Region)
   })
}).then((data)=>{
   nomes.sort(function(a,b){
      if(a<b)return -1
      if(a>b)return 1
      return 0
   })
   //console.log(nomes)

   console.log(nomes)

   nomes = [ ...new Set(nomes)]
   //console.log(data)
   console.log("nomes")
   console.log(nomes)
   desenhaCasos(nomes,data)
   
})

let desenhaCasos = (nomes,data) =>{
   
      //10k mortos  - 255
      // 1  - x
      //mortes  * 0,0255 = cor
      //235


   let vetorPaises = []

   nomes.forEach((nome)=>{
      let idNovo
      let valor
      let nomeNovo
      for(let i = 0; i < 257;i++){
         if(nome == chart.geodata.features[i].properties.name){
            idNovo = chart.geodata.features[i].properties.id
            nomeNovo = nome
            if(nome == "China"){
               console.log("AAAAAAAAAAAAAIDS")
            }
         }

      }
      for(let i = 0; i <data.length;i++){
         if(nome == data[i].Country.Region){
            valor = data[i].Deaths
            beg = 255 - Math.round(data[i].Deaths*0.0255)
            if(beg < 0){
               beg = 0
            }
            cor = 'rgb(255,'+beg+','+beg+')'
         }
      }
      vetorPaises.push({
         "id":idNovo,
         "name": nomeNovo,
         "value": valor,
         "fill":am4core.color(cor),
         "cor" : cor
      })
      
   })
   
   polygonSeries.data = vetorPaises
   polygonTemplate.propertyFields.fill = 'fill';
   console.log(cor)
   vetorPaises.forEach((pinto)=>{
      if(pinto.name == "China"){
         console.log("MEU PINTAÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃO")
         console.log(pinto)
      }
   })
   console.log("data")
   console.log(data)
   console.log("vetorPaises")
   console.log(vetorPaises)
   console.log(nomes)
   console.log(chart.geodata.features)
   
   
   
   //return vetorPaises
}



// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#367B25");

var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
graticuleSeries.mapLines.template.line.stroke = am4core.color("#67b7dc");
graticuleSeries.mapLines.template.line.strokeOpacity = 0;
graticuleSeries.fitExtent = false;

chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#aadaff");
chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
