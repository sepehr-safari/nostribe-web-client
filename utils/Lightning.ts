import { bytesToHex } from '@noble/hashes/utils';
//@ts-ignore
import { decode as invoiceDecode } from 'light-bolt11-decoder';
import { Event } from "nostr-tools";

let lastBitcoinPrice: any;

const currencies: { [key: string]: string; } = {
  USD: '$',
  EUR: '€',
  JPY: '¥',
  SATS: '',
};

// set default according to locale
let displayCurrency = 'USD';
const locale = navigator.language;
const EUR_LOCALE_PREFIXES = [
  'de',
  'fr',
  'it',
  'es',
  'pt',
  'el',
  'nl',
  'ga',
  'fi',
  'sv',
  'et',
  'lv',
  'lt',
  'sk',
  'sl',
  'mt',
  'hu',
  'pl',
  'cs',
  'bg',
  'ro',
];
if (EUR_LOCALE_PREFIXES.some((prefix) => locale.startsWith(prefix))) {
  displayCurrency = 'EUR';
} else if (locale.startsWith('ja')) {
  displayCurrency = 'JPY';
}

const getExchangeRate = () => {
  fetch('https://api.kraken.com/0/public/Ticker?pair=XBT' + displayCurrency)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch data from Kraken API');
      }
    })
    .then((data) => {
      lastBitcoinPrice = parseFloat(data?.result?.['XXBTZ' + displayCurrency]?.c?.[0]);
      console.log('lastBitcoinPrice', lastBitcoinPrice, displayCurrency);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

// TODO get saved displaycurrency
getExchangeRate();

if (!lastBitcoinPrice) {
  setTimeout(getExchangeRate, 1000);
}

export interface InvoiceDetails {
  amount?: number;
  expire?: number;
  timestamp?: number;
  description?: string;
  descriptionHash?: string;
  paymentHash?: string;
  expired: boolean;
}

export function decodeInvoice(pr: string): InvoiceDetails | undefined {
  try {
    const parsed = invoiceDecode(pr);

    const amountSection = parsed.sections.find((a: any) => a.name === 'amount');
    const amount = amountSection ? Number(amountSection.value as number | string) : undefined;

    const timestampSection = parsed.sections.find((a: any) => a.name === 'timestamp');
    const timestamp = timestampSection
      ? Number(timestampSection.value as number | string)
      : undefined;

    const expirySection = parsed.sections.find((a: any) => a.name === 'expiry');
    const expire = expirySection ? Number(expirySection.value as number | string) : undefined;
    const descriptionSection = parsed.sections.find((a: any) => a.name === 'description')?.value;
    const descriptionHashSection = parsed.sections.find(
      (a: any) => a.name === 'description_hash',
    )?.value;
    const paymentHashSection = parsed.sections.find((a: any) => a.name === 'payment_hash')?.value;
    const ret = {
      amount: amount,
      expire: timestamp && expire ? timestamp + expire : undefined,
      timestamp: timestamp,
      description: descriptionSection as string | undefined,
      descriptionHash: descriptionHashSection
        ? /* bytesToHex(descriptionHashSection as Uint8Array) tmp disabled */ undefined
        : undefined,
      paymentHash: paymentHashSection ? undefined /* bytesToHex(paymentHashSection as Uint8Array)  tmp */ : undefined,
      expired: false,
    };
    if (ret.expire) {
      ret.expired = ret.expire < new Date().getTime() / 1000;
    }
    return ret;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

// 1000 -> 1.00K etc
export function formatSats(amount: number): string {
  if (amount < 1000) {
    return amount.toString();
  }
  if (amount < 1000000) {
    return (amount / 1000).toFixed(2) + 'K';
  }
  if (amount < 1000000000) {
    return (amount / 1000000).toFixed(2) + 'M';
  }
  return (amount / 1000000000).toFixed(2) + 'B';
}

function customFormatNumber(value: number) {
  let maxDecimals;
  if (value >= 1) {
    maxDecimals = 2;
  } else if (value >= 0.01) {
    maxDecimals = 2;
  } else {
    maxDecimals = 4;
  }

  const factor = Math.pow(10, maxDecimals);
  value = Math.round(value * factor) / factor;

  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDecimals,
  });
}

export function formatAmount(sats: number): string {
  if (lastBitcoinPrice && displayCurrency !== 'SATS') {
    const dollarAmount = (sats / 100000000) * lastBitcoinPrice;
    const formattedAmount = customFormatNumber(dollarAmount);
    return currencies[displayCurrency] + ' ' + formattedAmount;
  } else {
    return formatSats(sats);
  }
}

export function getZappingUser(event: Event) {
  const description = event.tags?.find((t: any) => t[0] === 'description')?.[1];
  if (!description) {
    return;
  }
  let obj;
  try {
    obj = JSON.parse(description);
  } catch (e) {
    return;
  }
  const npub = obj.pubkey;
  return npub;
}
