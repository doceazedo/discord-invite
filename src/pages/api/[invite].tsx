/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

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
                  fontWeight: 600,
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
                color: `#ffffff`,
                borderRadius: 3,
              }}
            >
              Entrar
            </div>
          </div>
        </div>
      ),
      {
        width: 432,
        height: 110,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

const errorImage = (error: string) =>
  new ImageResponse(<>{error}</>, {
    width: 432,
    height: 110,
  });

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
