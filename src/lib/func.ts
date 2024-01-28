import { invoke } from '@tauri-apps/api'

export async function openExplorer(path: string) {
	await invoke('run_explorer', { path })
}