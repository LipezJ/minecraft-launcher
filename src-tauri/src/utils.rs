use reqwest::Error;
use serde::{Deserialize, Serialize};
use crate::store::{get_setting_value, get_settings};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MineVersionInfo {
  pub id: String,
  pub r#type: String,
  pub release_time: String,
  pub compliance_level: i64
}

#[derive(Serialize, Deserialize)]
pub struct MinecraftLatestInfo {
  pub release: String,
  pub snapshot: String
}

#[derive(Serialize, Deserialize)]
pub struct MinecraftVersionList {
  pub latest: MinecraftLatestInfo,
  pub versions: Vec<MineVersionInfo>
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct CommandParmas {
  pub username: String,
  pub uuid: String,
  pub token: String,
  pub jvm_arguments: [String; 2],
  pub custom_resolution: bool,
  pub resolution_width: String,
  pub resolution_height: String,
  pub custom_directory: String
}

pub fn search_installed_versions(path: String) -> Vec<MineVersionInfo> {

  let path = path + "/versions";

  match std::fs::read_dir(path.clone()) {
    Ok(value) => {

      let mut versions = Vec::new();

      for entry in value {

        let entry = entry.unwrap();
        let version = entry.file_name().to_str().unwrap().to_string();
        let version_dir = path.clone() + format!("//{}//{}.json", version, version).as_str();

        let exists = match std::fs::metadata(version_dir.clone()) {
          Ok(_) => true,
          Err(_) => false
        };

        if exists {
          let jsoninfo = std::fs::read_to_string(version_dir).unwrap();
          let jsoninfo: serde_json::Value = serde_json::from_str(&jsoninfo).unwrap();

          let id = jsoninfo["id"].to_string().replace("\"", "");
          let r#type = jsoninfo["type"].to_string();
          let release_time = jsoninfo["releaseTime"].to_string();
          let compliance_level = match &jsoninfo["complianceLevel"] {
            serde_json::Value::Number(value) => value.as_i64().unwrap(),
            _ => 0
          };

          versions.push(MineVersionInfo {
            id,
            r#type,
            release_time,
            compliance_level
          });
        } 
      }

      return versions;
    },
    Err(e) => {
      println!("Error: {}", e);
      return Vec::new();
    }
  };

}

pub async fn fetch_version_list() -> Result<Vec<MineVersionInfo>, Error> {

  let url = "https://launchermeta.mojang.com/mc/game/version_manifest_v2.json";
  let url = reqwest::Url::parse(url).unwrap();

  let res = reqwest::get(url)
    .await?
    .json::<MinecraftVersionList>()
    .await?;

  Ok(res.versions)
}

pub fn get_minecraft_path() -> String {

	#[cfg(target_os = "windows")] {
    use std::path::PathBuf;

    let appdata = std::env::var("APPDATA").unwrap_or_else(|_| {
      let mut path = dirs::home_dir().expect("Failed to get user's home directory");
      path.push("AppData");
      path.push("Roaming");
      path.into_os_string().into_string().unwrap()
    });
    let mut minecraft_dir = PathBuf::from(appdata);
    minecraft_dir.push(".minecraft");
    return minecraft_dir.to_string_lossy().to_string();
  }

	#[cfg(target_os = "linux")] {
    let mut minecraft_dir = dirs::home_dir().expect("Failed to get user's home directory");
    minecraft_dir.push(".minecraft");
    return minecraft_dir.to_string_lossy().to_string();
  }
}

pub fn get_os_path() -> String {
  #[cfg(target_os = "windows")] {
    return "".to_string();
  }
  #[cfg(target_os = "linux")] {
    return "/usr/lib/minecraft-launcher/".to_string();
  }
} 

pub fn get_py_path_default() -> String {
  #[cfg(target_os = "windows")] {
    return "python".to_string();
  }
  #[cfg(target_os = "linux")] {
    return "python3".to_string();
  }
}

pub async fn get_py_path() -> String {

  let mut py_path = get_py_path_default();

  match get_setting_value("pythonPath".to_string()).await {
    Some(value) => {
      if let serde_json::Value::String(path) = value {
        py_path = path;
      }
    },
    None => {}
  };

  return py_path;
}

pub async fn get_command_params(username: String) -> CommandParmas {
  
  let settings = get_settings().await.unwrap();

  let max = format!("-Xmx{}M", settings["ram"]["max"].as_i64().unwrap());
  let min = format!("-Xms{}M", settings["ram"]["min"].as_i64().unwrap());
  let width = settings["resolution"]["width"].as_str().unwrap();
  let height = settings["resolution"]["height"].as_str().unwrap();
  let custom_res = settings["customResolution"].as_bool().unwrap();
  let uuid = settings["uuid"].as_str().unwrap();
  let token = settings["token"].as_str().unwrap();
  let custom_dir = settings["gameDirectory"].as_str().unwrap();
  
  let params = CommandParmas {
    username,
    uuid: uuid.to_owned(),
    token: token.to_owned(),
    jvm_arguments: [ min, max ],
    custom_resolution: custom_res,
    resolution_width: width.to_owned(),
    resolution_height: height.to_owned(),
    custom_directory: custom_dir.to_owned()
  };

  return params;

}