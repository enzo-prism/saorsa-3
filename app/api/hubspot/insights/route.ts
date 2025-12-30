import { NextResponse } from "next/server"

export const runtime = "nodejs"

const DEFAULT_PORTAL_ID = "48890556"
const DEFAULT_FORM_GUID = "b2fdbefa-fa98-4e2b-af8b-d9e07bb102a9"
const DEFAULT_REGION = "na2"

type InsightsPayload = {
  email?: string
  website?: string
  pageUri?: string
  pageName?: string
  hutk?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const toStringValue = (value: unknown) => (typeof value === "string" ? value.trim() : "")

const shouldUseRegionalEndpoint = (region: string) => !["na1", "na2"].includes(region)

const getHubSpotBaseUrl = (region: string) =>
  shouldUseRegionalEndpoint(region) ? `https://api-${region}.hsforms.com` : "https://api.hsforms.com"

export async function POST(request: Request) {
  let body: InsightsPayload

  try {
    body = (await request.json()) as InsightsPayload
  } catch (error) {
    console.error("Failed to parse insights request body.", error)
    return NextResponse.json({ ok: false, message: "Invalid request payload." }, { status: 400 })
  }

  const website = toStringValue(body.website)
  if (website) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const email = toStringValue(body.email)
  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ ok: false, message: "Please provide a valid email address." }, { status: 400 })
  }

  const portalId = process.env.HUBSPOT_PORTAL_ID ?? DEFAULT_PORTAL_ID
  const formGuid = process.env.HUBSPOT_INSIGHTS_FORM_GUID ?? DEFAULT_FORM_GUID
  const region = process.env.HUBSPOT_REGION ?? DEFAULT_REGION
  const hubspotUrl = `${getHubSpotBaseUrl(region)}/submissions/v3/integration/submit/${portalId}/${formGuid}`

  const context: Record<string, string> = {}
  const pageUri = toStringValue(body.pageUri)
  const pageName = toStringValue(body.pageName)
  const hutk = toStringValue(body.hutk)

  if (pageUri) context.pageUri = pageUri
  if (pageName) context.pageName = pageName
  if (hutk) context.hutk = hutk

  const payload = {
    submittedAt: Date.now(),
    fields: [{ name: "email", value: email }],
    ...(Object.keys(context).length ? { context } : {}),
  }

  try {
    const response = await fetch(hubspotUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("HubSpot insights submission failed.", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      })
      return NextResponse.json(
        { ok: false, message: "We could not send your request right now. Please try again later." },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error("HubSpot insights submission error.", error)
    return NextResponse.json(
      { ok: false, message: "We could not send your request right now. Please try again later." },
      { status: 502 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 })
}
