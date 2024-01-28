import { signal } from '@preact/signals'
import { ModalManager } from './modals'

export interface UsersInterface {
  selected: number
  users: string[]
}

export class Users {

	static users = signal<UsersInterface>({
		selected: 0,
		users: []
	})

	static {
		
		if (localStorage.getItem('users') === null) {
			localStorage.setItem('users', JSON.stringify({}))
		}
		const users = JSON.parse(localStorage.getItem('users') || '{}')

		if (users.selected !== undefined && users.users !== undefined) {
			Users.users.value = users
		} else {
			Users.users.value = {
				selected: 0,
				users: []
			}
		}

		Users.saveState()
	}

	static saveState() {
		localStorage.setItem('users', JSON.stringify(Users.users.value))
	}

	static add(user: string) {

		if (Users.users.value.users.includes(user)) return

		Users.users.value = {
			...Users.users.value,
			users: [...Users.users.value.users, user]
		}
		Users.setDefault(user)
		ModalManager.hide('users-modal')
		Users.saveState()
	}

	static remove(user: string) {

		if (Users.users.value.users.length < 2) return

		const { users, selected: selected } = Users.users.value
		const index = users.indexOf(user)

		if (index === selected) {
			Users.users.value.selected = index - 1
		}

		Users.users.value.users = users.filter(u => u !== user)

		Users.users.value = {
			...Users.users.value,
			selected: index
		}

		Users.saveState()
	}

	static setDefault(user: string) {

		const index = Users.users.value.users.indexOf(user)

		if (index > -1) {
			Users.users.value = {
				...Users.users.value,
				selected: index
			}
		} else {
			// TODO: throw error
		}
		Users.saveState()
	}

}