import { type Ref } from 'preact/hooks'
import { signal } from '@preact/signals'
import { Modal } from 'flowbite'
import type { ModalOptions, InstanceOptions } from 'flowbite'

export class ModalManager {

	static modals = signal<Record<string, Ref<HTMLDivElement>>>({})

	static init(modal: Ref<HTMLDivElement>, id: string) {
		if (modal.current == null) return
		
		this.modals.value = {
			...this.modals.value,
			[id]: modal
		}
	}

	static getOptions(): ModalOptions {
		return {
			placement: 'center',
			backdrop: 'dynamic',
			backdropClasses: 'bg-gray-900/80 fixed inset-0 z-40',
			closable: true
		}
	}

	static getInstanceOptions(id: string): InstanceOptions {
		return {
			id,
			override: true
		}
	}

	static show(id: string) {

		const modal = this.modals.value[id].current
		if (modal == null) return

		const options = this.getOptions()
		const instanceOptions = this.getInstanceOptions(id)

		new Modal(modal, options, instanceOptions).show()
	}

	static hide(id: string) {

		const modal = this.modals.value[id].current
		if (modal == null) return

		const options = this.getOptions()
		const instanceOptions = this.getInstanceOptions(id)

		new Modal(modal, options, instanceOptions).hide()
	}
}