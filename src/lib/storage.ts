import { signal } from '@preact/signals'
import { Store } from 'tauri-plugin-store-api'

export interface SettingStorage {
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

	static stores = signal<Record<string, Store>>({})

	static async addStorage(path: string) {

		const store = new Store(path)

		this.stores.value = {
			...this.stores.value,
			[path]: store
		}

		return store
	}

	static async getStorage(path: string) {
		return this.stores.value[path]
	}

}

export class SettingsStorage {

	static settings = signal<SettingStorage | undefined >(undefined)

	static {
		StorageManager.addStorage('.settings.dat')
			.then(async (storage) => {

				const settings = await storage.get<SettingStorage>('mc-settings')

				if (settings != null) {
					if (settings.uuid == '') {
						settings.uuid = crypto.randomUUID()
						this.setSettings(settings)
					}
					SettingsStorage.settings.value = settings
				}
			})
	}

	static get() {
		return this.settings.value
	}

	static save(data: FormData) {

		let width = data.get('width')
		let height = data.get('height')

		if (width == null) width = '1080'
		if (height == null) height = '720'

		const settings: SettingStorage = {
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
			uuid: this.settings.value?.uuid ?? crypto.randomUUID(),
			token: '',
			defaultExecutablePath: '',
			pythonPath: ''
		}

		this.setSettings(settings)
	}

	static toggleResolution() {

		const settings = SettingsStorage.settings

		if (settings.value == null) return

		SettingsStorage.settings.value = {
			...settings.value,
			customResolution: !settings.value?.customResolution
		}
	}

	static async setSettings(settings: SettingStorage) {

		const storage = await StorageManager.getStorage('.settings.dat')

		await storage.set('mc-settings', settings)
		await storage.save()
		
		SettingsStorage.settings.value = settings
	}

	static getSettings() {
		return this.settings.value
	}

}