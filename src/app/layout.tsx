// app/layout.tsx

import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
// مرحله ۱: ایمپورت کردن تمام فونت‌های تعریف شده
import {
  iranSans,
  iranSansVF,
  pinar,
  pinarFd,
  pinarDs1,
  pinarDs1Fd,
  pinarDs2,
  pinarDs2Fd,
  pinarDs3,
  pinarDs3Fd,
  pinarDs4,
  pinarDs4Fd,
  pinarVF,
  pinarFdVf
} from './fonts';


export const metadata: Metadata = {
  title: "AI Hunter | شکارچی هوشمند بازار",
  description: "ارزش‌گذاری واقعی خودرو و ملک با هوش مصنوعی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      // مرحله ۲: اضافه کردن متغیر تمام فونت‌ها به تگ <html>
      // این کار باعث می‌شود بتوانید از طریق متغیرهای CSS (مثلاً var(--font-pinar-ds1)) در کل پروژه به آن‌ها دسترسی داشته باشید.
      className={`
        ${iranSans.variable}
        ${iranSansVF.variable}
        ${pinar.variable}
        ${pinarFd.variable}
        ${pinarDs1.variable}
        ${pinarDs1Fd.variable}
        ${pinarDs2.variable}
        ${pinarDs2Fd.variable}
        ${pinarDs3.variable}
        ${pinarDs3Fd.variable}
        ${pinarDs4.variable}
        ${pinarDs4Fd.variable}
        ${pinarVF.variable}
        ${pinarFdVf.variable}
      `}
    >
      {/* مرحله ۳: اعمال یک فونت پیش‌فرض به کل بدنه سایت */}
      {/* ما در اینجا pinarFd را انتخاب کردیم که از اعداد فارسی پشتیبانی می‌کند */}
      <body className={pinarFd.className}>
        {children}

        {/* تنظیمات ظاهر نوتیفیکیشن‌ها برای ست شدن با تم تاریک */}
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: '#1e293b', // slate-800
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
      </body>
    </html>
  );
}
