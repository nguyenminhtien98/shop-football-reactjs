export const getOrCreateChatUserId = () => {
	let userId = localStorage.getItem('chatUserId');
	if (!userId) {
		userId = 'guest-' + Math.random().toString(36).substring(2, 10);
		localStorage.setItem('chatUserId', userId);
	}
	return userId;
};
