type InviteData = {
	guild: {
		id: string;
		icon: string;
		name: string;
	};
	approximate_presence_count: number;
	approximate_member_count: number;
};

export const Invite = (data: InviteData) => ({
	type: 'div',
	props: {
		style: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			height: '100%',
			width: '100%',
			padding: 16,
			backgroundColor: '#2b2d31',
			borderRadius: 4,
			fontFamily: "'gg sans'"
		},
		children: [
			{
				type: 'p',
				props: {
					style: {
						fontSize: 12,
						fontWeight: 700,
						margin: 0,
						color: '#b5bac1',
						textTransform: 'uppercase'
					},
					children: 'Você recebeu um convite para entrar em um servidor'
				}
			},
			{
				type: 'div',
				props: {
					style: {
						display: 'flex',
						alignItems: 'center',
						gap: 16
					},
					children: [
						{
							type: 'img',
							props: {
								width: '50',
								height: '50',
								src: `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.jpg?size=240`,
								alt: '',
								style: {
									borderRadius: 15
								}
							}
						},
						{
							type: 'div',
							props: {
								style: {
									display: `flex`,
									flexDirection: `column`
								},
								children: [
									{
										type: 'p',
										props: {
											style: {
												fontSize: 16,
												fontWeight: 700,
												color: `#ffffff`,
												margin: 0
											},
											children: data.guild.name
										}
									},
									{
										type: 'div',
										props: {
											style: {
												display: `flex`,
												gap: 12,
												fontSize: 14,
												color: `#b5bac1`
											},
											children: [
												{
													type: 'p',
													props: {
														style: {
															display: `flex`,
															alignItems: `center`,
															gap: 4,
															margin: 0
														},
														children: [
															{
																type: 'span',
																props: {
																	style: {
																		width: 8,
																		height: 8,
																		borderRadius: `50%`,
																		backgroundColor: `#23a559`,
																		marginTop: 3
																	}
																}
															},
															`${data.approximate_presence_count} online`
														]
													}
												},
												{
													type: 'p',
													props: {
														style: {
															display: `flex`,
															alignItems: `center`,
															gap: 4,
															margin: 0
														},
														children: [
															{
																type: 'span',
																props: {
																	style: {
																		width: 8,
																		height: 8,
																		borderRadius: `50%`,
																		backgroundColor: `#80848e`,
																		marginTop: 3
																	}
																}
															},
															`${data.approximate_member_count} membros`
														]
													}
												}
											]
										}
									}
								]
							}
						},
						{
							type: 'div',
							props: {
								style: {
									display: `flex`,
									alignItems: `center`,
									height: 40,
									padding: `0 16px`,
									marginLeft: `auto`,
									backgroundColor: `#248046`,
									fontSize: 14,
									fontWeight: 600,
									color: `#ffffff`,
									borderRadius: 3
								},
								children: 'Juntar-se'
							}
						}
					]
				}
			}
		]
	}
});
