'''Modulo principal del proceso de Minecraft Launcher Personal'''

import subprocess
import sys

import minecraft_launcher_lib

def run_minecraft():
    '''Run Minecraft'''

    version = sys.argv[1]
    minecraft_directory = sys.argv[2]
    mine_user = sys.argv[3]

    options = {
        'username': mine_user,
        'uuid': 'e78d4515-0774-43ee-ae2a-72fbc5101c4f',
        'token': '',
        "jvmArguments": ["-Xmx1G", "-Xms1G"],
        "launcherVersion": "0.0.1",
    }

    minecraft_command = minecraft_launcher_lib.command.get_minecraft_command(
        version,
        minecraft_directory,
        options
    )

    subprocess.run(minecraft_command, check=False)

if __name__ == '__main__':
    run_minecraft()
