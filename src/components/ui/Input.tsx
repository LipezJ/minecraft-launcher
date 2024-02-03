export function InputText(
	{ name, label, placeholder, className, value, disabled  }: 
	{ name: string, label?: string, placeholder: string, className?: string, value?: string | number, disabled?: boolean }
) {
	return (
		<div className={className}>
			<label className="block mb-1 text-sm font-medium text-white">{label}</label>
			<input 
				type="text" 
				name={name} 
				value={value}
				disabled={disabled}
				placeholder={placeholder} 
				className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-500  disabled:text-gray-500 text-white focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>
	)
}
