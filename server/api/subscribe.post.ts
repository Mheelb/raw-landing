export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, message: 'Email invalide.' })
  }

  const apiKey = process.env.LOOPS_API_KEY
  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'Configuration manquante.' })
  }

  const res = await fetch('https://app.loops.so/api/v1/contacts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      source: 'landing-beta',
      userGroup: 'beta-waitlist',
    }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    // 409 = contact already exists — treat as success
    if (res.status === 409) return { ok: true }
    throw createError({ statusCode: 502, message: (body as any).message ?? 'Erreur Loops.' })
  }

  return { ok: true }
})
