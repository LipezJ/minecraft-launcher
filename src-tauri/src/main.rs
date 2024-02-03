// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod run;
mod store;
mod utils;
mod install;

use std::sync::OnceLock;
use tauri::{App, AppHandle};
use tauri_plugin_store::StoreBuilder;
use run::{run_explorer, run_minecraft};
use install::{get_version_list, get_installed_versions, install_minecraft_version};

pub static APP: OnceLock<AppHandle> = OnceLock::new();

fn main() {
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![
			run_explorer,
			run_minecraft,
			get_version_list,
			get_installed_versions,
			install_minecraft_version,
		])
		.plugin(tauri_plugin_store::Builder::default().build())
		.setup(|app| setup_app(app))  
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}

pub fn get_app() -> AppHandle {
	match APP.get() {
		Some(app) => app.clone(),
		None => panic!("AppHandle not initialized"),
	}
}

pub fn setup_app(app: &App) -> Result<(), Box<dyn std::error::Error>> {

	APP.get_or_init(move || app.handle());
	
	let mut store = StoreBuilder::new(
			app.handle(), 
			".settings.dat".parse()?
		).build();

	store.insert("mc-settings".to_owned(), serde_json::json!({
		"ram": {
			"min": 1000,
			"max": 1000,
		},
		"resolution": {
			"width": "1080",
			"height": "720",
		},
		"uuid": "14edc18c-febf-47ca-90fb-8ef3e35ffb63",
		"token": "",
		"customResolution": false,
		"defaultExecutablePath": "",
		"gameDirectory": "",
		"pythonPath": "",
	}))?;

	store.save()?;

	Ok(())
}
