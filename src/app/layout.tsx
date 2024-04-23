import type {Metadata} from 'next';
import './globals.css';
import Head from 'next/head';
import {Comfortaa} from '@next/font/google';

const comfortaa = Comfortaa({
	subsets: ['latin'],
	weight: ['700']
});

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
			<link rel="preconnect" href="https://fonts.googleapis.com"/>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Impact&display=swap"/>
			<link rel="stylesheet" href="https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9zoKmMw.woff2"/>
			<link rel="stylesheet" href="https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9zoamM5Ez.woff2"/>
			<link
				href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
				rel="stylesheet"/>
			<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
				  rel="stylesheet"/>
			<link rel='stylesheet' href='globals.css'/>
			<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png?v=1"/>
			<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png?v=1"/>
			<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png?v=1"/>
			<link rel="shortcut icon" href="/favicon.ico?v=1"/>
			<link rel="manifest" href="/site.webmanifest?v=1"/>
			<link rel="mask-icon" href="/assets/safari-pinned-tab.svg?v=1" color="#5bbad5"/>
			<meta name="msapplication-TileColor" content="#00aba9"/>
			<meta name="theme-color" content="#ffffff"/>
		</Head>
		<body className={comfortaa.className}>{children}</body>
		</html>
	);
}
