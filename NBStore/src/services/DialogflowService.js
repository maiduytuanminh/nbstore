import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const createDialogflowSession = async () => {
	try {
		const response = await axios.post(`${API_URL}/dialogflow/session`);
		return response.data;
	} catch (error) {
		console.error('Error creating Dialogflow session:', error);
		throw error;
	}
};

export const sendDialogflowMessage = async (message, sessionId) => {
	try {
		const response = await axios.post(`${API_URL}/dialogflow/message`, {
			message,
			sessionId,
		});
		return response.data;
	} catch (error) {
		console.error('Error sending message to Dialogflow:', error);
		throw error;
	}
};
