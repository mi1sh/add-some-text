import React, {Dispatch, SetStateAction} from 'react';
import {Button} from 'usual-ui';
import { Menu } from '@headlessui/react';

type FontMenuProps = {
	selectedFont: string;
	setSelectedFont: Dispatch<SetStateAction<string>>
}

export const FontMenu = ({selectedFont, setSelectedFont}: FontMenuProps) => {
	const fonts = ['Impact', 'Lobster', 'Roboto', 'Open Sans', 'Times New Roman'];

	return (
		<Menu as="div" className="relative inline-block">
			<div className={'text-right align-right'}>
				<Menu.Button
					className="text-gray-900 text-right align-right p-1 pb-0 w-auto align-right flex hover:text-gray-800 flex-row md:flex-row justify-center rounded-md shadow-sm">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
						 stroke="currentColor" className="w-5 h-5 mr-0.5">
						<path strokeLinecap="round" strokeLinejoin="round"
							  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
					</svg>

					Select Font
				</Menu.Button>
			</div>
			<span className={`${selectedFont === 'Times New Roman' ? 'text-[0.55em]' : 'text-xs'} text-xs text-gray-900`}>
					(Current: {selectedFont})
				</span>
			<Menu.Items
				className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y bg-gray-700/75 divide-gray-700/75 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
				{fonts.map((font) => (
					<Menu.Item key={font}>
						{() => (
							<Button
								className={`bg-gray-700/75 hover:bg-gray-600/85 block w-full px-4 py-2 text-sm text-gray-900`}
								onClick={() => setSelectedFont(font)}
							>
								{font}
							</Button>
						)}
					</Menu.Item>
				))}
			</Menu.Items>
		</Menu>
	);
};