use tauri::Window;
use tauri::api::process::{Command ,CommandEvent};
use crate::utils::{get_minecraft_path, get_os_path, get_py_path, get_command_params};

#[tauri::command]
pub async fn run_minecraft(window: Window, version: String, username: String) {

	let scripts_path = get_os_path() + "scripts/run.py";

	let settings = get_command_params(username).await;

  let (mut rx, _) = Command::new(get_py_path().await)
		.args([ 
			scripts_path, 
			version, 
			get_minecraft_path(), 
			serde_json::to_string(&settings).unwrap() 
		])
		.spawn()
		.expect("failed to execute process");

	tauri::async_runtime::spawn(async move {

		let mut loading = true;

		while let Some(event) = rx.recv().await {
			match event {
				CommandEvent::Stdout(line) => {
					if line.contains("Setting user") {
						window.eval(&format!("window.minecraftRunning()")).unwrap();
						loading = false;
						continue;
					} else if loading {
						window.eval(&format!("window.minecraftLoad()")).unwrap();
					}
				},
				CommandEvent::Terminated(_) => {
					window.eval(&format!("window.minecraftClosed()")).unwrap();
					break;
				},
				_ => {}
			}
		}
		
	});
}
  
#[tauri::command]
pub fn run_explorer(path: String) {

  #[cfg(target_os = "windows")]
  let path = path.replace("/", "\\");

  let (mut rx, _) = Command::new("explorer")
    .args([ get_minecraft_path() + path.as_str() ])
    .spawn()
    .expect("failed to execute process");

  tauri::async_runtime::spawn(async move {
    let _ = rx.recv().await;
  });
}