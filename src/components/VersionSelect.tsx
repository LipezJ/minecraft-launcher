import { Cube } from './Icons'

import Minecraft from '../lib/mine'

export function Versions() {

	const { selectedVersion, versions } = Minecraft.versions.value
	const { is_installing } = Minecraft.installer.value

	return (
		<>
			<button 
				id="states-button" 
				disabled={ Minecraft.isLoading.value || Minecraft.isRunning.value || is_installing }
				data-dropdown-toggle="dropdown-states" 
				className="flex-shrink-0 gap-2 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border rounded-lg cursor-pointer disabled:cursor-default focus:ring-4 focus:outline-none bg-gray-800 hover:bg-gray-700 focus:ring-gray-800 text-white border-gray-700 disabled:text-gray-500 disabled:hover:bg-gray-800" type="button"
			>
				<Cube className="size-6"/>
				{ versions[selectedVersion] }
				<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
					<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
				</svg>
			</button>
			<div id="dropdown-states" className="z-10 hidden divide-gray-100 rounded-lg shadow w-44 bg-gray-800">
				<ul className="py-2 text-sm text-gray-200" aria-labelledby="states-button">
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
				</ul>
			</div>
		</>
	)
}
