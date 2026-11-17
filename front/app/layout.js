import '@fontsource-variable/fraunces';
import '@fontsource-variable/fraunces/wght-italic.css';
import '@fontsource-variable/inter';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'El CiD — La buena vida · Mojácar Playa, Almería',
  description:
    'Chiringuito en Mojácar Playa, Almería. Terraza frente al Mediterráneo, cocina mediterránea, cañero siempre frío y música en directo.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
