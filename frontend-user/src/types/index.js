/**
 * Product Type
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} slug
 * @property {string} description
 * @property {string} code - VT, GJ, etc
 * @property {string} type - esim, phone, etc
 * @property {string} billing_type - monthly, prepaid
 * @property {string} category
 * @property {string} provider
 * @property {string} thumbnail
 * @property {number} rating
 * @property {number} reviews_count
 * @property {boolean} is_active
 * @property {boolean} is_bestseller
 * @property {Array} variants - VarianProduk[]
 */

/**
 * Variant Type
 * @typedef {Object} Variant
 * @property {number} id
 * @property {number} product_id
 * @property {string} name
 * @property {Array} prices - VariantPrice[]
 */

/**
 * Variant Price Type
 * @typedef {Object} VariantPrice
 * @property {number} id
 * @property {number} variant_id
 * @property {number} periode_pembelian_id
 * @property {number} price
 * @property {Object} periode - PeriodePembelian
 */

/**
 * Purchase Period Type
 * @typedef {Object} PeriodePembelian
 * @property {number} id
 * @property {string} name - "Monthly", "3 Months", etc
 * @property {number} durasi_hari
 */

/**
 * Promo Type
 * @typedef {Object} Promo
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} image
 * @property {string} link
 * @property {string} start_date
 * @property {string} end_date
 * @property {boolean} is_active
 */

/**
 * Category Type
 * @typedef {Object} Category
 * @property {number} id
 * @property {string} name
 * @property {boolean} is_active
 */

/**
 * API Response Type
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string} message
 * @property {any} data
 */

/**
 * Theme Type
 * @typedef {Object} Theme
 * @property {string} name - spring, summer, autumn, winter
 * @property {string} primary_color
 * @property {string} secondary_color
 * @property {string} accent_color
 */

export {};
