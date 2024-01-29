use reqwest::Error;
use serde::{Deserialize, Serialize};

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

pub fn get_installed_versions(path: String) -> Vec<MineVersionInfo> {

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
          let compliance_level = jsoninfo["complianceLevel"].as_i64().unwrap();

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

pub async fn get_version_list() -> Result<Vec<MineVersionInfo>, Error> {

  let url = "https://launchermeta.mojang.com/mc/game/version_manifest_v2.json";
  let url = reqwest::Url::parse(url).unwrap();

  let res = reqwest::get(url)
    .await?
    .json::<MinecraftVersionList>()
    .await?;

  Ok(res.versions)
}

pub fn get_minecraft_path() -> String{
	let user = std::env::var("USERNAME").unwrap();
	#[cfg(target_os = "windows")]
	return format!("C:\\Users\\{}\\AppData\\Roaming\\.minecraft", user);
	#[cfg(target_os = "linux")]
	return format!("/home/{}/.minecraft", user);
}

pub fn get_os_path() -> String {
  #[cfg(target_os = "windows")] {
    return "".to_string();
  }
  #[cfg(target_os = "linux")] {
    return "/usr/lib/minecraft-launcher/".to_string();
  }
} 

pub fn get_py_path() -> String {
  #[cfg(target_os = "windows")] {
    return "py".to_string();
  }
  #[cfg(target_os = "linux")] {
    return "python3".to_string();
  }
}