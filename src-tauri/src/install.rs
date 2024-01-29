use tauri::{api::process::{Command, CommandEvent}, Window};
use crate::utils::{get_py_path, get_os_path};

pub fn install_minecraft_version(window: Window, version: String, path: String) {

  let scripts_path = get_os_path() + "scripts/install.py";

  let (mut rx, _) = Command::new(get_py_path())
    .args([&scripts_path, &version, &path])
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
