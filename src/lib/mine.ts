import { invoke } from '@tauri-apps/api'
import { signal } from '@preact/signals'
import { ModalManager } from './modals'

interface Versions {
versions: string[]
selectedVersion: number
}

interface Installer {
version: string
progress: number
status: string
is_installing: boolean
}

export default class Minecraft {

	static isRunning = signal(false)
	static isLoading = signal(false)
	static avaibleVersions = signal<string[] | undefined>(undefined)
	static versions = signal<Versions>({
		versions: [],
		selectedVersion: 0
	})
	static installer = signal<Installer>({
		version: '',
		progress: 0,
		status: '',
		is_installing: false,
	})

	static {
		window.minecraftClosed = () => {
			Minecraft.isRunning.value = false
		}
		window.minecraftLoad = () => {
			Minecraft.isLoading.value = true
		}
		window.minecraftRunning = () => {
			Minecraft.isLoading.value = false
			Minecraft.isRunning.value = true
		}
		window.minecraftInstalling = (version: string) => {
			Minecraft.installer.value = {
				...Minecraft.installer.value,
				version,
				is_installing: true,
			}
		}
		window.minecraftInstalled = () => {
			Minecraft.installer.value = {
				version: '',
				is_installing: false,
				status: '',
				progress: 0,
			}
		}
		window.minecraftInstallStatus = (status: string) => {
			Minecraft.installer.value = {
				...Minecraft.installer.value,
				progress: 0,
				status
			}
		}
		window.minecraftInstallProgress = (progress: number) => {
			Minecraft.installer.value = {
				...Minecraft.installer.value,
				progress
			}
		}
	}

	static init() {
		this.getInstalledVersions()
	}

	static async run() {

		const { versions, selectedVersion } = Minecraft.versions.value
		
		await invoke('run_minecraft', { version: versions[selectedVersion] })
		Minecraft.isLoading.value = true
	}

	static getInstalledVersions() {
		invoke('get_installed_versions')
			.then((versions) => {
				const sortVersions = (versions as string[]).sort((a: string, b: string) => {
					const aSplit = a.split('.')
					const bSplit = b.split('.')
					for (let i = 0; i < aSplit.length; i++) {
						const aNum = parseInt(aSplit[i])
						const bNum = parseInt(bSplit[i])
						if (aNum > bNum) return 1
						if (aNum < bNum) return -1
					}
					return 0
				})
				Minecraft.versions.value = {
					versions: sortVersions,
					selectedVersion: 0
				}
			})
			.catch(() => {
				// TODO: Handle error
			})
	}

	static selectVersion(index: number) {
		this.versions.value = {
			...this.versions.value,
			selectedVersion: index
		}
	}

	static async getVersionsList() {
		await invoke('get_version_list')
			.then((versions) => {
				const filterVersions = (versions as string[]).filter((version) => {
					return version.match(/^\d{1}\.\d{2}(\.\d|)$/)
				})
				Minecraft.avaibleVersions.value = filterVersions
			})
			.catch(() => {
				Minecraft.avaibleVersions.value = undefined
				// TODO: Handle error
			})
	}

	static installVersion(version: string) {
		ModalManager.show('install-modal')
		invoke('install_minecraft_version', { version })
	}

}