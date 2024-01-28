use tauri::Window;
use tauri::api::process::{Command ,CommandEvent};
use crate::utils::get_minecraft_path;

#[tauri::command]
pub fn run_minecraft(window: Window, version: String, username: String) {

  let (mut rx, _) = Command::new("py")
		.args(&["scripts/run.py", &version, &get_minecraft_path(), username.as_str()])
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