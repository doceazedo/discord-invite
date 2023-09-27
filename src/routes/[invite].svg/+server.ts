import satori from 'satori';
import type { Font as SatoriFont, FontWeight } from 'satori';
import { Invite } from './invite';
import { ErrorImage } from './errorImage';

type Font = {
	name: string;
	path: string;
	weight: FontWeight;
};

let fonts: SatoriFont[] = [];

export const GET = async ({ params, fetch }) => {
	if (!fonts.length) {
		await loadFonts(
			[
				{
					name: 'gg sans',
					path: '/fonts/gg-sans-regular.ttf',
					weight: 400
				},
				{
					name: 'gg sans',
					path: '/fonts/gg-sans-semibold.ttf',
					weight: 600
				},
				{
					name: 'gg sans',
					path: '/fonts/gg-sans-bold.ttf',
					weight: 700
				}
			],
			fetch
		);
	}

	const data = await getInviteData(params.invite);
	if (!data) {
		return await svg(ErrorImage('Could not retrieve invite'));
	}
	if (data.message && data.code) {
		return svg(ErrorImage(`[${data.code}] ${data.message}`));
	}

	return await svg(Invite(data));
};

const svg = async (element: any) => {
	const svgStr = await satori(element, {
		width: 432,
		height: 110,
		fonts
	});
	const blob = new Blob([svgStr], { type: 'image/svg+xml' });
	const response = new Response(blob, {
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	});
	return response;
};

const loadFonts = async (
	localFonts: Font[],
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>
) => {
	await Promise.all(
		localFonts.map(async (font) => {
			const data = await fetch(font.path).then((res) => res.arrayBuffer());
			fonts = [
				...fonts,
				{
					name: font.name,
					data,
					weight: font.weight
				}
			];
		})
	);
};

const getInviteData = async (invite: string) => {
	try {
		const resp = await fetch(
			`https://discord.com/api/v9/invites/${invite}?with_counts=true&with_expiration=true`
		);
		const data = await resp.json();
		return data;
	} catch (error) {
		return null;
	}
};
