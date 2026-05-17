import type { Locale } from '../i18n';
import type { Product } from '../../types/api';

type NoteBlock = { title: string; lines: string[] };

const NOTES: Record<
    string,
    { en: NoteBlock; ja: NoteBlock }
> = {
    VT_MONTHLY: {
        en: {
            title: 'VT Monthly Billing',
            lines: [
                'Monthly payment window: 20th–28th of each month.',
                'Please complete payment within this period to avoid service interruption.',
            ],
        },
        ja: {
            title: 'VT 月額請求',
            lines: [
                '月額お支払い期間：毎月20日〜28日。',
                'この期間内にお支払いください。遅延するとサービス停止の可能性があります。',
            ],
        },
    },
    GJ_MONTHLY: {
        en: {
            title: 'GJ Monthly Billing',
            lines: [
                'Monthly payment window: 18th–24th of each month.',
                'Please complete payment within this period to avoid service interruption.',
            ],
        },
        ja: {
            title: 'GJ 月額請求',
            lines: [
                '月額お支払い期間：毎月18日〜24日。',
                'この期間内にお支払いください。遅延するとサービス停止の可能性があります。',
            ],
        },
    },
    ESIM: {
        en: {
            title: 'eSIM Activation',
            lines: [
                'EID is required for eSIM activation.',
                'Please ensure your device supports eSIM before ordering.',
            ],
        },
        ja: {
            title: 'eSIM 開通',
            lines: [
                'eSIM開通にはEIDが必要です。',
                'ご注文前に端末のeSIM対応をご確認ください。',
            ],
        },
    },
    PHONE: {
        en: {
            title: 'Phone + Internet',
            lines: [
                'eKYC verification is required for phone + internet products.',
                'Please prepare valid identification documents.',
            ],
        },
        ja: {
            title: '電話＋インターネット',
            lines: [
                '電話＋インターネット商品にはeKYC認証が必要です。',
                '有効な本人確認書類をご準備ください。',
            ],
        },
    },
};

function isEsim(product: Product): boolean {
    const type = (product.type ?? '').toLowerCase();
    return type.includes('esim') || type === 'esim';
}

function isPhoneProduct(product: Product): boolean {
    const type = (product.type ?? '').toLowerCase();
    return type.includes('phone') || type.includes('mobile');
}

export function getOrderNotes(product: Product, locale: Locale): NoteBlock[] {
    const code = (product.code ?? '').toUpperCase();
    const billing = (product.billing_type ?? '').toLowerCase();
    const blocks: NoteBlock[] = [];

    if (code === 'VT' && billing === 'monthly') {
        blocks.push(NOTES.VT_MONTHLY[locale]);
    }
    if (code === 'GJ' && billing === 'monthly') {
        blocks.push(NOTES.GJ_MONTHLY[locale]);
    }
    if (isEsim(product)) {
        blocks.push(NOTES.ESIM[locale]);
    }
    if (isPhoneProduct(product)) {
        blocks.push(NOTES.PHONE[locale]);
    }

    return blocks;
}
