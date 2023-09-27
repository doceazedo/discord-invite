export const ErrorImage = (message: string) => ({
	type: 'div',
	props: {
		style: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			height: '100%',
			width: '100%',
			padding: 16,
			backgroundColor: '#ffffff',
			color: '#ff0000'
		},
		children: message
	}
});
