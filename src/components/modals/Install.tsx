import { useEffect, useRef } from 'preact/hooks'

import Minecraft from '../../lib/mine'
import { ModalManager } from '../../lib/modals'

import Modal from '../ui/Modal'
import { Badge } from '../ui/Badge'
import { openExplorer } from '../../lib/func'
import { Cube, DownloadIcon, Loader } from '../Icons'

export function Install() {

	const modalRef = useRef<HTMLDivElement>(null)
	const versions = Minecraft.avaibleVersions.value
	const installedVersions = Minecraft.versions.value

	useEffect(() => {
		ModalManager.init(modalRef, 'install-modal')
		Minecraft.getVersionsList()
	}, [])

	return (
		<Modal 
			id="install-modal" 
			title="Versions" 
			reference={modalRef}
		>
			{
				versions ?
					<div className="overflow-y-auto max-h-full h-[65dvh] px-2 py-4 my-4">
						<ol className="relative border-l-2 border-gray-600 ms-3.5 mb-4 md:mb-5 max-h-full">                  
							{
								versions.map((version, index) => {
									const installed = installedVersions.versions.includes(version)
									return (
										<Version key={version} version={version} latest={index === 0} installed={installed} />
									)
								})
							}
						</ol>
					</div>
					: 
					<div className="flex justify-center p-10 gap-2">
						<Loader /> Loading...
					</div>
			}
			<button 
				onClick={() => openExplorer('/versions')}
				className="text-white inline-flex w-full justify-center items-center gap-1 focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
			>
				<svg 
					className="w-6 h-6 text-gray-800 dark:text-white" 
					aria-hidden="true" 
					xmlns="http://www.w3.org/2000/svg" 
					fill="currentColor" 
					viewBox="0 0 24 24"
				>
					<path 
						fillRule="evenodd" 
						d="M4 4a2 2 0 0 0-2 2v12.6l3-8a1 1 0 0 1 1-.6h12V9a2 2 0 0 0-2-2h-4.5l-2-2.3A2 2 0 0 0 8 4H4Zm2.7 8h-.2l-3 8H18l3-8H6.7Z" 
						clipRule="evenodd"
					/>
				</svg>
				Versions Folder
			</button>
		</Modal>	
	)
}

function Version({ version, latest, installed }: { version: string, latest: boolean, installed: boolean }) {
	return (
		<li className="mb-5 ms-8">
			<span className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-[2.75rem] ring-8 ring-gray-700 bg-gray-600">
				<Cube className='w-2.5 h-2.5 text-gray-500 dark:text-gray-400'/>
			</span>
			<h3 className="flex  justify-between items-start mb-1 text-lg font-semibold text-white w-full">
				{ version }
				<div>
					{
						latest && <Badge>Latest</Badge>
					}
				</div>
			</h3>
			{
				!installed ?
					<button 
						type="button" 
						disabled={installed}
						onClick={() => Minecraft.installVersion(version)}
						className="inline-flex items-center py-2 px-3 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-700 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-default"
					>
						<DownloadIcon />
						Install
					</button>
					: <Badge color="bg-green-500 text-white">Installed</Badge>
			}
		</li>
	)
}
