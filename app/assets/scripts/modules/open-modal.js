import $ from 'jquery';

class Modal
{
	constructor()
	{
		this.openModalButton = $(".open-modal");
		this.modal = $(".modal");
		this.closeModalButton = $(".modal__close");

		this.events();
	}

	events()
	{
		this.openModalButton.click(this.openModal.bind(this));
		this.closeModalButton.click(this.closeModal.bind(this));

		$(document).keyup(this.keyPressHandler.bind(this));
	}

	keyPressHandler(k)
	{
		if(k.keyCode == 27)
		{
			this.closeModal();
		}
	}

	openModal()
	{
		this.modal.addClass("modal--visible");
		return false;
	}

	closeModal()
	{
		this.modal.removeClass("modal--visible");
	}
}

export default Modal;