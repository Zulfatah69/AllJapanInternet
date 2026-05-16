import { appConfig } from '../services/config';

/**
 * Generate WhatsApp message from form data
 * @param {Object} formData - {productName, variant, period, price, ...customFields}
 * @returns {string} - WhatsApp message text
 */
export const generateWhatsappMessage = (formData) => {
  const {
    productName,
    productCode,
    variant,
    period,
    price,
    ...customFields
  } = formData;

  let message = `*Order All Japan Internet*\n\n`;
  message += `Product: ${productName}\n`;
  
  if (variant) message += `Variant: ${variant}\n`;
  if (period) message += `Period: ${period}\n`;
  if (price) message += `Price: ¥${price.toLocaleString('id-ID')}\n`;

  // Dynamic fields based on product code
  if (productCode === 'VT') {
    message += `\nNote: VT payment period: 20-28 date every month\n`;
  } else if (productCode === 'GJ') {
    message += `\nNote: GJ payment period: 18-24 date every month\n`;
  }

  // Add custom fields
  Object.entries(customFields).forEach(([key, value]) => {
    if (value && key !== 'productName' && key !== 'productCode') {
      message += `${key}: ${value}\n`;
    }
  });

  message += `\n---\nTime: ${new Date().toLocaleString('id-ID')}`;

  return message;
};

/**
 * Redirect to WhatsApp with message
 * @param {Object} formData
 */
export const openWhatsappCheckout = (formData) => {
  const message = generateWhatsappMessage(formData);
  const encodedMessage = encodeURIComponent(message);
  const phone = appConfig.whatsapp.replace('https://wa.me/', '');
  
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

/**
 * Get phone number from whatsapp config
 * @returns {string}
 */
export const getWhatsappPhone = () => {
  return appConfig.whatsapp;
};
