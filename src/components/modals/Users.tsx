import { useEffect, useRef } from 'preact/hooks'
import { ModalManager } from '../../lib/modals'
import { Users } from '../../lib/user'
import { Badge } from '../ui/Badge'

export function UsersModal() {

	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		ModalManager.init(modalRef, 'users-modal')
	}, [])

	return (
		<div 
			ref={modalRef}
			id="users-modal" 
			tabIndex={-1} 
			aria-hidden="true" 
			className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
		>
			<div className="relative p-4 w-[50%] max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Add users
						</h3>
						<button 
							type="button" 
							onClick={() => ModalManager.hide('users-modal')}
							className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
							data-modal-hide="users-modal"
						>
							<svg 
								className="w-3 h-3" 
								aria-hidden="true" 
								xmlns="http://www.w3.org/2000/svg" 
								fill="none" 
								viewBox="0 0 14 14"
							>
								<path 
									stroke="currentColor" 
									strokeLinecap="round" 
									strokeLinejoin="round" 
									strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					<div className="p-4 md:p-5">
						<UserForm />
					</div>
				</div>
			</div>
		</div> 
	)
}

function UserForm() {

	const handleSubmit = (e: Event) => {
		e.preventDefault()

		const form = e.target as HTMLFormElement
		const formData = new FormData(form)
		const user = formData.get('user') as string

		form.reset()
		Users.add(user)
	} 

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			<div>
				<div className="flex">
					<Badge color="!bg-red-900 text-white w-fit mb-2" >
						Authentication with Microsoft not yet available
					</Badge>
				</div>
				<label className="grid mb-2 text-sm font-medium text-gray-900 dark:text-white">
					<span>Your user name </span>
				</label>
				<input 
					name="user" 
					id="user" 
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
					placeholder="steve" 
					required 
				/>
			</div>
			<button 
				type="submit" 
				className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Add new user
			</button>
		</form>
	)
}