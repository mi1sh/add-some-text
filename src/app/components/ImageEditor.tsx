'use client';

import {Box, Button, Input, Text} from 'usual-ui';
import {ChangeEvent, useEffect, useState} from 'react';
import {fabric} from 'fabric';
import {HexColorPicker} from 'react-colorful';
import {FontMenu} from '@/app/components/FontMenu';

const ImageEditor = () => {
	const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
	const [isImageUploaded, setIsImageUploaded] = useState(false);
	const [scaleFactor, setScaleFactor] = useState(1);
	const [selectedTextColor, setSelectedTextColor] = useState('#ffffff');
	const [selectedFont, setSelectedFont] = useState('Impact');
	const [strokeWidth, setStrokeWidth] = useState(0);

	const img = new Image();

	useEffect(() => {
		const maxWidth = 800;
		const maxHeight = 400;
		if (window.innerWidth <= 430) {
			setScaleFactor(Math.min(maxWidth / img.width, maxHeight / img.height, 0.6));
		} else if (window.innerWidth <= 530) {
			setScaleFactor(Math.min(maxWidth / img.width, maxHeight / img.height, 0.7));
		} else if (window.innerWidth <= 900) {
			setScaleFactor(Math.min(maxWidth / img.width, maxHeight / img.height, 0.9));
		}
	}, [img.height, img.width]);

	useEffect(() => {
		if (!canvas) {
			return;
		}

		const activeObject = canvas.getActiveObject() as fabric.Textbox;
		if (activeObject && activeObject.type === 'textbox') {
			// @ts-ignore
			activeObject.set('strokeWidth', strokeWidth);
			canvas.renderAll();
		}
	}, [strokeWidth]);

	useEffect(() => {
		if (!canvas) {
			return;
		}
		const activeObject = canvas.getActiveObject() as fabric.Textbox;
		canvas.forEachObject((object) => {
			if (object.type === 'textbox') {
				// @ts-ignore
				object.set('fontFamily', selectedFont);
			}
		});
		if (activeObject && activeObject.type === 'textbox') {
			// @ts-ignore
			activeObject.set('fontFamily', selectedFont);
		}

		canvas.renderAll();
	}, [selectedFont]);

	useEffect(() => {
		if (!canvas) return;
		const activeObject = canvas.getActiveObject() as fabric.Textbox;
		if (activeObject && activeObject.type === 'textbox') {
			// @ts-ignore
			activeObject.set('fill', selectedTextColor);
			canvas.renderAll();
		}
	}, [selectedTextColor]);

	const strokeIncrease = () => {
		setStrokeWidth(strokeWidth + 1);
	}
	const strokeDecrease = () => {
		strokeWidth ? setStrokeWidth(strokeWidth - 1) : setStrokeWidth(strokeWidth);
	}

	const changeStrokeWidth = (width: number) => {
		if (!canvas) return;
		const activeObject = canvas.getActiveObject() as fabric.Textbox;
		if (activeObject && activeObject.type === 'textbox') {
			activeObject.set('strokeWidth', width);
			canvas.renderAll();
		}
	};

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
			img.src = event.target!.result as string;
		};
		reader.readAsDataURL(file);
	};

	const addText = () => {
		const text = new fabric.Textbox('Your text here', {
			top: 100,
			left: 100,
			fontSize: 40,
			selectable: true,
			fontFamily: selectedFont,
			stroke: 'black',
			strokeWidth: 0,
			fill: selectedTextColor
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
			<div className={`text-center mt-3 md:mt-[2.5em]`}>
				<Text className={'mx-auto text-4xl text-gray-900 md:text-5xl'}>add - some - text</Text>
			</div>
			<div className="h-auto overflow-hidden w-full md:w-full text-center flex justify-center items-center">
				{isImageUploaded ? (
					<div className="flex justify-center text-center items-center flex-col">
						<div className={`w-auto h-auto flex justify-center`}>
							<canvas id="canvas"
									className="w-full h-full text-center rounded-lg drop-shadow-lg shadow-xl hover:drop-shadow-2xl hover:shadow-2xl transition"></canvas>
						</div>
						<div
							className={`text-sm mt-3 md:text-md flex flex-row md:flex-row gap-[17vw]`}>
							<div className={'flex flex-col gap-0.5'}>
								<Button role="group" variant="underline"
										className={'text-gray-900 py-0.5 px-0 w-auto align-left flex hover:text-gray-800'}
										onClick={addText}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
										 className="w-5 h-5 mr-0.5">
										<path fillRule="evenodd"
											  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
											  clipRule="evenodd"/>
									</svg>
									Add Text</Button>
								<Button role="group" variant="underline"
										className={'text-gray-900 py-0.5 px-0 w-auto align-left flex hover:text-gray-800'}
										onClick={handleImageChange}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
										 strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-0.5">
										<path strokeLinecap="round" strokeLinejoin="round"
											  d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"/>
									</svg>
									Change Image</Button>
								<Button role="group" variant="underline"
										className={'text-gray-900 py-0.5 px-0 w-auto align-left hover:text-gray-800 flex'}
										onClick={deleteSelectedObject}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
										 strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-0.5">
										<path strokeLinecap="round" strokeLinejoin="round"
											  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
									</svg>

									Clear Text</Button>
							</div>
							<div className={'flex flex-col'}>
								<div
									className="inline-flex rounded-md text-gray-900 align-middle justify-center items-center"
									role="group">
									<span className="text-sm text-center text-gray-900 mr-1">Stroke:</span>
									<Button variant="underline" type="button" onClick={strokeIncrease}
											className="text-gray-900 p-0.5 w-auto align-left hover:text-gray-800 flex">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
											 strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
											<path strokeLinecap="round" strokeLinejoin="round"
												  d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
										</svg>
									</Button>
									<Button variant="underline" type="button" onClick={strokeDecrease}
											className="text-gray-900 p-0.5 w-auto align-left hover:text-gray-800 flex">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
											 strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
											<path strokeLinecap="round" strokeLinejoin="round"
												  d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
										</svg>
									</Button>
								</div>
								<Button variant="underline"
										className={'text-gray-900 py-0.5 px-0 w-auto align-right hover:text-gray-800 flex'}
										onClick={saveImage}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
										 className="w-5 h-5 mr-0.5">
										<path fillRule="evenodd"
											  d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
											  clipRule="evenodd"/>
									</svg>
									Save Image</Button>
								<FontMenu selectedFont={selectedFont} setSelectedFont={setSelectedFont}/>
							</div>
						</div>
						<div className={'text-gray-900 w-auto flex-col flex color-picker mt-1'}>
							<Text className={'text-gray-900 py-0 text-center'}>Text Color:</Text>
							<HexColorPicker color={selectedTextColor}
											onChange={(color) => setSelectedTextColor(color)}/>
						</div>
					</div>
				) : (
					<Box
						className="border-2 rounded-xl w-[30em] border-dashed min-h-[25vh] md:min-h-[15em] border-gray-800 items-center text-center align-middle flex justify-center">
						<Text className={`text-gray-800 text-center`}>Please, upload image...</Text>
					</Box>
				)}
			</div>
			<div className={'w-full flex justify-center flex-col items-center'}>
				{!isImageUploaded && (
					<div>
						<label htmlFor="dropzone-file"
							   className="p-5 flex flex-col w-full items-center justify-center border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:border-dashed dark:hover:bg-bray-800 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-800 dark:hover:border-gray-800 dark:hover:bg-gray-900 transition">
							<div
								className={`flex flex-col items-center justify-center pt-5 pb-6`}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
									 strokeWidth={1.5} stroke="currentColor"
									 className="w-8 h-8 text-gray-500 dark:text-gray-600 mb-2">
									<path strokeLinecap="round" strokeLinejoin="round"
										  d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"/>
								</svg>

								<p className="mb-2 text-sm p text-gray-500 dark:text-gray-600"><span
									className="font-semibold">Click to upload</span> or drag and drop</p>
								<p className="text-sm text-gray-500 dark:text-gray-600">(SVG, PNG, JPG or GIF)</p>
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

