export const REGION_CURRENCIES: Record<string, string> = {
  US:'USD',CA:'CAD',MX:'MXN',GB:'GBP',IN:'INR',AU:'AUD',NZ:'NZD',SG:'SGD',AE:'AED',SA:'SAR',QA:'QAR',JP:'JPY',KR:'KRW',CN:'CNY',HK:'HKD',TW:'TWD',ID:'IDR',MY:'MYR',TH:'THB',PH:'PHP',VN:'VND',BD:'BDT',PK:'PKR',LK:'LKR',NP:'NPR',TR:'TRY',IL:'ILS',ZA:'ZAR',KE:'KES',NG:'NGN',EG:'EGP',MA:'MAD',GH:'GHS',TZ:'TZS',UG:'UGX',BR:'BRL',AR:'ARS',CL:'CLP',CO:'COP',PE:'PEN',UY:'UYU',CH:'CHF',NO:'NOK',SE:'SEK',DK:'DKK',PL:'PLN',CZ:'CZK',HU:'HUF',RO:'RON',IS:'ISK',UA:'UAH',GE:'GEL',KZ:'KZT',UZ:'UZS',AT:'EUR',BE:'EUR',CY:'EUR',DE:'EUR',EE:'EUR',ES:'EUR',FI:'EUR',FR:'EUR',GR:'EUR',HR:'EUR',IE:'EUR',IT:'EUR',LT:'EUR',LU:'EUR',LV:'EUR',MT:'EUR',NL:'EUR',PT:'EUR',SI:'EUR',SK:'EUR',AD:'EUR',MC:'EUR',SM:'EUR',VA:'EUR',EC:'USD',PA:'USD'
};
export function currencyForCountry(country?: string) { return REGION_CURRENCIES[country?.toUpperCase() || ''] || 'USD'; }
export function browserCurrency(language: string) {
  try { return currencyForCountry(new Intl.Locale(language).region); } catch { return 'USD'; }
}
export function formatAmount(amount: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, currencyDisplay: 'narrowSymbol', maximumFractionDigits: ['JPY','KRW','VND','CLP'].includes(currency) ? 0 : 2 }).format(amount);
}
export function localEquivalent(usd: number, currency: string, rates: Record<string, number>): number | null {
  if (currency === 'USD') return usd;
  const rate = rates[currency.toLowerCase()];
  return Number.isFinite(rate) && rate > 0 ? usd * rate : null;
}
export async function getExchangeRates() {
  const urls = ['https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json','https://latest.currency-api.pages.dev/v1/currencies/usd.json'];
  for (const url of urls) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(6000), referrerPolicy: 'no-referrer' });
      if (!response.ok) continue;
      const data = await response.json();
      const age = Date.now() - Date.parse(`${data.date}T00:00:00Z`);
      if (!data.usd || !Number.isFinite(age) || age < -86400000 || age > 4 * 86400000) continue;
      return { rates: data.usd as Record<string, number>, date: data.date as string };
    } catch { /* Fall back to the second independent CDN. */ }
  }
  return { rates: {} as Record<string, number>, date: '' };
}
