import { ComponentChildren, VNode } from 'preact'

export default function Select(
	{ children, id, selected, disabled, icon }:
  { children: ComponentChildren, id: string, selected: string, disabled: boolean, icon: VNode }
) {
	return (
		<>
			<button 
				id={id} 
				disabled={disabled}
				data-dropdown-toggle={`dropdown-${id}`} 
				className="flex-shrink-0 gap-2 z-10 inline-flex items-center py-2.5 px-2 text-sm font-medium text-center border rounded-lg cursor-pointer disabled:cursor-default focus:ring-4 focus:outline-none bg-gray-800 hover:bg-gray-700 focus:ring-gray-800 text-white border-gray-700 disabled:text-gray-500 disabled:hover:bg-gray-800" 
				type="button"
			>
				{ icon }
				{ selected }
				<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
					<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
				</svg>
			</button>
			<div id={`dropdown-${id}`}  className="z-10 hidden divide-gray-100 rounded-lg shadow w-44 bg-gray-800">
				<ul className="py-2 text-sm text-gray-200" aria-labelledby={id}>
					{ children }
				</ul>
			</div>
		</>
	)
}