# Minecraft Launcher
This is an implementation of the `minecraft_launcher_lib` library in which we create a more friendly user interface that allows you to manage installations and users.

## How to install
### Download installer from the repository

You can find installers for Linux (.deb) and for Windows [here #main](https://github.com/LipezJ/minecraft-launcher/releases/tag/main)

## Requisites

Since we depend on the 'Python' library to manage the execution and installation of the different versions of Minecraft, it is essential to have the following requirements installed:

- `Python`
- `minecraft_launcher_lib`

## Set Up

1. Once the launcher is installed and before installing a version you have to define the name of the environment variable for python in `Settings > Python Path or env`, that way the program will know how to execute the python scripts that are in charge install the versions and run them.
2. Install a version from the list of available versions in `Install`.
3. Once installed, you can select or create the user and select the installed version to play.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
