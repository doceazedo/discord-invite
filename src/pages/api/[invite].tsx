/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const ggSansRegular = fetch(
  new URL("../../../assets/gg-sans-regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const ggSansSemibold = fetch(
  new URL("../../../assets/gg-sans-semibold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const ggSansBold = fetch(
  new URL("../../../assets/gg-sans-bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const params = pathname.split("/")[2].split(".");

  if (params.length != 2)
    return errorImage("Invalid link, should be: /api/[invite].png");

  const [code, format] = params;
  if (format != "png") return errorImage("Invalid format, should be: png");

  const invite = await getInviteData(code);
  if (!invite) return errorImage("Could not retrieve invite");
  if (invite.message && invite.code)
    return errorImage(`[${invite.code}] ${invite.message}`);

  const ggSansRegularData = await ggSansRegular;
  const ggSansSemiboldData = await ggSansSemibold;
  const ggSansBoldData = await ggSansBold;

  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            padding: 16,
            backgroundColor: "#2b2d31",
            borderRadius: 4,
            fontFamily: "'gg sans'",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              margin: 0,
              color: "#b5bac1",
              textTransform: "uppercase",
            }}
          >
            Você recebeu um convite para entrar em um servidor
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <img
              width="50"
              height="50"
              src={`https://cdn.discordapp.com/icons/${invite.guild.id}/${invite.guild.icon}.jpg?size=240`}
              alt=""
              style={{
                borderRadius: 15,
              }}
            />

            <div style={{ display: `flex`, flexDirection: `column` }}>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: `#ffffff`,
                  margin: 0,
                }}
              >
                {invite.guild.name}
              </p>
              <div
                style={{
                  display: `flex`,
                  gap: 12,
                  fontSize: 14,
                  color: `#b5bac1`,
                }}
              >
                <p
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: 4,
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: `50%`,
                      backgroundColor: `#23a559`,
                      marginTop: 3,
                    }}
                  ></span>
                  {invite.approximate_presence_count} online
                </p>
                <p
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: 4,
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: `50%`,
                      backgroundColor: `#80848e`,
                      marginTop: 3,
                    }}
                  ></span>
                  {invite.approximate_member_count} membros
                </p>
              </div>
            </div>
            <div
              style={{
                display: `flex`,
                alignItems: `center`,
                height: 40,
                padding: `0 16px`,
                marginLeft: `auto`,
                backgroundColor: `#248046`,
                fontSize: 14,
                fontWeight: 600,
                color: `#ffffff`,
                borderRadius: 3,
              }}
            >
              Juntar-se
            </div>
          </div>
        </div>
      ),
      {
        width: 432,
        height: 110,
        fonts: [
          {
            name: "gg sans",
            data: ggSansRegularData,
            weight: 400,
          },
          {
            name: "gg sans",
            data: ggSansSemiboldData,
            weight: 600,
          },
          {
            name: "gg sans",
            data: ggSansBoldData,
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

const errorImage = (error: string) =>
  new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100%",
          width: "100%",
          padding: 16,
          backgroundColor: "#ffffff",
          color: "#ff0000",
        }}
      >
        {error}
      </div>
    ),
    {
      width: 432,
      height: 110,
    }
  );

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
