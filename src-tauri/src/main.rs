// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod run;
mod utils;
mod install;

use tauri::Window;
use utils::get_minecraft_path;

#[tauri::command]
fn run_minecraft(window: Window, version: String) {
	run::run_minecraft(window, version);
}

#[tauri::command]
fn get_installed_versions() -> Vec<String> {
	let path = get_minecraft_path();

	utils::get_installed_versions(path)
		.iter()
		.map(|x| x.id.clone())
		.collect()
}

#[tauri::command]
fn install_minecraft_version(window: Window, version: String) {
	install::install_minecraft_version(window, version, get_minecraft_path());
}

#[tauri::command]
async fn get_version_list() -> Vec<String> {
	let versions = utils::get_version_list().await;

	match versions {
		Ok(versions) => {

			let versions = versions
				.iter()
				.map(|x| x.id.clone())
				.collect();

			return versions;
		}
		Err(e) => {
			println!("Error: {}", e);
			return Vec::new();
		}
	}
}

fn main() {
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![
			run_minecraft,
			get_installed_versions,
			get_version_list,
			install_minecraft_version
		])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
