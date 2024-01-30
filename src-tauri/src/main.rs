// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod run;
mod utils;
mod install;

use run::{run_explorer, run_minecraft};
use install::{get_version_list, get_installed_versions, install_minecraft_version};

fn main() {
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![
			run_explorer,
			run_minecraft,
			get_version_list,
			get_installed_versions,
			install_minecraft_version,
		])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
