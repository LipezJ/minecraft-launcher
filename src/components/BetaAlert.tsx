import { Dismiss } from 'flowbite'
import { useRef } from 'preact/hooks'

export function BetaAlert() {

	const targetElement = useRef<HTMLDivElement>(null)
	const triggerElement = useRef<HTMLButtonElement>(null)

	const dismiss = () => {

		const dismiss = new Dismiss(targetElement.current, triggerElement.current)
		dismiss.hide()
	}

	return (
		<div ref={targetElement} id="dropdown-cta" className="p-4 mt-6 rounded-lg bg-blue-900" role="alert">
			<div className="flex items-center mb-3">
				<span className="text-sm font-semibold me-2 px-2.5 py-0.5 rounded bg-orange-200 text-orange-900">Beta</span>
				<button onClick={dismiss} ref={triggerElement} type="button" className="ms-auto -mx-1.5 -my-1.5 inline-flex justify-center items-center size-6 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 bg-blue-900 text-blue-400 hover:bg-blue-800" data-dismiss-target="#dropdown-cta" aria-label="Close">
					<span className="sr-only">Close</span>
					<svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
					</svg>
				</button>
			</div>
			<p className="mb-3 text-sm text-blue-400">
        This is a version in development
			</p>
			<a className="flex gap-1 text-sm underline font-medium text-blue-400 hover:text-blue-300" href="google.com">
				<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
					<path fillRule="evenodd" d="M12 2c-2.4 0-4.7.9-6.5 2.4a10.5 10.5 0 0 0-2 13.1A10 10 0 0 0 8.7 22c.5 0 .7-.2.7-.5v-2c-2.8.7-3.4-1.1-3.4-1.1-.1-.6-.5-1.2-1-1.5-1-.7 0-.7 0-.7a2 2 0 0 1 1.5 1.1 2.2 2.2 0 0 0 1.3 1 2 2 0 0 0 1.6-.1c0-.6.3-1 .7-1.4-2.2-.3-4.6-1.2-4.6-5 0-1.1.4-2 1-2.8a4 4 0 0 1 .2-2.7s.8-.3 2.7 1c1.6-.5 3.4-.5 5 0 2-1.3 2.8-1 2.8-1 .3.8.4 1.8 0 2.7a4 4 0 0 1 1 2.7c0 4-2.3 4.8-4.5 5a2.5 2.5 0 0 1 .7 2v2.8c0 .3.2.6.7.5a10 10 0 0 0 5.4-4.4 10.5 10.5 0 0 0-2.1-13.2A9.8 9.8 0 0 0 12 2Z" clipRule="evenodd"/>
				</svg>
				<p className="flex items-center">See in GitHub</p>
			</a>
		</div>
	)
}