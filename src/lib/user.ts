import { signal } from '@preact/signals'

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

		Users.users.subscribe(() => {
			Users.saveState()
		})
	}

	static saveState() {
		localStorage.setItem('users', JSON.stringify(Users.users.value))
	}

	static add(user: string) {

		Users.users.value = {
			...Users.users.value,
			users: [...Users.users.value.users, user]
		}
		Users.saveState()
	}

	static remove(user: string) {

		const { users, selected: selected } = Users.users.value

		if (users.indexOf(user) === selected) {
			Users.users.value.selected = 0
		}
		Users.users.value.users = users.filter(u => u !== user)

		Users.users.value = {
			...Users.users.value
		}
		
		Users.saveState()
	}

	static setDefault(user: string) {

		const index = Users.users.value.users.indexOf(user)
		if (index > -1) {
			Users.users.value.selected = index
		} else {
			// TODO: throw error
		}
		Users.saveState()
	}

}