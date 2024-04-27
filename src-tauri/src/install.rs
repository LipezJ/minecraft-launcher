use tauri::{api::process::{Command, CommandEvent}, Window};
use crate::utils::{
  fetch_version_list, get_minecraft_path, get_os_path, get_py_path, search_installed_versions
};

#[tauri::command]
pub async fn install_minecraft_version(window: Window, version: String) {

  let scripts_path = get_os_path() + "scripts/install.py";

  let (mut rx, _) = Command::new(get_py_path().await)
    .args([&scripts_path, &version, &get_minecraft_path()])
    .spawn()
    .expect("failed to execute process");

  tauri::async_runtime::spawn(async move {

    window.eval(&format!("window.minecraftInstalling('{}')", version.clone())).unwrap();

    while let Some(event) = rx.recv().await {
      if let CommandEvent::Stdout(line) = event {
        if line.contains("Download") {
          window
            .eval(&format!("window.minecraftInstallStatus('{}')", line)).unwrap();
        } else if  line.contains("Installation complete") {
          window
            .eval(&format!("window.minecraftInstalled()")).unwrap();
        } else {
          window
            .eval(&format!("window.minecraftInstallProgress({})", line)).unwrap();
        }
      }
    }
  });

  println!("Done!");
}

#[tauri::command]
pub async fn get_version_list() -> Vec<String> {
	let versions = fetch_version_list().await;

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

#[tauri::command]
pub fn get_installed_versions() -> Vec<String> {
	let path = get_minecraft_path();

	search_installed_versions(path)
		.iter()
		.map(|x| x.id.clone())
		.collect()
}
