import { useEffect, useRef } from 'preact/hooks'
import { ModalManager } from '../../lib/modals'
import { Users } from '../../lib/user'
import { Badge } from '../ui/Badge'
import Modal from '../ui/Modal'

export function UsersModal() {

	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		ModalManager.init(modalRef, 'users-modal')
	}, [])

	const handleSubmit = (e: Event) => {
		e.preventDefault()

		const form = e.target as HTMLFormElement
		const formData = new FormData(form)
		const user = formData.get('user') as string

		form.reset()
		Users.add(user)
	}

	return (
		<Modal 
			id="users-modal" 
			title="Settings" 
			reference={modalRef}
		>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<div>
					<div className="flex">
						<Badge color="!bg-red-900 text-white w-fit mb-2" >
							Authentication with Microsoft not yet available
						</Badge>
					</div>
					<label className="grid mb-2 text-sm font-medium text-white">
						<span>Your user name </span>
					</label>
					<input 
						name="user" 
						id="user" 
						className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" 
						placeholder="steve" 
						required 
					/>
				</div>
				<button 
					type="submit" 
					className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
				>
					Add new user
				</button>
			</form>
		</Modal> 
	)
}
