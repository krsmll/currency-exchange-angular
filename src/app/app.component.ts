import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyConverterComponent } from './components/currency/currency-converter.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CurrencyConverterComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'exchange';
}
