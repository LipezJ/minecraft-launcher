import Modal from '../ui/Modal'
import { ModalManager } from '../../lib/modals'
import { useEffect, useRef } from 'preact/hooks'

export function Settings() {

	const modal = useRef<HTMLDivElement>(null)

	useEffect(() => {
		ModalManager.init(modal, 'settings-modal')
		ModalManager.show('settings-modal')
	}, [])

	return (
		<Modal 
			id="settings-modal" 
			title="Settings" 
			reference={modal}
		>
			<form action="">
				
			</form>
		</Modal>
	)
}