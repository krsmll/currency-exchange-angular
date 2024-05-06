import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { map, Observable, of } from 'rxjs';
import { ICurrencyHistory, ICurrencyList, IExchange } from '../model/currency';
import { StoreService } from './store.service';

@Injectable({
	providedIn: 'root',
})
export class CurrencyService {
	constructor(
		private config: Config,
		private http: HttpClient,
		private store: StoreService,
	) {}

	getCurrencies(): Observable<ICurrencyList> {
		const currencies = this.store.getCurrencies();
		if (currencies) {
			return of(currencies);
		}
		return this.http
			.get<ICurrencyList>(`${this.config.API_URL}/currencies`)
			.pipe(
				map((currencies) => {
					this.store.setCurrencies(currencies);
					return currencies;
				}),
			);
	}

	getCurrencyHistory(
		from: string,
		to: string,
	): Observable<ICurrencyHistory> {
		return this.http.get<ICurrencyHistory>(
			`${this.config.API_URL}/currencies/history?from=${from}&to=${to}`,
		);
	}

	convert(from: string, to: string, amount: number): Observable<IExchange> {
		return this.http.get<IExchange>(
			`${this.config.API_URL}/currencies/exchange?from=${from}&to=${to}&amount=${amount}`,
		);
	}
}
