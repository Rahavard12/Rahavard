import './globals.css'

export const metadata = {
  title: 'ره‌آورد | وبلاگ شخصی',
  description: 'یادداشت‌ها، مقاله‌ها و دیدگاه‌های من؛ ساده، شخصی و بدون حاشیه.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
