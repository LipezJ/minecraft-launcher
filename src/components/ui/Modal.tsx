import { Ref } from 'preact/hooks'
import { ComponentChildren } from 'preact'
import { ModalManager } from '../../lib/modals'

import { CloseIcon } from '../Icons'

export default function Modal(
	{ children, id, title, reference }: 
	{ children: ComponentChildren, id: string, title: string, reference: Ref<HTMLDivElement> }
) {
	return (
		<div id={id} ref={reference} tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative rounded-lg shadow bg-gray-700">
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
						<h3 className="text-xl font-semibold text-white">
							{ title }
						</h3>
						<button
							onClick={() => ModalManager.hide(id)}
							type="button"
							className="end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white" 
							data-modal-hide={id}
						>
							<CloseIcon />
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					<div className="p-4 md:p-5">
						{ children }
					</div>
				</div>
			</div>
		</div> 
	)
}