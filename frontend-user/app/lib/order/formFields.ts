import type { Product } from '../../types/api';

export type OrderFieldKey =
    | 'name'
    | 'email'
    | 'phone'
    | 'postcode'
    | 'address'
    | 'eid'
    | 'ekyc'
    | 'notes';

export type OrderField = {
    key: OrderFieldKey;
    label: string;
    placeholder: string;
    type: 'text' | 'email' | 'tel' | 'textarea';
    required: boolean;
};

const BASE_FIELDS: Record<OrderFieldKey, Omit<OrderField, 'required'>> = {
    name: {
        key: 'name',
        label: 'Full Name',
        placeholder: 'Your full name',
        type: 'text',
    },
    email: {
        key: 'email',
        label: 'Email',
        placeholder: 'email@example.com',
        type: 'email',
    },
    phone: {
        key: 'phone',
        label: 'Phone',
        placeholder: '+81 ...',
        type: 'tel',
    },
    postcode: {
        key: 'postcode',
        label: 'Postcode',
        placeholder: '123-4567',
        type: 'text',
    },
    address: {
        key: 'address',
        label: 'Address',
        placeholder: 'Full delivery address in Japan',
        type: 'textarea',
    },
    eid: {
        key: 'eid',
        label: 'EID',
        placeholder: '32-digit EID for eSIM',
        type: 'text',
    },
    ekyc: {
        key: 'ekyc',
        label: 'eKYC Reference',
        placeholder: 'eKYC confirmation or ID reference',
        type: 'text',
    },
    notes: {
        key: 'notes',
        label: 'Additional Notes',
        placeholder: 'Any special requests',
        type: 'textarea',
    },
};

function isEsim(product: Product): boolean {
    const type = (product.type ?? '').toLowerCase();
    return type.includes('esim');
}

function isPhoneProduct(product: Product): boolean {
    const type = (product.type ?? '').toLowerCase();
    return type.includes('phone') || type.includes('mobile');
}

export function getOrderFields(product: Product): OrderField[] {
    const code = (product.code ?? '').toUpperCase();
    const keys: OrderFieldKey[] = ['name', 'email', 'phone'];

    if (isEsim(product)) {
        keys.push('eid');
    }

    if (isPhoneProduct(product)) {
        keys.push('ekyc');
    }

    if (code === 'VT' || code === 'GJ' || !isEsim(product)) {
        keys.push('postcode', 'address');
    }

    keys.push('notes');

    return keys.map((key) => ({
        ...BASE_FIELDS[key],
        required: ['name', 'email', 'phone'].includes(key) || key === 'eid' || key === 'ekyc',
    }));
}
