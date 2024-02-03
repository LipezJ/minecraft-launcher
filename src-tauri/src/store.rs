use std::path::PathBuf;

use serde_json::{Map, Value};
use tauri::{Manager, Wry};
use tauri_plugin_store::{StoreCollection, with_store};
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
