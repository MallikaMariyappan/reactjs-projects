export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string; // emoji flag
}

export const currencies: CurrencyInfo[] = [
  { code: "USD", name: "US Dollar",          symbol: "$",   flag: "🇺🇸" },
  { code: "EUR", name: "Euro",               symbol: "€",   flag: "🇪🇺" },
  { code: "GBP", name: "British Pound",      symbol: "£",   flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen",       symbol: "¥",   flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar",  symbol: "A$",  flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar",    symbol: "C$",  flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc",        symbol: "Fr",  flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan",       symbol: "¥",   flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee",       symbol: "₹",   flag: "🇮🇳" },
  { code: "KRW", name: "South Korean Won",   symbol: "₩",   flag: "🇰🇷" },
  { code: "BRL", name: "Brazilian Real",     symbol: "R$",  flag: "🇧🇷" },
  { code: "MXN", name: "Mexican Peso",       symbol: "$",   flag: "🇲🇽" },
  { code: "SGD", name: "Singapore Dollar",   symbol: "S$",  flag: "🇸🇬" },
  { code: "HKD", name: "Hong Kong Dollar",   symbol: "HK$", flag: "🇭🇰" },
  { code: "NOK", name: "Norwegian Krone",    symbol: "kr",  flag: "🇳🇴" },
  { code: "SEK", name: "Swedish Krona",      symbol: "kr",  flag: "🇸🇪" },
  { code: "DKK", name: "Danish Krone",       symbol: "kr",  flag: "🇩🇰" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿" },
  { code: "ZAR", name: "South African Rand", symbol: "R",   flag: "🇿🇦" },
  { code: "RUB", name: "Russian Ruble",      symbol: "₽",   flag: "🇷🇺" },
  { code: "TRY", name: "Turkish Lira",       symbol: "₺",   flag: "🇹🇷" },
  { code: "AED", name: "UAE Dirham",         symbol: "د.إ", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal",        symbol: "﷼",   flag: "🇸🇦" },
  { code: "THB", name: "Thai Baht",          symbol: "฿",   flag: "🇹🇭" },
  { code: "IDR", name: "Indonesian Rupiah",  symbol: "Rp",  flag: "🇮🇩" },
  { code: "MYR", name: "Malaysian Ringgit",  symbol: "RM",  flag: "🇲🇾" },
  { code: "PHP", name: "Philippine Peso",    symbol: "₱",   flag: "🇵🇭" },
  { code: "PKR", name: "Pakistani Rupee",    symbol: "₨",   flag: "🇵🇰" },
  { code: "EGP", name: "Egyptian Pound",     symbol: "E£",  flag: "🇪🇬" },
  { code: "NGN", name: "Nigerian Naira",     symbol: "₦",   flag: "🇳🇬" },
  { code: "PLN", name: "Polish Zloty",       symbol: "zł",  flag: "🇵🇱" },
  { code: "CZK", name: "Czech Koruna",       symbol: "Kč",  flag: "🇨🇿" },
  { code: "HUF", name: "Hungarian Forint",   symbol: "Ft",  flag: "🇭🇺" },
  { code: "ILS", name: "Israeli Shekel",     symbol: "₪",   flag: "🇮🇱" },
  { code: "CLP", name: "Chilean Peso",       symbol: "$",   flag: "🇨🇱" },
  { code: "ARS", name: "Argentine Peso",     symbol: "$",   flag: "🇦🇷" },
  { code: "VND", name: "Vietnamese Dong",    symbol: "₫",   flag: "🇻🇳" },
  { code: "BDT", name: "Bangladeshi Taka",   symbol: "৳",   flag: "🇧🇩" },
];

export const currencyMap = Object.fromEntries(
  currencies.map((c) => [c.code, c])
) as Record<string, CurrencyInfo>;

// Fallback static rates (USD base) — used when API is unavailable
export const fallbackRates: Record<string, number> = {
  USD: 1,     EUR: 0.92,  GBP: 0.79,  JPY: 149.5, AUD: 1.53,
  CAD: 1.36,  CHF: 0.88,  CNY: 7.24,  INR: 83.1,  KRW: 1325,
  BRL: 4.97,  MXN: 17.15, SGD: 1.34,  HKD: 7.82,  NOK: 10.56,
  SEK: 10.42, DKK: 6.88,  NZD: 1.63,  ZAR: 18.63, RUB: 90.5,
  TRY: 30.45, AED: 3.67,  SAR: 3.75,  THB: 35.1,  IDR: 15650,
  MYR: 4.72,  PHP: 56.5,  PKR: 278,   EGP: 30.9,  NGN: 1550,
  PLN: 4.01,  CZK: 22.6,  HUF: 354,   ILS: 3.72,  CLP: 893,
  ARS: 835,   VND: 24300, BDT: 110,
};
