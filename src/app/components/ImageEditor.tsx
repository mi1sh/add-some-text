'use client';

import {Box, Button, Text} from 'usual-ui';
import {ChangeEvent, useEffect, useState} from 'react';
import {fabric} from 'fabric';
import {Comfortaa} from '@next/font/google';

const comfortaa = Comfortaa({
	subsets: ['latin'],
	weight: ['700']
});

const ImageEditor = () => {
	const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
	const [isImageUploaded, setIsImageUploaded] = useState(false);
	const [scaleFactor, setScaleFactor] = useState(1);

	const img = new Image();

	useEffect(() => {
		const maxWidth = 800; // максимальная ширина изображения
		const maxHeight = 400; // максимальная высота изображения
		if (window.innerWidth <= 430) {
			setScaleFactor(Math.min(maxWidth / img.width, maxHeight / img.height, 0.6)); // масштабируем изображение
		} else if (window.innerWidth <= 530) {
			setScaleFactor(Math.min(maxWidth / img.width, maxHeight / img.height, 0.7)); // масштабируем изображение
		} else if (window.innerWidth <= 900) {
			setScaleFactor(Math.min(maxWidth / img.width, maxHeight / img.height, 0.9)); // масштабируем изображение
		}
	}, [img.height, img.width]);

	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		setIsImageUploaded(false);
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			setIsImageUploaded(true);
			img.onload = () => {
				const fabricCanvas = new fabric.Canvas('canvas');
				fabricCanvas.setWidth(img.width * scaleFactor);
				fabricCanvas.setHeight(img.height * scaleFactor);
				const fabricImg = new fabric.Image(img, {
					scaleX: scaleFactor,
					scaleY: scaleFactor
				});
				fabricCanvas.setBackgroundImage(fabricImg, fabricCanvas.renderAll.bind(fabricCanvas));
				setCanvas(fabricCanvas);
			};
			img.src = event.target!.result as string; // Убедитесь, что Img и Img.src не равны null
		};
		reader.readAsDataURL(file);
	};


	const addText = () => {
		const text = new fabric.Textbox('Your text here', {
			left: 100,
			top: 100,
			fontSize: 20,
			selectable: true // Разрешаем перемещение текста
		});

		if (!canvas) return;
		canvas.add(text);
	};

	const deleteSelectedObject = () => {
		if (!canvas) return;
		const activeObject = canvas.getActiveObject();
		if (activeObject) {
			canvas.remove(activeObject);
		}
	};

	const handleImageChange = () => {
		const input = document.getElementById('dropzone-file');
		if (input) {
			input.click();
		}
	};

	const saveImage = () => {
		if (!canvas) return;
		const dataURL = canvas.toDataURL({
			format: 'png',
			quality: 1
		});
		const a = document.createElement('a');
		a.href = dataURL;
		a.download = 'edited_image.png';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	let div = <>
		<div className={`${isImageUploaded ? 'gap-[4vh]' : 'gap-[15vh]'} mx-auto p-3 flex flex-col justify-center `}>
			<div className={`${comfortaa.className} text-center mt-3 md:mt-[2.5em]`}>
				<Text className={'mx-auto text-4xl text-gray-900 md:text-5xl'}>add - some - text</Text>
			</div>
			<div className="h-auto overflow-hidden w-full md:w-full text-center flex justify-center items-center">
				{isImageUploaded ? (
					<div className="flex justify-center text-center items-center flex-col">
						<div className={`w-auto h-auto flex justify-center`}>
							<canvas id="canvas"
									className="w-full h-full text-center rounded-lg drop-shadow-lg shadow-xl hover:drop-shadow-2xl hover:shadow-2xl transition"></canvas>
						</div>
						<div className={`${comfortaa.className} text-sm mt-3 md:text-md flex flex-row md:flex-row gap-[15vw]`}>
							<div className={'flex flex-col'}>
								<Button variant="underline"
										className={'text-gray-900 w-auto mr-[0.6vw] align-left flex hover:text-gray-800'}
										onClick={addText}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
										 className="w-5 h-5 mr-0.5">
										<path fillRule="evenodd"
											  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
											  clipRule="evenodd"/>
									</svg>
									Add Text</Button>
								<Button variant="underline"
										className={'text-gray-900 w-auto mr-[0.6vw] align-left flex hover:text-gray-800'}
										onClick={handleImageChange}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
										 strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-0.5">
										<path strokeLinecap="round" strokeLinejoin="round"
											  d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"/>
									</svg>

									Change Image</Button>
								<Button variant="underline"
										className={'text-gray-900 w-auto align-left hover:text-gray-800 flex'}
										onClick={deleteSelectedObject}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
										 className="w-5 h-5 mr-0.5">
										<path fillRule="evenodd"
											  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
											  clipRule="evenodd"/>
									</svg>
									Clear Text</Button>
							</div>
							<div className={'flex flex-col'}>
								<Button variant="underline"
										className={'text-gray-900 w-auto align-right hover:text-gray-800 flex'}
										onClick={saveImage}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
										 className="w-5 h-5 mr-0.5">
										<path fillRule="evenodd"
											  d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
											  clipRule="evenodd"/>
									</svg>
									Save Image</Button>
							</div>
						</div>
					</div>
				) : (
					<Box
						className="border-2 rounded-xl w-[30em] border-dashed h-auto min-h-[23vh] md:min-h-[15em] border-gray-800 items-center text-center align-middle flex justify-center">
						<Text className={`${comfortaa.className} text-gray-800`}>Please, upload image...</Text>
					</Box>
				)}
			</div>
			<div className={'w-full flex justify-center flex-col items-center'}>
				{!isImageUploaded && (
					<div>
						<label htmlFor="dropzone-file"
							   className="p-5 flex flex-col w-full items-center justify-center border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:border-dashed dark:hover:bg-bray-800 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-800 dark:hover:border-gray-800 dark:hover:bg-gray-900 transition">
							<div
								className={`${comfortaa.className} flex flex-col items-center justify-center pt-5 pb-6`}>
								<svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-600" aria-hidden="true"
									 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
										  strokeWidth="2"
										  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
								</svg>
								<p className="mb-2 text-sm p text-gray-500 dark:text-gray-600"><span
									className="font-semibold">Click to upload</span> or drag and drop</p>
								<p className="text-sm text-gray-500 dark:text-gray-600">SVG, PNG, JPG or GIF (MAX.
									800x400px)</p>
							</div>
						</label>
					</div>
				)}
				<input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload}/>
			</div>
		</div>
	</>;
	return div;
};

export default ImageEditor;

