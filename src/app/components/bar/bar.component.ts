import { Component, OnInit } from '@angular/core';
import {Chart as ChartInstanceType, ChartType, ChartConfiguration, ChartTypeRegistry} from 'chart.js'


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {


  public chart!: ChartInstanceType;

  constructor() { }

  ngOnInit(): void {

    this.generateChart();
  }

  generateChart(){
    
    //@ts-ignore
    this.chart = new ChartInstanceType("bar-chart", {
      type: 'bar' as ChartType, 

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:1.5
      }
      
    });
  }

}
