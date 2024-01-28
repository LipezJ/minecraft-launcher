import Minecraft from '../lib/mine'

export function InstallProgress() {
	const { status, progress, is_installing, version } = Minecraft.installer.value

	if (!is_installing) return null

	return (
		<div className="flex max-w-full max-h-full p-6 gap-6 rounded-lg shadow bg-gray-800 border-gray-700">
			<section className="flex flex-col justify-center items-center text-sm text-gray-300 font-semibold min-w-fit">
				<div className="flex items-center">
					<span className="flex size-3 me-1 bg-green-500 rounded-full"/>
          Installing 
				</div>
				<span>{version}</span>
			</section>
			<section className="flex flex-col items-end w-full" >
				<span className="flex h-3 bg-gray-200/20 rounded-full w-full">
					<span className="flex h-3 bg-yellow-300 rounded-full transition duration-500" style={{width: `${progress}%`}}></span>
				</span>
				<div className="flex justify-between items-center w-full">
					<div className="text-sm text-gray-300 font-semibold">
            Status: <span className="font-normal text-gray-400">{status}</span>
					</div>
					<span className="flex justify-self-end font-bold text-md text-gray-400">
						{progress}%
					</span>
				</div>
			</section>
		</div>
	)
}