import { NextResponse } from "next/server"

export const runtime = "nodejs"

const DEFAULT_PORTAL_ID = "48890556"
const DEFAULT_FORM_GUID = "92102b78-8a05-4729-bc08-8bf40a6b9bdd"
const DEFAULT_REGION = "na2"

type ContactPayload = {
  firstName?: string
  firstname?: string
  lastName?: string
  lastname?: string
  email?: string
  company?: string
  phone?: string
  message?: string
  subscribeToInsights?: boolean | string
  insights_opt_in?: boolean | string
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
  let body: ContactPayload

  try {
    body = (await request.json()) as ContactPayload
  } catch (error) {
    console.error("Failed to parse contact request body.", error)
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

  const message = toStringValue(body.message)
  if (message && message.length > 4000) {
    return NextResponse.json({ ok: false, message: "Message must be 4000 characters or fewer." }, { status: 400 })
  }

  const portalId = process.env.HUBSPOT_PORTAL_ID ?? DEFAULT_PORTAL_ID
  const formGuid = process.env.HUBSPOT_FORM_GUID ?? DEFAULT_FORM_GUID
  const region = process.env.HUBSPOT_REGION ?? DEFAULT_REGION
  const hubspotUrl = `${getHubSpotBaseUrl(region)}/submissions/v3/integration/submit/${portalId}/${formGuid}`

  // Accept both camelCase and snake_case to support mixed client payloads.
  const firstName = toStringValue(body.firstName) || toStringValue(body.firstname)
  const lastName = toStringValue(body.lastName) || toStringValue(body.lastname)
  const optInRaw = body.subscribeToInsights ?? body.insights_opt_in

  const fields = [
    { name: "firstname", value: firstName },
    { name: "lastname", value: lastName },
    { name: "email", value: email },
    { name: "company", value: toStringValue(body.company) },
    { name: "phone", value: toStringValue(body.phone) },
    { name: "message", value: message },
  ].filter((field) => field.value)

  const subscribeToInsights =
    optInRaw === true || optInRaw === "true" || optInRaw === "on"

  if (subscribeToInsights) {
    fields.push({ name: "insights_opt_in", value: "true" })
  }

  const context: Record<string, string> = {}
  const pageUri = toStringValue(body.pageUri)
  const pageName = toStringValue(body.pageName)
  const hutk = toStringValue(body.hutk)

  if (pageUri) context.pageUri = pageUri
  if (pageName) context.pageName = pageName
  if (hutk) context.hutk = hutk

  const payload = {
    submittedAt: Date.now(),
    fields,
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
      console.error("HubSpot form submission failed.", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      })
      return NextResponse.json(
        { ok: false, message: "We could not send your message right now. Please try again later." },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error("HubSpot form submission error.", error)
    return NextResponse.json(
      { ok: false, message: "We could not send your message right now. Please try again later." },
      { status: 502 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 })
}
