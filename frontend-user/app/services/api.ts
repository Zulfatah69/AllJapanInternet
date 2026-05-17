import { API_BASE_URL, asArray } from '../lib/api';

const API = API_BASE_URL;

export async function getHomepage() {

  const res = await fetch(
    `${API}/homepage`
  );

  if (!res.ok) {

    throw new Error(
      "Failed to fetch homepage"
    );

  }

  return res.json();
}

export async function getProducts() {

  const res = await fetch(
    `${API}/products`
  );

  if (!res.ok) {

    throw new Error(
      "Failed to fetch products"
    );

  }

  return asArray(await res.json());
}

export async function getProduct(
  slug: string
) {

  const res = await fetch(
    `${API}/products/${slug}`
  );

  if (!res.ok) {

    throw new Error(
      "Failed to fetch product"
    );

  }

  return res.json();
}

export async function getPromos() {

  const res = await fetch(
    `${API}/promos`
  );

  if (!res.ok) {

    throw new Error(
      "Failed to fetch promos"
    );

  }

  return asArray(await res.json());
}

export async function orderPreview(
  payload: any
) {

  const res = await fetch(

    `${API}/order-preview`,

    {

      method: "POST",

      headers: {

        "Content-Type":
          "application/json",

      },

      body: JSON.stringify(
        payload
      ),

    }

  );

  if (!res.ok) {

    throw new Error(
      "Failed to preview order"
    );

  }

  return res.json();
}

export async function getShippingMethods() {

  const res = await fetch(
    `${API}/shipping-methods`
  );

  if (!res.ok) {

    throw new Error(
      "Failed to fetch shipping methods"
    );

  }

  return res.json();
}

export async function getSettings() {

  const res = await fetch(
    `${API}/settings`
  );

  if (!res.ok) {

    throw new Error(
      "Failed to fetch settings"
    );

  }

  return res.json();
}