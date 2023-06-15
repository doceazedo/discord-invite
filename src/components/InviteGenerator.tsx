/* eslint-disable @next/next/no-img-element */

export const InviteGenerator = () => (
  <section id="preview">
    <h2>Generate</h2>
    <p>
      Generate a guild invite (preferably one that never expires) and paste the
      link below. You can also customize the language and format of the image
      and pick the embed code that better fits your needs.
    </p>
    <form>
      <div className="grid">
        <input
          type="text"
          name="firstname"
          placeholder="Invite link"
          aria-label="Invite link"
          required={true}
        />
        <select>
          <option>English</option>
          <option>Brazilian Portuguese</option>
        </select>
        <select>
          <option>PNG</option>
          <option>SVG</option>
        </select>
        <select>
          <option>HTML</option>
          <option>Markdown</option>
          <option>BBCode</option>
          <optgroup label="---" />
          <option>URL only</option>
        </select>
        <button type="submit">Generate image</button>
      </div>
    </form>
    <div
      style={{ display: "flex", gap: 32, width: "100%", overflow: "hidden" }}
    >
      <a
        href="https://discord.gg/vEGRe2kq8B"
        target="_blank"
        rel="noopener noreferrer"
        style={{ flexShrink: 0, width: 431, height: 110 }}
      >
        <img
          src="https://discord-invite.doceazedo.com/api/vEGRe2kq8B.png"
          alt=""
        />
      </a>
      <code style={{ width: "100%", height: "fit-content" }}>
        <pre
          style={{ marginBottom: 0, whiteSpace: "break-spaces" }}
        >{`<a href="https://discord.gg/XXXXXXXXXX">
  <img src="https://discord-invite.doceazedo.com/api/XXXXXXXXXX.png" />
</a>`}</pre>
      </code>
    </div>
  </section>
);
