import { Cube } from './Icons'

import Minecraft from '../lib/mine'
import Select from './ui/Select'

export function Versions() {

	const { selectedVersion, versions } = Minecraft.versions.value
	const { is_installing } = Minecraft.installer.value

	return (
		<Select
			id="versions-select"
			disabled={ Minecraft.isLoading.value || Minecraft.isRunning.value || is_installing }
			selected={versions[selectedVersion]}
			icon={<Cube className="size-6" />}
		>
			{
				versions.map((version, index) => (
					<li key={index}>
						<button 
							onClick={() => Minecraft.selectVersion(index)}
							type="button" 
							className="inline-flex w-full gap-2 px-4 py-2 text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
						>
							<div className="inline-flex items-center gap-2">
								<Cube className="size-6"/>
								{ version }
							</div>
						</button>
					</li>
				))
			}
		</Select>
	)
}
