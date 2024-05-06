import { Component, Inject, Input } from '@angular/core';
import {
	ApexAxisChartSeries,
	ApexChart,
	ApexDataLabels,
	ApexFill,
	ApexMarkers,
	ApexTitleSubtitle,
	ApexTooltip,
	ApexXAxis,
	ApexYAxis,
	NgApexchartsModule,
} from 'ng-apexcharts';
import { CurrencyService } from '../../services/currency.service';
import { ICurrencyHistory, ICurrencyHistoryNode } from '../../model/currency';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IChartDialogData} from "../../model/chart-dialog-data";

@Component({
	selector: 'app-currency-history-graph',
	standalone: true,
	imports: [NgApexchartsModule],
	templateUrl: './currency-history-graph.component.html',
	styleUrl: './currency-history-graph.component.css',
})
export class CurrencyHistoryGraphComponent {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	dataLabels: ApexDataLabels;
	markers: ApexMarkers;
	title: ApexTitleSubtitle;
	fill: ApexFill;
	yaxis: ApexYAxis;
	xaxis: ApexXAxis;
	tooltip: ApexTooltip;

	constructor(private currencyService: CurrencyService, @Inject(MAT_DIALOG_DATA) public data: IChartDialogData) {
		const fromUnix = data.fromUnix;
		const history = data.history;
		let ts2 = fromUnix * 1000;
		let rates: any[] = [];
		history.history.forEach((node: ICurrencyHistoryNode) => {
			ts2 = ts2 + 86400000;
			rates.push([node.dateUnixSeconds * 1000, node.rate]);
		});

		this.series = [
			{
				name: 'Rate',
				data: rates,
			},
		];
		this.chart = {
			type: 'area',
			stacked: false,
			height: 350,
			width: 800,
			zoom: {
				type: 'x',
				enabled: true,
				autoScaleYaxis: true,
			},
			toolbar: {
				autoSelected: 'zoom',
			},
		};
		this.dataLabels = {
			enabled: false,
		};
		this.markers = {
			size: 0,
		};
		this.title = {
			text: history.from.code + ' to ' + history.to.code + ' Rate History',
			align: 'left',
		};
		this.fill = {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				inverseColors: false,
				opacityFrom: 0.5,
				opacityTo: 0,
				stops: [0, 90, 100],
			},
		};
		this.yaxis = {
			title: {
				text: 'Rate',
			},
		};
		this.xaxis = {
			type: 'datetime',
		};
		this.tooltip = {
			shared: false,
		};
	}
}
