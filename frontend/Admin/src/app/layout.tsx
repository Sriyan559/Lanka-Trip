import "./globals.css";import "./admin-integrated.css";
export const metadata = { title: "SL Beauty Enterprise Admin", description: "Enterprise operations console" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
