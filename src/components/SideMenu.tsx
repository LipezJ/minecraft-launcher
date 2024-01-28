import { VNode } from 'preact'
import { InstallModal } from '../lib/modals'
import { InstallIcon } from './Icons'

export function SideMenu() {

	return (
		<ul className="space-y-2 font-medium">
			<MenuElement text="Settings" icon={
				<svg 
					className="w-6 h-6 text-gray-800 dark:text-white" 
					aria-hidden="true" 
					xmlns="http://www.w3.org/2000/svg" 
					fill="currentColor" 
					viewBox="0 0 24 24"
				>
					<path d="M10.8 5a3 3 0 0 0-5.6 0H4a1 1 0 1 0 0 2h1.2a3 3 0 0 0 5.6 0H20a1 1 0 1 0 0-2h-9.2ZM4 11h9.2a3 3 0 0 1 5.6 0H20a1 1 0 1 1 0 2h-1.2a3 3 0 0 1-5.6 0H4a1 1 0 1 1 0-2Zm1.2 6H4a1 1 0 1 0 0 2h1.2a3 3 0 0 0 5.6 0H20a1 1 0 1 0 0-2h-9.2a3 3 0 0 0-5.6 0Z"/>
				</svg>
			} />
			<MenuElement 
				text="Install" 
				onClick={InstallModal.show}
				icon={
					<InstallIcon />
				} 
			/>
			<MenuElement text="Users" icon={
				<svg 
					className="w-6 h-6 text-gray-800 dark:text-white" 
					aria-hidden="true" 
					xmlns="http://www.w3.org/2000/svg" 
					fill="currentColor" 
					viewBox="0 0 24 24"
				>
					<path 
						fillRule="evenodd" 
						d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3Zm2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.5Z" 
						clipRule="evenodd"
					/>
				</svg>    
			} />
		</ul>
	)
}

function MenuElement({ icon, text, onClick }: { icon: VNode, text: string, onClick?: () => void }) {
	return (
		<li>
			<button 
				onClick={onClick}
				className="flex justify-start items-center p-2 w-full rounded-lg text-white text-lg hover:bg-gray-700 group"
			>
				{icon}
				<span className="flex ms-3 whitespace-nowrap">{text}</span>
			</button>
		</li>
	)
}