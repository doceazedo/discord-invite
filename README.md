<h1 align="center">discord-invite</h1>

<p align="center">
  Embed your Discord guild invite in social media profiles, forum signatures, websites or anywhere that supports third-party hosted images!
</p>

<p align="center">
  <img src="https://img.shields.io/github/deployments/doceazedo/discord-invite/Production?label=vercel&logo=vercel&style=flat-square" alt="Vercel status">
</p>

<p align="center">
  <a href="https://discord.gg/vEGRe2kq8B">
    <img src="https://discord-invite.doceazedo.com/vEGRe2kq8B.png" alt="Discord invite">
  </a>
</p>

## Usage 🔗

Embed this image URL anywhere you want:

```
https://discord-invite.doceazedo.com/[INVITE].png
```

You will probably also want to wrap the image with your invite link. You can do this using HTML like so:

```html
<a href="https://discord.gg/XXXXXXXXXX">
	<img src="https://discord-invite.doceazedo.com/XXXXXXXXXX.png" />
</a>
```

If you prefer Markdown, it will depend a bit on the flavor used by each platform. In general, you can do something link this:

```md
[![](https://discord-invite.doceazedo.com/XXXXXXXXXX.png)](https://discord.gg/XXXXXXXXXX)
```

Or even BBCode:

```
[url=https://discord.gg/XXXXXXXXXX][img]https://discord-invite.doceazedo.com/XXXXXXXXXX.png[/img][/url]
```

## TO-DO 🔮

You can see the TO-DO list for this project [here](https://todo.doceazedo.com/discord-invite).

## Why and how? 🤔

Discord does not offer an official invite widget, but only a guild iframe showing a list of online members and channels.

This app allows anyone to add guild invites anywhere outside of Discord by using just an image that resembles the official in-app invite.

This is possible by using the Discord API to fetch the invite link data and generate the image on the fly using [Satori](https://github.com/vercel/satori).

## Development 🧰

This is a [SvelteKit](https://kit.svelte.dev) app, so everything should work just like any other SvelteKit project.

You can run the development server with:

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open http://localhost:5173 with your browser to see the result.

You can start editing the image generator by modifying [`src/routes/[invite].svg/+server.ts`](/src/routes/[invite].svg/+server.ts).

## Deploy 🚀

This app is edge-ready! And the easiest way to deploy it is on Vercel and you can do that by clicking on this button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdoceazedo%2Fdiscord-invite)
