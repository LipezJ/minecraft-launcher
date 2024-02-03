import { signal } from '@preact/signals'
import { Store } from 'tauri-plugin-store-api'

export interface Storage {
	ram: {
		min: number;
		max: number;
	},
	resolution: {
		width: string;
		height: string;
	},
	uuid: string,
	token: string,
	customResolution: boolean;
	defaultExecutablePath	: string;
	gameDirectory: string;
	pythonPath: string;
}

export default class StorageManager {

	static storage = new Store('.settings.dat')
	static settings = signal< Storage | undefined >(undefined)

	static async init() {

		const settings = await this.storage.get<Storage>('mc-settings')

		if (settings) {
			this.settings.value = settings
		} else {
			// error handling
		}
	}

	static getSettings() {
		return this.settings.value
	}

	static async setSettings(settings: Storage) {
		
		await this.storage.set('mc-settings', settings)
		await this.storage.save()
		
		this.settings.value = settings
	}

}

export class SettingsStorage {

	static get() {
		return StorageManager.getSettings()
	}

	static save(data: FormData) {

		let width = data.get('width')
		let height = data.get('height')

		if (width == null) width = '1080'
		if (height == null) height = '720'

		const settings: Storage = {
			ram: {
				min: Number(data.get('memmin')),
				max: Number(data.get('memmax'))
			},
			resolution: {
				width: width as string,
				height: height as string
			},
			customResolution: Boolean(data.get('customr')),
			gameDirectory: data.get('gamedir') as string,
			uuid: '',
			token: '',
			defaultExecutablePath: '',
			pythonPath: ''
		}

		StorageManager.setSettings(settings)
	}

}