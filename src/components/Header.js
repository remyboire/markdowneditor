import React from 'react'
import ModalUse from './ModalUse'
import Modal from './Modal'
import './header.css'
import iconDoc from '../assets/icon-document.svg'
import iconDelete from '../assets/icon-delete.svg'
import iconSave from '../assets/icon-save.svg'

export default function Header(props) {
	const { docs, currentDoc, handleChangeName, handleDeleteDoc, handletoggleSidebar } = props
	const doc = Object.getOwnPropertyDescriptors(docs.filter((doc) => doc.id === currentDoc)[0])

	const { isShowing, toggleModal } = ModalUse()

	return (
		<header className='header'>
			<div className='burger-wrapper'>
				<button className='burger' onClick={handletoggleSidebar}>
					<div></div>
				</button>
				{/* <button className='btn-burger' onClick={handletoggleSidebar}>
					<span className='bar bar--1'></span>
					<span className='bar bar--2'></span>
					<span className='bar bar--3'></span>
				</button> */}
			</div>

			<h1 className='logo'>MARKDOWN</h1>
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

			<button className='button save-doc'>
				<img src={iconSave} />
				Save Changes
			</button>
		</header>
	)
}
