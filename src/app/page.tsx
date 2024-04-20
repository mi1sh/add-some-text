import ImageEditor from '@/app/components/ImageEditor';
import {TWallpaper} from '@twallpaper/react';
import 'twallpaper/css';

export default function Home() {
	return (
		<main className="max-w-[1200px] mx-auto">
			<TWallpaper
				options={{
					"fps": 15,
					"tails": 90,
					"animate": true,
					"scrollAnimate": true,
					"colors": [
						"#3e444d",
						"#383e46",
						"#3e444d",
						"#383e46",
					],
				}}
			/>
			<ImageEditor/>
		</main>
	);
}
