import Modal from '../ui/Modal'
import { SettingsStorage } from '../../lib/storage'
import { useEffect, useRef } from 'preact/hooks'

import { ModalManager } from '../../lib/modals'
import { InputText } from '../ui/Input'
import { Badge } from '../ui/Badge'


export function Settings() {

	const modal = useRef<HTMLDivElement>(null)
	const data = SettingsStorage.get()
	const reso = data?.customResolution

	useEffect(() => {
		ModalManager.init(modal, 'settings-modal')
	}, [])

	const handleSubmit = (e: Event) => {
		e.preventDefault()

		const form = e.target as HTMLFormElement
		const formData = new FormData(form)

		SettingsStorage.save(formData)
	}

	return (
		<Modal 
			id="settings-modal" 
			title="Settings" 
			reference={modal}
		>
			<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
				<section>
					<span className="block mb-1 text-sm font-medium text-white">
						Memory
					</span>
					<div className="ml-2 flex items-center justify-center gap-2">
						<svg 
							className="size-6 text-white"
							xmlns="http://www.w3.org/2000/svg" 
							viewBox="0 0 576 512"
							fill="currentColor"
						>
							{/* !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
							<path 
								d="M64 64C28.7 64 0 92.7 0 128v7.4c0 6.8 4.4 12.6 10.1 16.3C23.3 160.3 32 175.1 32 192s-8.7 31.7-21.9 40.3C4.4 236 0 241.8 0 248.6V320H576V248.6c0-6.8-4.4-12.6-10.1-16.3C552.7 223.7 544 208.9 544 192s8.7-31.7 21.9-40.3c5.7-3.7 10.1-9.5 10.1-16.3V128c0-35.3-28.7-64-64-64H64zM576 352H0v64c0 17.7 14.3 32 32 32H80V416c0-8.8 7.2-16 16-16s16 7.2 16 16v32h96V416c0-8.8 7.2-16 16-16s16 7.2 16 16v32h96V416c0-8.8 7.2-16 16-16s16 7.2 16 16v32h96V416c0-8.8 7.2-16 16-16s16 7.2 16 16v32h48c17.7 0 32-14.3 32-32V352zM192 160v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32z"
							/>
						</svg>
						<InputText value={data?.ram.min} name="memmin" label="min (mb)" placeholder="Minimum RAM" />
						<InputText value={data?.ram.max} name="memmax" label="max (mb)" placeholder="Maximum RAM" />
					</div>
				</section>
				<section>
					<span className="block mt-2 mb-1 text-sm font-medium text-white">
						Resolution
					</span>
					<div className="ml-2 flex items-center justify-center gap-2">
						<svg 
							className="size-6 text-white" 
							aria-hidden="true" 
							xmlns="http://www.w3.org/2000/svg" 
							fill="currentColor" 
							viewBox="0 0 24 24"
						>
							<path 
								fill-rule="evenodd" 
								d="M4 4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm16 7H4v7h16v-7ZM5 8c0-.6.4-1 1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1Zm4-1a1 1 0 0 0 0 2 1 1 0 0 0 0-2Zm2 1c0-.6.4-1 1-1a1 1 0 1 1 0 2 1 1 0 0 1-1-1Z" 
								clip-rule="evenodd"
							/>
						</svg>
						<InputText 
							value={data?.resolution.width} 
							disabled={!reso} 
							name="width" label="" placeholder="Width" 
						/>
						x
						<InputText 
							value={data?.resolution.height} 
							disabled={!reso} 
							name="height" label="" placeholder="Height" 
						/>
					</div>
					<div>
						<label class="relative inline-flex gap-2 my-2 items-center cursor-pointer">
							<span class="ms-2 text-sm font-medium text-gray-300">
								Custom resolution
							</span>
							<input 
								onChange={SettingsStorage.toggleResolution}
								type="checkbox" 
								name="customr" 
								class="sr-only peer" 
								checked={reso} 
							/>
							<div class="w-11 h-6 rounded-full peer peer-focus:ring-4peer-focus:ring-blue-800 bg-slate-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
						</label>
					</div>
				</section>
				<section>
					<span className="block mt-2 mb-1 text-sm font-medium text-white">
						Game Directory
						<Badge color="!bg-red-900 text-white w-fit mb-2" >
							not recommended
						</Badge>
					</span>
					<div className="ml-2 flex gap-2 items-center">
						<svg 
							class="size-6 text-white" 
							aria-hidden="true" 
							xmlns="http://www.w3.org/2000/svg" 
							fill="currentColor" 
							viewBox="0 0 24 24"
						>
							<path 
								fill-rule="evenodd" 
								d="M3 6c0-1.1.9-2 2-2h5.5a2 2 0 0 1 1.6.7L14 7H3V6Zm0 3v10c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V9H3Z" 
								clip-rule="evenodd"
							/>
						</svg>
						<InputText className="w-full" name="gamedir" placeholder="<Default>" />
					</div>
				</section>
				<section>
					<span className="block mt-2 mb-1 text-sm font-medium text-white">
						Python Path or env
						<Badge color="!bg-orange-500 text-white w-fit mb-2" >
							important!
						</Badge>
					</span>
					<div className="ml-2 flex gap-2 items-center">
						<svg 
							className="w-6 h-6 text-gray-800 dark:text-white" 
							aria-hidden="true" 
							xmlns="http://www.w3.org/2000/svg" 
							width="24" 
							height="24" 
							fill="currentColor" 
							viewBox="0 0 24 24"
						>
							<path 
								fill-rule="evenodd" 
								d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm-.293 9.293a1 1 0 0 1 0 1.414L9.414 14l1.293 1.293a1 1 0 0 1-1.414 1.414l-2-2a1 1 0 0 1 0-1.414l2-2a1 1 0 0 1 1.414 0Zm2.586 1.414a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414-1.414L14.586 14l-1.293-1.293Z" 
								clip-rule="evenodd"
							/>
						</svg>
						<InputText className="w-full" name="python" placeholder="py" />
					</div>
				</section>
				<section className="mt-4 self-end">
					<button type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
					<svg 
						className="size-5 me-2"
						xmlns="http://www.w3.org/2000/svg" 
						viewBox="0 0 448 512"
						fill="currentColor"
					>
						{/* !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
						<path 
							d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
						/>
					</svg>
						Save
					</button>
				</section>
			</form>
		</Modal>
	)
}
