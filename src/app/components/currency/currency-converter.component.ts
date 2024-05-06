import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { CurrencyService } from '../../services/currency.service';
import { ICurrency, ICurrencyHistory, IExchange } from '../../model/currency';
import { Observable } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapArrowLeftRight } from '@ng-icons/bootstrap-icons';
import { CurrencyHistoryGraphComponent } from '../currency-history-graph/currency-history-graph.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-currency-converter',
	standalone: true,
	templateUrl: './currency-converter.component.html',
	styleUrls: ['./currency-converter.component.css'],
	imports: [FormsModule, TitleCasePipe, NgIconComponent, ReactiveFormsModule],
	viewProviders: [provideIcons({ bootstrapArrowLeftRight })],
})
export class CurrencyConverterComponent implements OnInit {
	currencies: ICurrency[] = [];
	conversionResult: IExchange | null = null;
	history: ICurrencyHistory | null = null;
	errors: string[] = [];
	checkoutForm = this.formBuilder.group({
		from: '',
		to: '',
		amount: null,
	});

	constructor(
		private formBuilder: FormBuilder,
		private storeService: StoreService,
		private currencyService: CurrencyService,
		public dialog: MatDialog,
	) {}

	ngOnInit(): void {
		const currencies = this.storeService.getCurrencies();
		if (currencies) {
			this.currencies = currencies.currencies;
		} else {
			this.currencyService.getCurrencies().subscribe((currencies) => {
				this.currencies = currencies.currencies;
				this.storeService.setCurrencies(currencies);
			});
		}
	}

	swapValues(): void {
		const from = this.checkoutForm.value.from;
		const to = this.checkoutForm.value.to;
		this.checkoutForm.patchValue({ from: to, to: from });
	}

	onSubmit(): void {
		this.conversionResult = null;
		this.errors = [];

		const from = this.checkoutForm.value.from;
		const to = this.checkoutForm.value.to;
		const amount = this.checkoutForm.value.amount;

		if (!from) {
			this.errors.push('Please select a currency to convert from');
		}

		if (!to) {
			this.errors.push('Please select a currency to convert to');
		}

		if (!amount) {
			this.errors.push('Please enter an amount to convert');
		}

		if (this.errors.length > 0) {
			return;
		}

		if (from && to && amount) {
			this.convert(from, to, amount).subscribe((exchange) => {
				this.conversionResult = exchange;
			});
		}
	}

	showRateHistory(): void {
		const from = this.checkoutForm.value.from;
		const to = this.checkoutForm.value.to;
		if (!from) {
			this.errors.push('Please select a currency to convert from');
		}

		if (!to) {
			this.errors.push('Please select a currency to convert to');
		}

		if (this.errors.length > 0) {
			return;
		}

		this.fetchHistory(from!!, to!!).subscribe((history) => {
			this.dialog.open(CurrencyHistoryGraphComponent, {
				data: {
					fromUnix: from,
					history: history,
				}
			});
		});
	}

	private convert(
		from: string,
		to: string,
		amount: number,
	): Observable<IExchange> {
		return this.currencyService.convert(from, to, amount);
	}

	private fetchHistory(
		from: string,
		to: string,
	): Observable<ICurrencyHistory> {
		return this.currencyService.getCurrencyHistory(from, to);
	}
}
