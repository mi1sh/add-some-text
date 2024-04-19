'use client';

import {Box, Button, Text} from 'usual-ui';
import {useState} from 'react';
import {fabric} from 'fabric';
import {Comfortaa} from '@next/font/google';

const comfortaa = Comfortaa({
	subsets: ['latin'],
	weight: ['700']
});

const ImageEditor = () => {
	const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
	const [isImageUploaded, setIsImageUploaded] = useState(false);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setIsImageUploaded(true);

		const reader = new FileReader();
		reader.onload = (event) => {
			const img = new Image();
			img.onload = () => {
				const fabricCanvas = new fabric.Canvas('canvas');
				const maxWidth = 800; // максимальная ширина изображения
				const maxHeight = 400; // максимальная высота изображения
				const scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height, 1); // масштабируем изображение
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
		if (!canvas) return;
		const text = new fabric.Textbox('Your text here', {
			left: 100,
			top: 100,
			fontSize: 20,
			selectable: true // Разрешаем перемещение текста
		});
		canvas.add(text);
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

	const deleteImage = async () => {
		if (!canvas) return;
		await canvas.dispose();
		if (isImageUploaded) {
			setIsImageUploaded(false)
		}
	}

	return (
		<div>
			<div className={`${comfortaa.className} text-center mt-7`}>
				<Text className={'text-5xl text-gray-900'}>add - some - text</Text>
			</div>
			<div className="h-auto mb-5 mt-5 overflow-hidden w-full text-center flex justify-center items-center">
				{isImageUploaded ? (
					<canvas id="canvas"
							className="max-w-full text-center rounded-lg drop-shadow-lg shadow-xl hover:drop-shadow-2xl hover:shadow-2xl transition"></canvas>
				) : (
					<Box variant='outline' size='md' className='border-2 border-dashed h-auto min-h-[15em] border-gray-800 items-center text-center align-middle flex justify-center'>
						<Text className={`${comfortaa.className} text-gray-800`}>Please, upload image...</Text>
					</Box>
				)}
			</div>
			<div className={'w-full flex justify-center flex-col items-center'}>
				{!isImageUploaded && (
					<div>
						<label htmlFor="dropzone-file"
							   className="p-5 flex flex-col w-full items-center justify-center border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:border-dashed dark:hover:bg-bray-800 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-900 dark:hover:border-gray-800 dark:hover:bg-gray-900 transition">
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
									 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
										  strokeWidth="2"
										  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
								</svg>
								<p className="mb-2 text-sm p text-gray-500 dark:text-gray-400"><span
									className="font-semibold">Click to upload</span> or drag and drop</p>
								<p className="text-sm text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
									800x400px)</p>
							</div>
							<input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload}/>
						</label>
					</div>
				)}
				<Button variant="solid" className={'m-3 text-gray-900'} onClick={addText}>Add Text</Button>
				<Button variant="underline" className={'text-gray-900'} onClick={saveImage}>Save Image</Button>
				<Button variant="underline" className={'text-gray-900'} onClick={deleteImage}>Delete Image</Button>
			</div>
		</div>
	);
};

export default ImageEditor;

