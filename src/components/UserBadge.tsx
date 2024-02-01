import { Users } from '../lib/user'
import Minecraft from '../lib/mine'

import { UserIcon, BinIcon } from './Icons'
import Select from './ui/Select'

export function UserBadge() {

	const { selected, users } = Users.users.value

	return (
		<Select
			id="users-select"
			disabled={ Minecraft.isLoading.value || Minecraft.isRunning.value }
			selected={users[selected]}
			icon={ <UserIcon className="size-6" /> }
		>
			{
				users.map((user, index) => {
					if (index === selected) return
					return (
						<li key={index} className="flex">
							<button 
								onClick={() => Users.setDefault(user)}
								type="button" 
								className="inline-flex w-3/4 gap-2 px-4 py-2 text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
							>
								<div className="inline-flex items-center gap-2">
									<UserIcon className="size-6"/>
									{ user }
								</div>
							</button>
							<button 
								onClick={() => Users.remove(user)}
								className="flex justify-center items-center w-1/4 hover:bg-red-600/20"
							>
								<BinIcon />
							</button>
						</li>
					)
				})
			}
		</Select>
	)
}
