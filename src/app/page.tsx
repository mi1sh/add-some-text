import ImageEditor from '@/app/components/ImageEditor';
import {TWallpaper} from '@twallpaper/react';
import 'twallpaper/css';

export default function Home() {
	return (
		<main className="max-w-[1200px] mx-auto">
			<TWallpaper
				options={{
					"fps": 18,
					"tails": 90,
					"animate": true,
					"scrollAnimate": true,
					"colors": [
						"#3d444f",
						"#353d48",
						"#474f5b",
						"#3d4652",
						"#474f5b",
						"#3d4652",
						"#3d444f",
						"#353d48",
					],
				}}
			/>
			<ImageEditor/>
		</main>
	);
}
