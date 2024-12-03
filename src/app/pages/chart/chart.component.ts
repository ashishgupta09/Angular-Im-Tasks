import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SharedService } from '../../core/service/shared.service';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  providers: [SharedService]
})
export class ChartComponent implements OnInit {

  chartData: any;
  realData: any[] = [];
  labelData: any[] = [];
  colorData: any[] = [];

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.getChartInfo().subscribe({
      next: (result) => {
        this.chartData = result;
        if (this.chartData != null) {
          this.labelData = [];
          const mainData = [];
          const colorData = [];

          for (let i = 0; i < this.chartData.length; i++) {
            this.labelData.push(this.chartData[i].year);
            mainData.push(this.chartData[i].amount);
            colorData.push(this.chartData[i].colorcode);
          }

          this.renderChart(this.labelData, mainData, colorData, 'pie', 'piechart');
          this.renderChart(this.labelData, mainData, colorData, 'bar', 'barchart');
          this.renderChart(this.labelData, mainData, colorData, 'doughnut', 'dochart');
          this.renderChart(this.labelData, mainData, colorData, 'polarArea', 'pochart');
          this.renderChart(this.labelData, mainData, colorData, 'radar', 'rochart');
          this.renderBubbleChart();
          this.renderScatterChart();
        }
      },
      error: (err) => {
        console.error('Error fetching chart data:', err);
      }
    });
  }

  // first chart
  renderChart(labelData: any, mainData: any, colorData: any, type: any, id: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labelData,
        datasets: [{
          label: '# of Votes',
          data: mainData,
          backgroundColor: colorData,
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // second chart
  renderBubbleChart() {
    const data = {
      datasets: [{
        label: 'First Dataset',
        data: [{
          x: 20,
          y: 30,
          r: 15
        }, {
          x: 40,
          y: 10,
          r: 10
        }],
        backgroundColor: 'rgb(255, 99, 132)'
      }]
    };
    const myChart = new Chart('bubchart', {
      type: 'bubble',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // third chart
  renderScatterChart() {
    const data = {
      datasets: [{
        label: 'Scatter Dataset',
        data: [{
          x: -10,
          y: 0
        }, {
          x: 0,
          y: 10
        }, {
          x: 10,
          y: 5
        }, {
          x: 0.5,
          y: 5.5
        }],
        backgroundColor: 'rgb(255, 99, 132)'
      }],
    };
    const myChart = new Chart('scatterchart', {
      type: 'scatter',
      data: data,
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }
    });
  }

}
