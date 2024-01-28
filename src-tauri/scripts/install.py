'''Install Minecraft'''

import sys
import minecraft_launcher_lib

def install_version():
    '''Main'''
    # lambda doesn't allow setting vars, so we need this little hack
    max_value = [0]

    callback = {
        "setStatus": print,
        "setProgress": lambda value: print_progress_bar(value, max_value[0]),
        "setMax": lambda value: maximum(max_value, value),
    }

    version = sys.argv[1]
    directory = sys.argv[2]

    minecraft_launcher_lib.install.install_minecraft_version(
        version, directory, callback=callback
    )

def maximum(max_value, value):
    '''Set the maximum value of the progress bar'''
    max_value[0] = value

def print_progress_bar(iteration, total):
    '''Print the progress bar'''
    percent = ("{0:." + '1' + "f}").format(100 * (iteration / float(total)))
    print(percent)
    if iteration == total:
        print()

if __name__ == "__main__":
    install_version()
