import { Loader } from './Icons'
import { Versions } from './VersionSelect'
import { UserBadge } from './UserBadge'

import Minecraft from '../lib/mine'

export function Launch() {

	const isRunning = Minecraft.isRunning.value
	const isLoading = Minecraft.isLoading.value
	const isInstalling = Minecraft.installer.value.is_installing

	let state = 'Play'

	if (isRunning) state = 'Ready'
	else if (isLoading) state = ''
	else if (isInstalling) state = ''
  
	return (
		<article className="flex justify-end px-6 w-full max-h-full">
			<div className="flex justify-between gap-8 bg-slate-950 w-full rounded px-4 py-2">
				<div className="absolute flex justify-center w-full -mt-20 lg:-mt-6 z-10">
					<button 
						onClick={Minecraft.run}
						type="button" 
						className="flex gap-2 focus:outline-none text-white font-bold [letter-spacing:2px] font-mine rounded-lg text-3xl px-10 py-2 me-2 mb-2 shadow-md shadow-black bg-green-800 hover:bg-green-900 focus:bg-green-950 disabled:bg-orange-600"
						disabled={ isRunning || isLoading || isInstalling }
					>
						{
							(isLoading || isInstalling) && <Loader />
						}
						{ state }
					</button>
				</div>
				<Versions />
				<UserBadge />
			</div>
		</article>
	)
}
