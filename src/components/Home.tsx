import { Launch } from './Launch'
import { InstallProgress } from './InstallProgress'

import imageUrl from '../assets/minecraft.webp'
import Minecraft from '../lib/mine'

export function Home() {

	const { is_installing } = Minecraft.installer.value



	return (
		<section className="flex flex-col gap-2 bg-slate-900 h-screen p-4 pt-0 sm:ml-64">
			<div className="transition duration-300" style={is_installing ? { height: '86%' } : { height: '95%' }}>
				<div className="h-[calc(88%-0.5rem)]">
					<img src={imageUrl} alt="minecraft banner" className="max-h-full h-full w-full object-cover rounded-b-3xl" />
				</div>
				<div className="h-[12%]">
					<Launch />
				</div>
			</div>
			<article className="transition duration-300" style={is_installing ? { height: '14%' } : { height: '5%' }} >
				<InstallProgress />
			</article>
		</section>
	)
}