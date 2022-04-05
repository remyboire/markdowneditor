import React from 'react'

export default function ThemeToggle() {
	const [isEnabled, setIsEnabled] = React.useState(false)

	const toggleState = () => {
		setIsEnabled((prevState) => !prevState)
	}

	return (
		<label className='toggle-wrapper' htmlFor='toggle'>
			<div className={`toggle ${isEnabled ? 'enabled' : 'disabled'}`}>
				<span className='hidden'>{isEnabled ? 'Enable' : 'Disable'}</span>
				<input id='toggle' name='toggle' type='checkbox' checked={isEnabled} onClick={toggleState} />
			</div>
		</label>
	)
}
