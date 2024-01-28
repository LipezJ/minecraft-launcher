"""Compile sidecar files for the project."""

import subprocess

def get_sidacar_file_names():
    """Get the sidecar file names."""

    sidecar_file_names = ["test", "run", "install"]

    return sidecar_file_names


def get_command(file_name):
    """Get the command to compile the sidecar file."""

    command_args = [
        "pyinstaller",
        "-F",
        f"src-tauri/scripts/{file_name}.py",
        "--distpath",
        "src-tauri/bin/python",
        "--clean",
        "--name",
        f"{file_name}-x86_64-pc-windows-msvc",
    ]

    return command_args


def compile_sidecar():
    """Compile the sidecar files."""

    sidecar_file_names = get_sidacar_file_names()

    for file_name in sidecar_file_names:
        command_args = get_command(file_name)
        subprocess.run(command_args, check=True)

if __name__ == "__main__":
    compile_sidecar()
