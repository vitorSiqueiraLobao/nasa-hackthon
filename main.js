
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
polygonTemplate.tooltipText = "{name}"
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

let loadScreen = () =>{

$.getJSON('dados_agoracertos.json',function(data){
      data.forEach(function(data2){

         nomes.push(data2.Region)
   })
}).then((data)=>{
   nomes.sort(function(a,b){
      if(a<b)return -1
      if(a>b)return 1
      return 0
   })
   

   nomes = [ ...new Set(nomes)]
  
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
         }

      }
      for(let i = 0; i <data.length;i++){
         if(nome == data[i].Region){
            valor = data[i].Deaths
            let stringValor = ""+valor
           
   
            cor = returnColor(data[i],select)
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



   
   //return vetorPaises
}

//100k - 255
//1 - x

let returnColor = (data) => {
   let select = $("select").val()
   if(select == "Deaths"){
      beg = 255 - Math.round(data.Deaths*0.0255)
      if(beg < 0){
         beg = 0
      }
      return 'rgb(255,'+beg+','+beg+')'
   }else if(select == 'Confirmed'){
      beg = 255 - Math.round(data.Confirmed * 0.000255)
      if(beg < 0){
         beg = 0
      }
      return 'rgb(255,'+beg+',255)'
   }else if(select == 'Recovered'){
      beg = 255 - Math.round(data.Recovered * 0.00125)
      if(beg < 0){
         beg = 0
      }
      return 'rgb('+beg+',255,'+beg+')'
   }else{
      beg = 255 - Math.round(data.Sanitation * 2.55)
      if(beg < 0){
         beg = 0
      }
      let laranja = beg
      if(laranja < 143){
         laranja = 143
      }
      if(data.Sanitation == 0){
         return 'yellow'
      }else{ return 'rgb(255,'+laranja+','+beg+')'}
   }
}

}
$.getJSON('dadoscertoscertos.json').then(()=>{
   loadScreen()
})


// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");


var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
graticuleSeries.mapLines.template.line.stroke = am4core.color("#67b7dc");
graticuleSeries.mapLines.template.line.strokeOpacity = 0.2;
graticuleSeries.fitExtent = false;
hs.properties.fill = am4core.color("rgba(0,0,255,0.5)");
chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#aadaff");
chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;


let update = () =>{
   let select = $("select").val()
   let tituloLegenda = document.querySelector("h1")
   let dg = document.querySelector(".dg")
   console.log(select == "Recovered")
   if(select == 'Deaths'){
      dg.style.background = 'linear-gradient(180deg, rgba(255,0,0,1) 0%, rgba(255,255,255,1) 100%)'
   }else if(select == "Confirmed"){
      dg.style.background = 'linear-gradient(180deg, rgba(255,0,255,1) 0%, rgba(255,255,255,1) 100%)'
   }else if(select == "Recovered"){
      dg.style.background = 'linear-gradient(180deg, rgba(0,255,0,1) 0%, rgba(255,255,255,1) 100%)'
   }else{
      dg.style.background = 'linear-gradient(180deg, rgba(255,143,0,1) 0%, rgba(255,255,255,1) 100%)'
   }
   tituloLegenda.innerHTML = select
   loadScreen()
}
