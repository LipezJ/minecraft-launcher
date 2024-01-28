import { VNode } from 'preact'
import { ModalManager } from '../lib/modals'
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
				onClick={() => ModalManager.show('install-modal')}
				icon={
					<InstallIcon />
				} 
			/>
			<MenuElement 
				text="Add Users" 
				onClick={() => ModalManager.show('users-modal')}
				icon={
					<svg 
						className="w-6 h-6 text-gray-800 dark:text-white" 
						aria-hidden="true" 
						xmlns="http://www.w3.org/2000/svg" 
						fill="currentColor" 
						viewBox="0 0 24 24"
					>
						<path 
							fillRule="evenodd" 
							d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8Zm4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5L9 13Zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z" 
							clipRule="evenodd"
						/>
					</svg>
				} 
			/>
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