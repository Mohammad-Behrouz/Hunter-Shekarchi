// app/fonts.ts

import localFont from 'next/font/local';

// --- نکته بسیار مهم: تغییر نام فایل‌های Variable ---
// قبل از اجرا، لطفاً نام این دو فایل را برای جلوگیری از خطا تغییر دهید:
// 1. 'PINAR-VF[WGHT-KSHD-DSTY].ttf'      =>  'Pinar-VF.ttf'
// 2. 'PINAR-FD-VF[WGHT-KSHD-DSTY].ttf'   =>  'Pinar-FD-VF.ttf'
// کد زیر بر اساس نام‌های جدید و اصلاح شده نوشته شده است.

// --- فونت ایران‌سنس ---
// نکته: چندین فایل برای ایران‌سنس دارید. بهتر است فقط از فایل‌های اصلی استفاده کنید.
export const iranSans = localFont({
  src: [
    { path: './Fonts/IRANSansWeb.woff', weight: '400', style: 'normal' }, // Regular
    { path: './Fonts/IRANSANSXFANUM-MEDIUM.ttf', weight: '500', style: 'normal' }, // Medium
  ],
  variable: '--font-iransans',
  display: 'swap',
});

export const iranSansVF = localFont({
  src: './Fonts/IRANSANSXV.ttf',
  variable: '--font-iransans-vf',
  display: 'swap',
});

export const iranSansDn = localFont({
  src: './Fonts/IRANSANSDNWEB.ttf',
  variable: '--font-iransans-dn',
  display: 'swap',
});

// --- خانواده فونت‌های Pinar ---

// 1. Pinar (اصلی)
export const pinar = localFont({
  src: [
    { path: './Fonts/PINAR-LIGHT.ttf', weight: '300' },
    { path: './Fonts/PINAR-REGULAR.ttf', weight: '400' },
    { path: './Fonts/PINAR-MEDIUM.ttf', weight: '500' },
    { path: './Fonts/PINAR-SEMIBOLD.ttf', weight: '600' },
    { path: './Fonts/PINAR-BOLD.ttf', weight: '700' },
    { path: './Fonts/PINAR-EXTRABOLD.ttf', weight: '800' },
  ],
  variable: '--font-pinar',
  display: 'swap',
});

// 2. Pinar FD (اعداد فارسی)
export const pinarFd = localFont({
  src: [
    { path: './Fonts/PINAR-FD-LIGHT.ttf', weight: '300' },
    { path: './Fonts/PINAR-FD-REGULAR.ttf', weight: '400' },
    { path: './Fonts/PINAR-FD-MEDIUM.ttf', weight: '500' },
    { path: './Fonts/PINAR-FD-SEMIBOLD.ttf', weight: '600' },
    { path: './Fonts/PINAR-FD-BOLD.ttf', weight: '700' },
    { path: './Fonts/PINAR-FD-EXTRABOLD.ttf', weight: '800' },
    { path: './Fonts/PINAR-FD-BLACK.ttf', weight: '900' },
  ],
  variable: '--font-pinar-fd',
  display: 'swap',
});

// 3. Pinar DS1
export const pinarDs1 = localFont({
  src: [
    { path: './Fonts/PINAR-DS1-LIGHT.ttf', weight: '300' },
    { path: './Fonts/PINAR-DS1-REGULAR.ttf', weight: '400' },
    { path: './Fonts/PINAR-DS1-MEDIUM.ttf', weight: '500' },
    { path: './Fonts/PINAR-DS1-SEMIBOLD.ttf', weight: '600' },
    { path: './Fonts/PINAR-DS1-BOLD.ttf', weight: '700' },
    { path: './Fonts/PINAR-DS1-EXTRABOLD.ttf', weight: '800' },
    { path: './Fonts/PINAR-DS1-BLACK.ttf', weight: '900' },
  ],
  variable: '--font-pinar-ds1',
  display: 'swap',
});

// 4. Pinar DS1 FD (اعداد فارسی)
export const pinarDs1Fd = localFont({
  src: [
    { path: './Fonts/PINAR-DS1-FD-LIGHT.ttf', weight: '300' },
    { path: './Fonts/PINAR-DS1-FD-REGULAR.ttf', weight: '400' },
    { path: './Fonts/PINAR-DS1-FD-MEDIUM.ttf', weight: '500' },
    { path: './Fonts/PINAR-DS1-FD-SEMIBOLD.ttf', weight: '600' },
    { path: './Fonts/PINAR-DS1-FD-BOLD.ttf', weight: '700' },
    { path: './Fonts/PINAR-DS1-FD-EXTRABOLD.ttf', weight: '800' },
    { path: './Fonts/PINAR-DS1-FD-BLACK.ttf', weight: '900' },
  ],
  variable: '--font-pinar-ds1-fd',
  display: 'swap',
});

// 5. Pinar DS2
export const pinarDs2 = localFont({
  src: [
    { path: './Fonts/PINAR-DS2-LIGHT.ttf', weight: '300' },
    { path: './Fonts/PINAR-DS2-REGULAR.ttf', weight: '400' },
    { path: './Fonts/PINAR-DS2-MEDIUM.ttf', weight: '500' },
    { path: './Fonts/PINAR-DS2-SEMIBOLD.ttf', weight: '600' },
    { path: './Fonts/PINAR-DS2-BOLD.ttf', weight: '700' },
    { path: './Fonts/PINAR-DS2-EXTRABOLD.ttf', weight: '800' },
    { path: './Fonts/PINAR-DS2-BLACK.ttf', weight: '900' },
  ],
  variable: '--font-pinar-ds2',
  display: 'swap',
});

// 6. Pinar DS2 FD (اعداد فارسی)
export const pinarDs2Fd = localFont({
  src: [
    { path: './Fonts/PINAR-DS2-FD-LIGHT.ttf', weight: '300' },
    { path: './Fonts/PINAR-DS2-FD-REGULAR.ttf', weight: '400' },
    { path: './Fonts/PINAR-DS2-FD-MEDIUM.ttf', weight: '500' },
    { path: './Fonts/PINAR-DS2-FD-SEMIBOLD.ttf', weight: '600' },
    { path: './Fonts/PINAR-DS2-FD-BOLD.ttf', weight: '700' },
    { path: './Fonts/PINAR-DS2-FD-EXTRABOLD.ttf', weight: '800' },
    { path: './Fonts/PINAR-DS2-FD-BLACK.ttf', weight: '900' },
  ],
  variable: '--font-pinar-ds2-fd',
  display: 'swap',
});

// 7. Pinar DS3
export const pinarDs3 = localFont({
  src: [
    { path: './Fonts/PINAR-DS3-LIGHT.ttf', weight: '300' },
    { path: './Fonts/PINAR-DS3-REGULAR.ttf', weight: '400' },
    { path: './Fonts/PINAR-DS3-MEDIUM.ttf', weight: '500' },
    { path: './Fonts/PINAR-DS3-SEMIBOLD.ttf', weight: '600' },
    { path: './Fonts/PINAR-DS3-BOLD.ttf', weight: '700' },
    { path: './Fonts/PINAR-DS3-EXTRABOLD.ttf', weight: '800' },
    { path: './Fonts/PINAR-DS3-BLACK.ttf', weight: '900' },
  ],
  variable: '--font-pinar-ds3',
  display: 'swap',
});

// 8. Pinar DS3 FD (اعداد فارسی)
export const pinarDs3Fd = localFont({
  src: [
    { path: './Fonts/PINAR-DS3-FD-LIGHT.ttf', weight: '300' },
    { path: './Fonts/PINAR-DS3-FD-REGULAR.ttf', weight: '400' },
    { path: './Fonts/PINAR-DS3-FD-MEDIUM.ttf', weight: '500' },
    { path: './Fonts/PINAR-DS3-FD-SEMIBOLD.ttf', weight: '600' },
    { path: './Fonts/PINAR-DS3-FD-BOLD.ttf', weight: '700' },
    { path: './Fonts/PINAR-DS3-FD-EXTRABOLD.ttf', weight: '800' },
    { path: './Fonts/PINAR-DS3-FD-BLACK.ttf', weight: '900' },
  ],
  variable: '--font-pinar-ds3-fd',
  display: 'swap',
});

// 9. Pinar DS4
export const pinarDs4 = localFont({
  src: [
    { path: './Fonts/PINAR-DS4-LIGHT.ttf', weight: '300' },
    { path: './Fonts/PINAR-DS4-REGULAR.ttf', weight: '400' },
    { path: './Fonts/PINAR-DS4-MEDIUM.ttf', weight: '500' },
    { path: './Fonts/PINAR-DS4-SEMIBOLD.ttf', weight: '600' },
    { path: './Fonts/PINAR-DS4-BOLD.ttf', weight: '700' },
    { path: './Fonts/PINAR-DS4-EXTRABOLD.ttf', weight: '800' },
    { path: './Fonts/PINAR-DS4-BLACK.ttf', weight: '900' },
  ],
  variable: '--font-pinar-ds4',
  display: 'swap',
});

// 10. Pinar DS4 FD (اعداد فارسی)
export const pinarDs4Fd = localFont({
  src: [
    { path: './Fonts/PINAR-DS4-FD-LIGHT.ttf', weight: '300' },
    { path: './Fonts/PINAR-DS4-FD-REGULAR.ttf', weight: '400' },
    { path: './Fonts/PINAR-DS4-FD-MEDIUM.ttf', weight: '500' },
    { path: './Fonts/PINAR-DS4-FD-SEMIBOLD.ttf', weight: '600' },
    { path: './Fonts/PINAR-DS4-FD-BOLD.ttf', weight: '700' },
    { path: './Fonts/PINAR-DS4-FD-EXTRABOLD.ttf', weight: '800' },
    { path: './Fonts/PINAR-DS4-FD-BLACK.ttf', weight: '900' },
  ],
  variable: '--font-pinar-ds4-fd',
  display: 'swap',
});

// --- فونت‌های Variable ---
// اطمینان حاصل کنید که نام فایل‌ها را طبق نکته بالا تغییر داده‌اید
export const pinarVF = localFont({
  src: './Fonts/Pinar-VF.ttf',
  variable: '--font-pinar-vf',
  display: 'swap',
});

export const pinarFdVf = localFont({
  src: './Fonts/Pinar-FD-VF.ttf',
  variable: '--font-pinar-fd-vf',
  display: 'swap',
});
