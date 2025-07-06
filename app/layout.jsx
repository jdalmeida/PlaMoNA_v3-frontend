import './globals.css';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { UserProvider } from '../contexts/UserContext';

import { TRPCProvider } from './components/TRPCProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PlaMoNA',
  description: 'Plataforma de monitoramento do nível das águas.'
};

export default function RootLayout ({ children }) {
  return (
    <html lang='pt-br'>
      <body className={inter.className}>
        <TRPCProvider>
          <UserProvider>
            {children}
            <ToastContainer />
          </UserProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
