/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const invite = searchParams.get("invite");
    if (!invite) {
      return new ImageResponse(<>Visit with &quot;?invite=&quot;</>, {
        width: 432,
        height: 110,
      });
    }

    const resp = await fetch(
      `https://discord.com/api/v9/invites/${invite}?with_counts=true&with_expiration=true`
    );
    const data = await resp.json();

    if (data.message && data.code) {
      return new ImageResponse(
        (
          <>
            [{data.code}] {data.message}
          </>
        ),
        {
          width: 432,
          height: 110,
        }
      );
    }

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
              src={`https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.jpg?size=240`}
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
                {data.guild.name}
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
                  {data.approximate_presence_count} online
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
                  {data.approximate_member_count} membros
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
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
