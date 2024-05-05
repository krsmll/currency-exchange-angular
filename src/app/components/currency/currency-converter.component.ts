import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { CurrencyService } from '../../services/currency.service';
import { ICurrency, IExchange } from '../../model/currency';
import { Observable } from 'rxjs';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapArrowLeftRight } from '@ng-icons/bootstrap-icons';

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
	checkoutForm = this.formBuilder.group({
		from: '',
		to: '',
		amount: null,
	});

	constructor(
		private formBuilder: FormBuilder,
		private storeService: StoreService,
		private currencyService: CurrencyService,
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
		const from = this.checkoutForm.value.from;
		const to = this.checkoutForm.value.to;
		const amount = this.checkoutForm.value.amount;

		if (from && to && amount) {
			this.convert(from, to, amount).subscribe((exchange) => {
				this.conversionResult = exchange
			});
		}
	}

	convert(from: string, to: string, amount: number): Observable<IExchange> {
		return this.currencyService.convert(from, to, amount);
	}
}
