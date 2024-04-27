use std::path::PathBuf;

use uuid::Uuid;
use serde_json::{Map, Value};
use tauri::{App, Manager, Wry};
use tauri_plugin_store::{with_store, StoreBuilder, StoreCollection};
use crate::get_app;

pub async fn get_settings() -> Option<Map<String, Value>> {

  let app_handle = get_app();

  let stores = app_handle.state::<StoreCollection<Wry>>();
  let path = PathBuf::from(".settings.dat");

  let settings = with_store(app_handle.clone(), stores, path, 
    |store| {
      // in here you can actually use the store
      let store_data = store.get("mc-settings").unwrap();

      let data = match store_data {
        Value::Object(map) => map.to_owned(),
        _ => Map::new(),
      };

      Ok(data)
    }
  );

  match settings {
    Ok(settings) => {
      Some(settings)
    },
    Err(_) => None
  }

}

pub async fn get_setting_value(name: String) -> Option<Value> {
	let settings = get_settings().await;
	
	match settings {
		Some(settings) => {
			Some(settings[&name.to_string()].clone())
		},
		None => None
	}
}

pub fn init_settings_store(app: &App) -> Result<(), Box<dyn std::error::Error>> {

  let stores = app.state::<StoreCollection<Wry>>();
	let path = std::path::PathBuf::from(".settings.dat");

	match with_store(app.handle(), stores, path, |_| Ok(())) {
		Ok(_) => (),
		Err(_) => {
			let mut store = StoreBuilder::new(
					app.handle(), 
					".settings.dat".parse()?
				).build();
		
			// This is only for the development version
			// To get the uuid you have to log in with Microsoft
			let uuid = Uuid::new_v4().to_string();
		
			store.insert("mc-settings".to_owned(), serde_json::json!({
				"ram": {
					"min": 1000,
					"max": 1000,
				},
				"resolution": {
					"width": "1080",
					"height": "720",
				},
				"uuid": uuid,
				"token": "",
				"customResolution": false,
				"defaultExecutablePath": "",
				"gameDirectory": "",
				"pythonPath": "",
			}))?;
		
			store.save()?;
		}
	};

  Ok(())
}