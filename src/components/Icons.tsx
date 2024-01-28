export function Cube({ className }: { className: string }) {
	return (
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 512 512" 
			className={className}
			fill="currentColor"
		>
			{/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
			<path d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z"/>
		</svg>
	)
}

export function DownloadIcon() {
	return (
		<svg 
			className="w-3 h-3 me-1.5" 
			aria-hidden="true" 
			xmlns="http://www.w3.org/2000/svg" 
			fill="currentColor" 
			viewBox="0 0 20 20"
		>
			<path 
				d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/><path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
			/>
		</svg>
	)
}

export function CloseIcon() {
	return (
		<svg 
			className="w-3 h-3" 
			aria-hidden="true" 
			xmlns="http://www.w3.org/2000/svg" 
			fill="none" 
			viewBox="0 0 14 14"
		>
			<path 
				stroke="currentColor" 
				strokeLinecap="round" 
				strokeLinejoin="round" 
				strokeWidth="2" 
				d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
			/>
		</svg>
	)
}

export function Loader() {
	return (
		<svg aria-hidden="true" role="status" className="inline size-6 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
			<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
		</svg>
	)
}

export function InstallIcon() {
	return (
		<svg 
			className="w-6 h-6 text-gray-800 dark:text-white" 
			aria-hidden="true" 
			xmlns="http://www.w3.org/2000/svg" 
			fill="currentColor" 
			viewBox="0 0 24 24"
		>
			<path 
				fillRule="evenodd" 
				d="M4 4a2 2 0 1 0 0 4h16a2 2 0 1 0 0-4H4Zm0 6h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Zm10.7 5.7a1 1 0 0 0-1.4-1.4l-.3.3V12a1 1 0 1 0-2 0v2.6l-.3-.3a1 1 0 0 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l2-2Z" 
				clipRule="evenodd"
			/>
		</svg>
	)
}

export function UserIcon({ className }: { className: string }) {
	return (
		<svg 
			className={className}
			aria-hidden="true" 
			xmlns="http://www.w3.org/2000/svg" 
			fill="currentColor" 
			viewBox="0 0 24 24"
		>
			<path 
				fillRule="evenodd" 
				d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" 
				clipRule="evenodd"
			/>
		</svg>
	)
}

export function BinIcon() {
	return (
		<svg 
			className="size-6 text-gray-800 dark:text-white" 
			aria-hidden="true" 
			xmlns="http://www.w3.org/2000/svg" 
			fill="currentColor" 
			viewBox="0 0 24 24"
		>
			<path 
				fillRule="evenodd" 
				d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" 
				clipRule="evenodd"
			/>
		</svg>
	)
}