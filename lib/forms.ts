export type MerchantInput = {
  company: string;
  name: string;
  email: string;
  website: string;
  country: string;
  category: string;
  price: string;
  inventory?: string;
  productUrl?: string;
  markets?: string;
  message?: string;
  tiktokShop?: string;
  monthlySales?: string;
};

export type HostInput = {
  name: string;
  email: string;
  countryCity: string;
  socialUrl?: string;
  languages?: string;
  categories?: string;
  about?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

function clean(value: unknown, max = 1000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function validUrl(value: string) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function parseMerchant(body: unknown):
  | { ok: true; data: MerchantInput }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request." };
  }

  const raw = body as Record<string, unknown>;

  // Honeypot field. Real users never see this.
  if (clean(raw.company_site, 200)) {
    return { ok: false, error: "Invalid request." };
  }

  const data: MerchantInput = {
    company: clean(raw.company, 120),
    name: clean(raw.name, 120),
    email: clean(raw.email, 200).toLowerCase(),
    website: clean(raw.website, 500),
    country: clean(raw.country, 80),
    category: clean(raw.category, 100),
    price: clean(raw.price, 80),
    inventory: clean(raw.inventory, 120),
    productUrl: clean(raw.productUrl, 500),
    markets: clean(raw.markets, 300),
    message: clean(raw.message, 2500),
    tiktokShop: clean(raw.tiktokShop, 40),
    monthlySales: clean(raw.monthlySales, 80)
  };

  if (
    !data.company ||
    !data.name ||
    !data.email ||
    !data.website ||
    !data.country ||
    !data.category ||
    !data.price
  ) {
    return { ok: false, error: "Please complete all required fields." };
  }

  if (!emailRegex.test(data.email)) {
    return { ok: false, error: "Please enter a valid email." };
  }

  if (!validUrl(data.website)) {
    return { ok: false, error: "Please enter a valid website URL." };
  }

  if (data.productUrl && !validUrl(data.productUrl)) {
    return { ok: false, error: "Please enter a valid product URL." };
  }

  return { ok: true, data };
}

export function parseHost(body: unknown):
  | { ok: true; data: HostInput }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request." };
  }

  const raw = body as Record<string, unknown>;

  if (clean(raw.company_site, 200)) {
    return { ok: false, error: "Invalid request." };
  }

  const data: HostInput = {
    name: clean(raw.name, 120),
    email: clean(raw.email, 200).toLowerCase(),
    countryCity: clean(raw.countryCity, 160),
    socialUrl: clean(raw.socialUrl, 500),
    languages: clean(raw.languages, 300),
    categories: clean(raw.categories, 500),
    about: clean(raw.about, 2000)
  };

  if (!data.name || !data.email || !data.countryCity) {
    return { ok: false, error: "Please complete all required fields." };
  }

  if (!emailRegex.test(data.email)) {
    return { ok: false, error: "Please enter a valid email." };
  }

  if (data.socialUrl && !validUrl(data.socialUrl)) {
    return { ok: false, error: "Please enter a valid social URL." };
  }

  return { ok: true, data };
}
