import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './chart-page.component.html',
  styleUrl: './chart-page.component.css'
})
export class ChartPageComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  years: number[] = [];
  selectedYear = new Date().getFullYear();
  financialYearStart = '';
  financialYearEnd = '';

  salaryData: Record<number, any> = {
    2025: { Invoice: 100, VAT: 20, Expense: 0, Bonus: 0, OtherIncome: 50, Gross: 170 },
    2024: { Invoice: 250, VAT: 50, Expense: 30, Bonus: 20, OtherIncome: 70, Gross: 420 },
    2023: { Invoice: 180, VAT: 35, Expense: 25, Bonus: 15, OtherIncome: 40, Gross: 295 },
    2022: { Invoice: 300, VAT: 60, Expense: 40, Bonus: 50, OtherIncome: 90, Gross: 540 },
    2021: { Invoice: 220, VAT: 45, Expense: 35, Bonus: 25, OtherIncome: 80, Gross: 405 }
  };

  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Invoice', 'VAT', 'Expense', 'Bonus', 'Other Income'],
    datasets: [{
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#81C784', '#BA68C8']
    }]
  };

  doughnutChartType: 'doughnut' = 'doughnut';

  chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '70%',
    plugins: {
      tooltip: { enabled: true },
      legend: { display: true, position: 'bottom' }
    }
  };

  plugins = [{
    id: 'centerTextPlugin',
    afterDraw: (chart: any) => {
      const { width, height, ctx } = chart;
      const gross = this.getGrossSalary();
      const spacing = 20;
      ctx.save();
      
      const fontSize = (height / 220).toFixed(2); 
      ctx.font = `${fontSize}em sans-serif`;
      
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      
      ctx.fillText('Gross Salary', width / 2, height / 2 - spacing);
      ctx.fillText(gross.toString(), width / 2, height / 2 + spacing);
      ctx.restore();
    }
  }];  

  ngOnInit(): void {
    this.years = Array.from({ length: 11 }, (_, i) => this.selectedYear - 10 + i);
    this.updateView();
  }

  onYearChange(): void {
    this.updateView();
  }

  private updateView(): void {
    this.setFinancialYear();
    this.updateChartData();
  }

  private setFinancialYear(): void {
    const start = this.getNextWeekday(new Date(this.selectedYear, 0, 1), 1);
    const end = this.getNextWeekday(new Date(this.selectedYear, 11, 31), -1);
    this.financialYearStart = this.formatDate(start);
    this.financialYearEnd = this.formatDate(end);
  }

  private updateChartData(): void {
    const data = this.salaryData[this.selectedYear];
    this.doughnutChartData.datasets[0].data = data ? 
      [data.Invoice, data.VAT, data.Expense, data.Bonus, data.OtherIncome] : [];
    this.chart?.update();
  }

  private getGrossSalary(): number {
    return this.salaryData[this.selectedYear]?.Gross || 0;
  }

  private getNextWeekday(date: Date, direction: number): Date {
    while ([0, 6].includes(date.getDay())) {
      date.setDate(date.getDate() + direction);
    }
    return date;
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const suffix = [1, 21, 31].includes(day) ? 'st' : [2, 22].includes(day) ? 'nd' : [3, 23].includes(day) ? 'rd' : 'th';
    return `${day}${suffix} ${month} ${year}`;
  }
}

