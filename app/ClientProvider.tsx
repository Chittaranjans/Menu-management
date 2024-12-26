'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store';
import { Geist, Geist_Mono } from "next/font/google";
// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </Provider>
  );
};

export default ClientProvider;