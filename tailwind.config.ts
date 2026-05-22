// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                // نام دلخواه : مقدار متغیر CSS
                // خانواده ایران سنس
                iransans: ['var(--font-iransans)'],
                'iransans-vf': ['var(--font-iransans-vf)'],

                // خانواده پینار
                pinar: ['var(--font-pinar)'],
                'pinar-fd': ['var(--font-pinar-fd)'], // اعداد فارسی
                'pinar-vf': ['var(--font-pinar-vf)'], // Variable
                'pinar-fd-vf': ['var(--font-pinar-fd-vf)'], // Variable با اعداد فارسی

                // خانواده پینار DS1
                'pinar-ds1': ['var(--font-pinar-ds1)'],
                'pinar-ds1-fd': ['var(--font-pinar-ds1-fd)'], // اعداد فارسی

                // خانواده پینار DS2
                'pinar-ds2': ['var(--font-pinar-ds2)'],
                'pinar-ds2-fd': ['var(--font-pinar-ds2-fd)'], // اعداد فارسی

                // خانواده پینار DS3
                'pinar-ds3': ['var(--font-pinar-ds3)'],
                'pinar-ds3-fd': ['var(--font-pinar-ds3-fd)'], // اعداد فارسی

                // خانواده پینار DS4
                'pinar-ds4': ['var(--font-pinar-ds4)'],
                'pinar-ds4-fd': ['var(--font-pinar-ds4-fd)'], // اعداد فارسی
            },
            // ... سایر تنظیمات شما
        },
    },
    plugins: [],
};
