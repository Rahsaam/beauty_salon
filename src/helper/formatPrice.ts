// helper/formatPrice.js
const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// تبدیل اعداد فارسی به انگلیسی
const toEnglishDigits = (num: string) => {
  return num.replace(/[۰-۹]/g, (match) => englishDigits[persianDigits.indexOf(match)]);
};

// تبدیل اعداد انگلیسی به فارسی
const toPersianDigits = (num: string) => {
  return num.replace(/[0-9]/g, (match) => persianDigits[parseInt(match)]);
};

export const formatPrice = (value: string) => {
  // حذف هر چیزی جز اعداد و کاما
  const cleanValue = value?.toString().replace(/[^۰-۹0-9,]/g, '') || '';
  if (!cleanValue) return '';

  // حذف کاماها و تبدیل به انگلیسی برای پردازش
  const numericOnly = toEnglishDigits(cleanValue.replace(/[,]/g, ''));
  // اعمال فرمت سه‌تایی
  const formattedEnglish = numericOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // همیشه به فارسی برگردون
  return toPersianDigits(formattedEnglish);
};