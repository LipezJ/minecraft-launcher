import { render } from 'preact'
import App from './App'
import './index.css'

import Minecraft from './lib/mine'

Minecraft.init()

render(<App />, document.getElementById('root')!)
