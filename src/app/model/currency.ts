export interface ICurrency {
	code: string;
	name: string;
}

export interface ICurrencyExchangeForm {
	from: string;
	to: string;
	amount: number;
}

export interface ICurrencyList {
	currencies: ICurrency[];
}

export interface IExchange {
	from: ICurrency;
	to: ICurrency;
	rate: number;
	minorUnits: number;
	originalAmount: number;
	convertedAmount: number;
}
