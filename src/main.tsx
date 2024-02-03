import { render } from 'preact'
import App from './App'
import './index.css'

import Minecraft from './lib/mine'
import SettingStorage from './lib/storage'

Minecraft.init()
SettingStorage.init()

render(<App />, document.getElementById('root')!)
