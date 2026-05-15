export const appConfig = {
  whatsapp: import.meta.env.VITE_WHATSAPP || 'https://wa.me/6281234567890',
  email: import.meta.env.VITE_EMAIL || 'info@alljapaninternet.com',
  address: import.meta.env.VITE_ADDRESS || 'Tokyo, Japan',
  instagram: import.meta.env.VITE_INSTAGRAM || 'https://instagram.com/alljapaninternet',
  trackingJP: import.meta.env.VITE_TRACKING_JP || 'https://trackings.post.japanpost.jp',
  trackingYamato: import.meta.env.VITE_TRACKING_YAMATO || 'https://jizen.kuronekoyamato.co.jp',
  guideBookPdf: import.meta.env.VITE_GUIDE_BOOK_PDF || '/guide-book.pdf',
  operationalHours: import.meta.env.VITE_OPERATIONAL_HOURS || '09:00 - 18:00 JST',
};
