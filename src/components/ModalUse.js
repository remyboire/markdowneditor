import { useState } from 'react'

const ModalUse = () => {
	const [isShowing, setIsShowing] = useState(false)

	function toggleModal() {
		setIsShowing(!isShowing)
	}

	return {
		isShowing,
		toggleModal,
	}
}

export default ModalUse
