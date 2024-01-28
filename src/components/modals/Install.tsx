import { useEffect, useRef } from 'preact/hooks'

import Minecraft from '../../lib/mine'
import { ModalManager } from '../../lib/modals'

import { Badge } from '../ui/Badge'
import { Cube, DownloadIcon, CloseIcon, Loader } from '../Icons'
import { openExplorer } from '../../lib/func'

export function Install() {

	const modalRef = useRef<HTMLDivElement>(null)
	const versions = Minecraft.avaibleVersions.value
	const installedVersions = Minecraft.versions.value

	useEffect(() => {
		ModalManager.init(modalRef, 'install-modal')
		Minecraft.getVersionsList()
	}, [])

	return (
		<div 
			ref={modalRef} 
			id="install-modal" 
			tabIndex={-1} 
			aria-hidden="true" 
			className="hidden absolute top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100dvh-1rem)] max-h-full"
		>
			<div className="relative p-2 w-full max-w-md max-h-full">
				<div className="relative rounded-lg shadow bg-gray-700 p-4 md:p-5">
					<div className="flex items-center justify-between pb-4 border-b rounded-t border-gray-600">
						<h3 className="text-lg font-semibold text-white">
              Versiones
						</h3>
						<button 
							onClick={() => ModalManager.hide('install-modal')}  
							type="button" 
							className="text-gray-400 bg-transparent rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white" 
							data-modal-toggle="install-modal"
						>
							<CloseIcon />
							<span className="sr-only">Close modal</span>
						</button>
					</div>
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
				</div>
			</div>
		</div> 
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
