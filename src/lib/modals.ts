import { type Ref } from 'preact/hooks'
import { signal } from '@preact/signals'
import { Modal } from 'flowbite'
import type { ModalOptions, InstanceOptions, ModalInterface } from 'flowbite'

export class InstallModal {

	static modal = signal<ModalInterface | undefined>(undefined)

	static modalOptions: ModalOptions = {
		placement: 'center',
		backdrop: 'dynamic',
		backdropClasses: 'bg-gray-900/80 fixed inset-0 z-40',
		closable: true
	}

	static instanceOptions: InstanceOptions = {
		id: 'install-modal',
		override: true
	}

	static init(modal: Ref<HTMLDivElement>) {
		if (modal.current == null) return
		
		this.modal.value = new Modal(modal.current, this.modalOptions, this.instanceOptions)
	}

	static show() {
		InstallModal.modal.value?.show()
	}

	static hide() {
		InstallModal.modal.value?.hide()
	}

}