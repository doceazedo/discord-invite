import Head from "next/head";
import { InviteGenerator } from "@/components/InviteGenerator";
import "@picocss/pico";

export default function Home() {
  return (
    <>
      <Head>
        <title>Discord Invite Generator</title>
        <meta name="description" content="discord-invite" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header
        className="container"
        style={{
          padding: "var(--block-spacing-vertical) 0",
        }}
      >
        <hgroup>
          <h1>Discord Invite Generator</h1>
          <p>
            Generate Discord invite images and embed them anywhere you want!
          </p>
        </hgroup>
      </header>
      <main className="container">
        <InviteGenerator />
      </main>
      <footer className="container">
        <small>
          Made by DoceAzedo &bull;{" "}
          <a href="https://github.com/doceazedo/discord-invite">Source code</a>
        </small>
      </footer>
    </>
  );
}
