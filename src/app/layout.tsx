import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import Head from 'next/head';


const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
	title: 'add-some-text',
	description: 'Simple meme editor by mi1sh'
};

export default function RootLayout({
									   children
								   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<Head>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Impact&display=swap" />
		</Head>
		<body className={inter.className}>{children}</body>
		</html>
	);
}
