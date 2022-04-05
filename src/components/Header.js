import React from 'react'
import ModalUse from './ModalUse'
import Modal from './Modal'
import './header.css'
import iconDoc from '../assets/icon-document.svg'
import iconDelete from '../assets/icon-delete.svg'
import iconCheck from '../assets/icon-check.svg'
import iconSave from '../assets/icon-save.svg'

export default function Header(props) {
	const { docs, currentDoc, handleChangeName, handleDeleteDoc, handleSaveClick, handletoggleSidebar, changesSaved } = props
	const doc = Object.getOwnPropertyDescriptors(docs.filter((doc) => doc.id === currentDoc)[0])

	const { isShowing, toggleModal } = ModalUse()

	return (
		<header className='header' role='header'>
			<div className='burger-wrapper'>
				<div className='burger' onClick={handletoggleSidebar}>
					<div className='dash'></div>
				</div>
			</div>
			<h1 className='logo logo-desktop'>MARKDOWN</h1>
			<span className='document-infos'>
				<span className='document-logo'>
					<img src={iconDoc} alt='show preview' />
				</span>
				<span className='document-name'>
					<label htmlFor='docName'>Document Name</label>
					<input type='text' placeholder='Document Name' className='form--input' name='docName' value={doc['name'].value} onChange={handleChangeName} />
				</span>
			</span>

			<button className='modal-toggle' onClick={toggleModal}>
				<img src={iconDelete} alt='delete document' />
			</button>
			<Modal isShowing={isShowing} hide={toggleModal} handleDeleteDoc={handleDeleteDoc} docs={docs} currentDoc={currentDoc} />

			<button className='button save-doc' onClick={handleSaveClick}>
				{changesSaved ? <img src={iconCheck} /> : <img src={iconSave} alt='' />}
				<span className='button-text'>{changesSaved ? 'Changes saved' : 'Save Changes'}</span>
			</button>
		</header>
	)
}
