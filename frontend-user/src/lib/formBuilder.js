/**
 * Build dynamic form based on product code and type
 * @param {Object} product - {code, type, billing_type}
 * @returns {Array} - Array of form fields
 */
export const buildDynamicForm = (product) => {
  const fields = [];

  if (!product) return fields;

  const { code, type, billing_type } = product;

  // Common fields
  fields.push({
    name: 'quantity',
    label: 'Quantity',
    type: 'number',
    required: true,
    min: 1,
  });

  // E-SIM products
  if (type === 'esim' || code?.includes('ESIM')) {
    fields.push({
      name: 'eid',
      label: 'EID (Device Identifier)',
      type: 'text',
      required: true,
      placeholder: '89xxxxxxxxxxxxxxxxxxxxxxxx',
    });
  }

  // Phone + Internet products
  if (type === 'phone' || code?.includes('PHONE')) {
    fields.push(
      {
        name: 'phone_number',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        placeholder: '+81 XX XXXX XXXX',
      },
      {
        name: 'ekyc_verification',
        label: 'eKYC Verification',
        type: 'text',
        required: true,
        placeholder: 'Upload your ID document',
      }
    );
  }

  // VT specific
  if (code === 'VT') {
    fields.push({
      name: 'vt_note',
      label: 'Special Request (optional)',
      type: 'textarea',
      placeholder: 'Payment cycle: 20-28 date every month',
    });
  }

  // GJ specific
  if (code === 'GJ') {
    fields.push({
      name: 'gj_note',
      label: 'Special Request (optional)',
      type: 'textarea',
      placeholder: 'Payment cycle: 18-24 date every month',
    });
  }

  // Monthly billing note
  if (billing_type === 'monthly') {
    fields.push({
      name: 'billing_note',
      label: 'Billing Information',
      type: 'info',
      message: 'This product will be billed monthly on your selected date.',
    });
  }

  return fields;
};

/**
 * Get form note/instruction based on product
 * @param {Object} product
 * @returns {string}
 */
export const getFormNote = (product) => {
  if (!product) return '';

  const { code, type, billing_type } = product;

  if (type === 'esim') {
    return 'E-SIM requires your device EID number. You can find it in your device settings.';
  }

  if (type === 'phone') {
    return 'Phone + Internet products require eKYC verification for activation.';
  }

  if (code === 'VT') {
    return 'VT Product: Monthly billing on 20-28th of each month.';
  }

  if (code === 'GJ') {
    return 'GJ Product: Monthly billing on 18-24th of each month.';
  }

  return '';
};

/**
 * Validate form data based on product
 * @param {Object} formData
 * @param {Object} product
 * @returns {Object} - {isValid, errors}
 */
export const validateFormData = (formData, product) => {
  const errors = {};

  if (!formData.quantity || formData.quantity < 1) {
    errors.quantity = 'Quantity is required and must be at least 1';
  }

  if (product?.type === 'esim' && !formData.eid) {
    errors.eid = 'EID is required for E-SIM products';
  }

  if (product?.type === 'phone' && !formData.phone_number) {
    errors.phone_number = 'Phone number is required';
  }

  if (product?.type === 'phone' && !formData.ekyc_verification) {
    errors.ekyc_verification = 'eKYC verification is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
