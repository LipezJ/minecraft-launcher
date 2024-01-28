import { useRef } from 'preact/hooks'
import { Collapse } from 'flowbite'
import { BetaAlert } from './BetaAlert'
import { SideMenu } from './SideMenu'

export function SideBar() {

	const targetElement = useRef<HTMLElement>(null)
	const triggerOpenElement = useRef<HTMLButtonElement>(null)
	const triggerCloseElement = useRef<HTMLButtonElement>(null)

	const open = () => {

		const collapse = new Collapse(targetElement.current, triggerOpenElement.current)
		collapse.expand()
	}

	const close = () => {

		const collapse = new Collapse(targetElement.current, triggerCloseElement.current)
		collapse.collapse()
	}

	return (
		<>
			<button 
				onClick={open} 
				ref={triggerOpenElement} 
				data-drawer-target="default-sidebar" 
				data-drawer-toggle="default-sidebar" 
				aria-controls="default-sidebar" 
				type="button" 
				className="absolute top-0 left-0 z-10 ml-6 mt-4 inline-flex items-center p-2 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 bg-gray-800 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
			>
				<span className="sr-only">Open sidebar</span>
				<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
				</svg>
			</button>
			<aside ref={targetElement} id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
				<div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-800">
					<section className="flex justify-between h-14 mb-4">
						<span className="flex items-center font-bold text-white text-xl p-2">
              Launcher
						</span>
						<button 
							onClick={close} 
							ref={triggerCloseElement} 
							data-drawer-target="default-sidebar" 
							data-drawer-toggle="default-sidebar" 
							aria-controls="default-sidebar" 
							type="button" 
							className="inline-flex items-center p-2 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
						>
							<span className="sr-only">Close sidebar</span>
							<svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6"/>
							</svg>
						</button>
					</section>
					<div className="flex flex-col justify-between gap-2 max-h-fit h-full">
						<section className="h-full">
						</section>
						<section className="h-fit">
							<SideMenu />
							<BetaAlert /> 
						</section>
					</div>
				</div>
			</aside>
		</>
	)
}