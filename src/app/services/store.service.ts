import { Injectable } from '@angular/core';
import { ICurrencyList } from '../model/currency';

@Injectable({
	providedIn: 'root',
})
export class StoreService {
	constructor() {}

	getCurrencies(): ICurrencyList | null {
		const currencies = localStorage.getItem('currencies');
		if (!currencies) {
			return null;
		}

		return JSON.parse(currencies) as ICurrencyList;
	}

	setCurrencies(currencies: ICurrencyList): void {
		localStorage.setItem('currencies', JSON.stringify(currencies));
	}
}
