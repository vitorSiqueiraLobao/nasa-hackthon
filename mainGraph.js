// Apply chart themes
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_kelly);

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

chart.marginRight = 40000;


let nomes = []
let vetorPaises =[]

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

let vetorPaises = []

nomes.forEach((nome)=>{
  let idNovo
  let valorMorte
  let valorContagio
  let valorRecuperacao
  let nomeNovo

  for(let i = 0; i <data.length;i++){
     if(nome == data[i].Region){
        nomeNovo = nome
        valorMorte = data[i].Deaths
        valorContagio = data[i].Confirmed
        valorRecuperacao = data[i].Recovered
     }
  }
  vetorPaises.push({
     "id":idNovo,
     "name":nome,
     "Deaths": valorMorte,
     "Confirmed":valorContagio,
     "Recupered":valorRecuperacao,
  })
  
})
chart.data = vetorPaises

var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "name";
categoryAxis.title.text = "Contry";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.cellStartLocation = 0.2
categoryAxis.renderer.cellEndLocation = 0.8


var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Data";

// Create series

var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "Deaths";
series.dataFields.categoryX = "name";
series.name = "Deaths";
series.tooltipText = "Deaths: [bold]{valueY}[/]";
series.stacked = true;


var series2 = chart.series.push(new am4charts.ColumnSeries());
series2.dataFields.valueY = "Confirmed";
series2.dataFields.categoryX = "name";
series2.name = "Confirmed Cases";
series2.tooltipText = "Confirmed: [bold]{valueY}[/]";
series2.stacked = true;

var series3 = chart.series.push(new am4charts.ColumnSeries());
series3.dataFields.valueY = "Recupered";
series3.dataFields.categoryX = "name";
series3.name = "Recupered";
series3.tooltipText = "Recupered: [bold]{valueY}[/]";
series3.stacked = true;

}


chart.legend = new am4charts.Legend();
// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.scrollbarY = new am4core.Scrollbar();
chart.scrollbarY.startGrip.disabled = true;
chart.scrollbarY.endGrip.disabled = true;

chart.scrollbarX = new am4charts.XYChartScrollbar();
chart.scrollbarX.startGrip.disabled = true;
chart.scrollbarX.endGrip.disabled = true;
