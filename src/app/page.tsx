import ImageEditor from '@/app/components/ImageEditor';
import {TWallpaper} from '@twallpaper/react';
import 'twallpaper/css';

export default function Home() {
	return (
		<main className="max-w-[1200px] mx-auto">
			<TWallpaper
				options={{
					"fps": 13,
					"tails": 90,
					"animate": true,
					"scrollAnimate": true,
					"colors": [
						"#565656",
						"#363636",
						"#565656",
						"#3f3f3f"
					],
				}}
			/>
			<ImageEditor/>
		</main>
	);
}
