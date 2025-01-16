interface FormatCurrencyPrps {
	amount: number;
	currency: "USD" | "EUR";
}

export function formatCurrency({ amount, currency }: FormatCurrencyPrps) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency,
	}).format(amount);
}
