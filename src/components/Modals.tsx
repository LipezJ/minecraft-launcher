import { Settings } from './modals/Settings'
import { UsersModal } from './modals/Users'
import { Install } from './modals/Install'

export default function Modals() {
	return (
		<>
			<Install />
			<Settings />
			<UsersModal />
		</>
	)
}