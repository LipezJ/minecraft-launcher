import type { ComponentChild } from 'preact'

export function Badge({ children, color }: { children: ComponentChild, color?: string}) {
	return (
		<span className={`text-sm font-medium px-2.5 py-0.5 rounded bg-blue-900 text-blue-300 ms-1 ${color}`}>
			{ children }
		</span>
	)
}