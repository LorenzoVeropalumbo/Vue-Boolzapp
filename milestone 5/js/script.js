var app = new Vue(
	{
		el: '#root',
		data: {
				userActiveChat: 2,
				userText: '',
				userFilterText: '',
				currentSelectElemnt: null,
				showMenu: false,
				PopUpActive: false,
				contactName: "",
				contactImage: "",
				contacts: [
					{
						name: 'Michele',
						avatar: '_1',
						visible: true,
						messages: [
							{
								date: '10/01/2020 15:30:55',
								text: 'Hai portato a spasso il cane?',
								status: 'sent'
							},
							{
								date: '10/01/2020 15:50:00',
								text: 'Ricordati di dargli da mangiare',
								status: 'sent'
							},
								{
								date: '10/01/2020 16:15:22',
								text: 'Tutto fatto!',
								status: 'received'
							}
						],
					},
					{
						name: 'Fabio',
						avatar: '_2',
						visible: true,
						messages: [
							{
								date: '20/03/2020 16:30:00',
								text: 'Ciao come stai?',
								status: 'sent'
							},
							{
								date: '20/03/2020 16:30:55',
								text: 'Bene grazie! Stasera ci vediamo?',
								status: 'received'
							},
							{
								date: '20/03/2020 16:35:00',
								text: 'Mi piacerebbe ma devo andare a fare la spesa.',
								status: 'sent'
							}
						],
					},
					{
						name: 'Samuele',
						avatar: '_3',
						visible: true,
						messages: [
							{
								date: '28/03/2020 10:10:40',
								text: 'La Marianna va in campagna',
								status: 'received'
							},
							{
								date: '28/03/2020 10:20:10',
								text: 'Sicuro di non aver sbagliato chat?',
								status: 'sent'
							},
							{
								date: '28/03/2020 16:15:22',
								text: 'Ah scusa!',
								status: 'received'
							}
						],
					},
					{
						name: 'Luisa',
						avatar: '_4',
						visible: true,
						messages: [
							{
								date: '10/01/2020 15:30:55',
								text: 'Lo sai che ha aperto una nuova pizzeria?',
								status: 'sent'
							},
							{
								date: '10/01/2020 15:50:00',
								text: 'Si, ma preferirei andare al cinema',
								status: 'received'
							}
						],
					},
				],
				quotes: [
					'no, i\'m your father ',
					'come to the darkside we have cookies',
					'may the force be with you',
					'hello there',
					'Boring conversation anyway…',
					'I find your lack of faith disturbing.'
				],
				newContact: {
					name: 'Aggiungi nuovo contatto',
					avatar: '_4',
					visible: true,
				},				
			},
			methods: {
				// Active clicked chat
				chatSwap(index){
					this.PopUpActive = false;
					this.showMenu = false;
					this.userActiveChat = index;
					this.currentSelectElemnt = null;
				},
				// Send message
				sendMessage(){
					
					const trimmedString = this.userText.trim();
					
					if(trimmedString.length > 0){
						this.contacts[this.userActiveChat].messages.push({
								date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
								text: trimmedString,
								status: 'sent'
							}
						)
						setTimeout(this.responseMessage,1000);							
					}							
					
					this.userText = "";	
				},
				// User response
				responseMessage(){
					
					const response = Math.floor(Math.random() * 6);

					this.contacts[this.userActiveChat].messages.push({
						date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
						text: this.quotes[response],
						status: 'received'
					})
				},
				// search contact
				filterElementsByText() {
					
					const userInputLower = this.userFilterText.toLowerCase();
					this.contacts.forEach((element) => {
						const elementTextLower = element.name.toLowerCase();

						if(elementTextLower.includes(userInputLower)) {
							element.visible = true;
						} else {
							element.visible = false;
						}
					});
				},
				// slice big text
				sliceMessage(text){
					let newText = text;
					if(text.length > 29){
						newText = text.slice(0,30);
						newText += "..."
					}
					return newText
				},
				// chevron menu
				chevronMenu(index){
					this.PopUpActive = false;
					this.showMenu = false;
					if(this.currentSelectElemnt !== index){
						this.currentSelectElemnt = index;
					} else{
						this.currentSelectElemnt = null;
					}
					
				},
				// delete messages
				deleteMessage(indexMessage){
					this.currentSelectElemnt = null;
					this.contacts[this.userActiveChat].messages.splice(indexMessage, 1);
				},
				resetClick(){
					this.currentSelectElemnt = null;
					this.showMenu = false;
					this.PopUpActive = false;
				},
				closeshowMenu(){
					this.showMenu =	!this.showMenu;
					this.currentSelectElemnt = null;
					this.PopUpActive = false;
				},
				deleteAllChat(){										
					this.contacts[this.userActiveChat].messages.splice(0,this.contacts[this.userActiveChat].messages.length);
					this.showMenu = false;
				},
				deleteContact(){										
					this.contacts.splice(this.userActiveChat,1);
					this.userActiveChat = 0;
					this.showMenu = false;
					this.PopUpActive = false;
				},
				addNewContact(){
					this.currentSelectElemnt = null;
					this.showMenu = false;
					this.PopUpActive = true;
				},
				closePopUp(){
					this.PopUpActive = false;
				},
				saveNewContact(){
					
					this.contacts.push(
						{
							name: this.contactName,
							avatar: this.contactImage,
							visible: true,
							messages: [
							
							],
						}
					)

					this.contactName= "",
					this.contactImage= "",
					this.PopUpActive = false;
				}

			}
	}
);