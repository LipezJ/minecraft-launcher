'''Modulo principal del proceso de Minecraft Launcher Personal'''

import subprocess
import json
import sys

import minecraft_launcher_lib

def run_minecraft():
    '''Run Minecraft'''

    version = sys.argv[1]
    minecraft_directory = sys.argv[2]
    options_inline = sys.argv[3]

    options = json.loads(options_inline)

    minecraft_command = minecraft_launcher_lib.command.get_minecraft_command(
        version,
        minecraft_directory,
        options
    )

    subprocess.run(minecraft_command, check=False)

if __name__ == '__main__':
    run_minecraft()
