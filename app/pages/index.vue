<script setup lang="ts">
useSeoMeta({
  title: 'RAW — Ta collection de cinéma, enfin réelle.',
  description: 'Scanne ton ticket, prouve que tu étais là. RAW transforme chaque séance en une collection vérifiée, avec XP, niveaux et partage. Rejoins la bêta.',
  ogTitle: 'RAW — Ta collection de cinéma, enfin réelle.',
  ogDescription: 'Scanne ton ticket, prouve que tu étais là. RAW transforme chaque séance en une collection vérifiée, avec XP, niveaux et partage.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'RAW',
      description: 'Application mobile de collection de tickets de cinéma vérifiés, avec gamification et réseau social.',
      operatingSystem: 'iOS',
      applicationCategory: 'EntertainmentApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      url: 'https://joinraw.fr',
    }),
  }],
})

const email = ref('')
const submitted = ref(false)
const loading = ref(false)
const formError = ref('')

async function subscribe() {
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    formError.value = 'Entre une adresse email valide.'
    return
  }
  formError.value = ''
  loading.value = true
  try {
    await $fetch('/api/subscribe', {
      method: 'POST',
      body: { email: email.value },
    })
    submitted.value = true
  } catch (err: any) {
    formError.value = err?.data?.message ?? 'Une erreur est survenue. Réessaie.'
  } finally {
    loading.value = false
  }
}

const steps = [
  { icon: 'i-lucide-scan-line', title: 'Scanne ton ticket', desc: 'Après chaque séance, ouvre RAW et scanne le QR code de ton billet.' },
  { icon: 'i-lucide-badge-check', title: 'Ton film rejoint ta collection', desc: 'RAW vérifie via géolocalisation et OCR, automatiquement.' },
  { icon: 'i-lucide-trophy', title: 'Monte en niveau, partage', desc: 'Gagne de l\'XP, gravis les 45 niveaux, gagne des points et partage tes hot takes.' },
]

const features = [
  { icon: 'i-lucide-film', title: 'Collection vérifiée', desc: 'Chaque film est prouvé. Pas d\'ajout manuel, pas de triche.' },
  { icon: 'i-lucide-zap', title: 'Gamification XP & niveaux', desc: '45 niveaux, des centaines de titres, des Pop Coins à chaque séance.' },
  { icon: 'i-lucide-message-circle', title: 'Hot takes & communautés', desc: 'Opinions courtes, tranchées, immédiates.' },
  { icon: 'i-lucide-users', title: 'Feed social', desc: 'Suis tes amis, découvre leurs séances en temps réel.' },
]

// Scroll reveal refs — one per section
const { el: proofEl, isVisible: proofVisible } = useReveal()
const { el: problemEl, isVisible: problemVisible } = useReveal()
const { el: stepsEl, isVisible: stepsVisible } = useReveal()
const { el: featuresEl, isVisible: featuresVisible } = useReveal()
const { el: hookEl, isVisible: hookVisible } = useReveal()
const { el: ctaEl, isVisible: ctaVisible } = useReveal()

function focusEmailInput() {
  if (import.meta.client) {
    const input = document.querySelector<HTMLInputElement>('input[type=email]')
    input?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => input?.focus(), 600)
  }
}
</script>

<template>
  <div class="bg-[#090909] text-white min-h-screen font-sans overflow-x-hidden grain">
    <main id="main-content">

    <!-- NAVBAR -->
    <header class="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#090909]/80 backdrop-blur-md" style="padding-top: env(safe-area-inset-top)">
      <div class="px-4 sm:px-6 md:px-16 xl:px-32 h-16 flex items-center justify-between gap-3">
        <NuxtLink to="/" aria-label="RAW — Accueil" class="overflow-hidden flex items-center shrink-0" style="height:36px">
          <NuxtImg src="/logo.png" alt="RAW" width="200" height="200" format="webp" quality="85" class="w-auto" style="height:200px;margin-top:-82px;margin-bottom:-82px" fetchpriority="high" />
        </NuxtLink>
        <button type="button" @click="focusEmailInput"
          class="bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black font-semibold px-3 sm:px-4 py-2 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap shrink-0">
          <span class="hidden sm:inline">Rejoindre la </span>bêta →
        </button>
      </div>
    </header>

    <!-- HERO -->
    <section class="relative min-h-screen flex items-center px-6 md:px-16 xl:px-32 pt-28 sm:pt-24 pb-20" style="padding-top: calc(env(safe-area-inset-top) + 5rem)">
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div class="absolute -top-32 -left-24 w-[700px] h-[700px] rounded-full bg-yellow-500/[0.04] blur-[140px]" />
        <div class="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-yellow-500/[0.03] blur-[100px]" />
      </div>

      <div class="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div class="flex flex-col gap-8">
          <div class="inline-flex items-center gap-2 w-fit animate-fade-up" style="animation-delay: 0s">
            <span class="size-1.5 rounded-full bg-yellow-500 animate-pulse" aria-hidden="true" />
            <span class="text-xs font-medium text-yellow-500/80 uppercase tracking-widest">Bêta fermée · Avril
              2026</span>
          </div>

          <h1
            class="font-headline text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.06] tracking-tight animate-fade-up"
            style="animation-delay: 0.1s">
            Ta collection<br>
            de cinéma,<br>
            <em class="text-yellow-500 not-italic">enfin réelle.</em>
          </h1>

          <p class="text-lg text-white/55 max-w-md leading-relaxed animate-fade-up" style="animation-delay: 0.22s">
            Scanne ton ticket après chaque séance. RAW vérifie, archive et transforme chaque film en une trace
            permanente de ta vie de cinéphile.
          </p>

          <div class="flex flex-col gap-3 max-w-md animate-fade-up" style="animation-delay: 0.34s">
            <Transition name="fade" mode="out-in">
              <div v-if="!submitted" class="flex flex-col sm:flex-row gap-3">
                <input v-model="email" type="email" placeholder="ton@email.com"
                  aria-label="Adresse email pour rejoindre la bêta RAW" @keyup.enter="subscribe"
                  class="flex-1 min-w-0 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/50 text-sm focus:outline-none focus:border-yellow-500/40 transition-all" />
                <button type="button" :disabled="loading" @click="subscribe"
                  class="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3.5 rounded-xl text-sm whitespace-nowrap cursor-pointer">
                  Rejoindre la bêta →
                </button>
              </div>
              <div v-else class="flex items-center gap-2.5 text-yellow-500 font-medium" role="status">
                <UIcon name="i-lucide-circle-check" class="size-5" />
                <span>Tu es sur la liste. On te contacte bientôt.</span>
              </div>
            </Transition>
            <p v-if="!submitted" class="text-white/25 text-xs">Places limitées · Aucun spam · Accès prioritaire garanti
            </p>
          </div>
        </div>

        <!-- Ticket card -->
        <div class="flex items-center justify-center animate-fade-up mt-4 lg:mt-0" style="animation-delay: 0.45s"
          aria-hidden="true">
          <div class="relative">
            <div
              class="absolute top-5 left-5 w-full h-full rounded-2xl bg-yellow-500/[0.08] border border-yellow-500/15"
              style="transform: rotate(3deg)" />
            <div
              class="relative bg-[#111111] border border-white/10 rounded-2xl w-72 overflow-hidden animate-float shadow-2xl shadow-black/70">
              <div class="h-1 w-full bg-yellow-500" />
              <div
                class="relative h-40 bg-gradient-to-br from-[#1c1a08] via-[#141208] to-[#0c0c0c] flex items-center justify-center overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />
                <span
                  class="font-headline font-black text-6xl text-yellow-500/[0.12] tracking-tighter select-none z-10">RAW</span>
                <div
                  class="absolute top-3 right-3 flex items-center gap-1 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-full z-20">
                  <UIcon name="i-lucide-badge-check" class="size-3" />
                  Vérifié
                </div>
              </div>
              <div class="px-5 py-4 flex flex-col gap-3.5">
                <div>
                  <p class="font-headline font-bold text-white text-base">Dune: Deuxième Partie</p>
                  <p class="text-white/35 text-xs mt-0.5">Denis Villeneuve · 2024</p>
                </div>
                <div class="flex gap-0.5">
                  <span v-for="i in 5" :key="i" class="text-yellow-500 text-sm">★</span>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="flex items-center gap-1 text-white/35">
                    <UIcon name="i-lucide-map-pin" class="size-3" />
                    Paris 9e · 21:30
                  </span>
                  <span class="text-yellow-500 font-bold">+150 XP</span>
                </div>
                <div>
                  <div class="flex justify-between text-[10px] text-white/25 mb-1.5">
                    <span>Niv. 12</span><span>65%</span>
                  </div>
                  <div class="h-1 rounded-full bg-white/8">
                    <div class="h-full w-[65%] rounded-full bg-yellow-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SOCIAL PROOF -->
    <div class="border-y border-white/[0.07] py-4 px-6">
      <div ref="proofEl" :class="proofVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        class="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/35 text-center transition-all duration-700 ease-out">
        <span>Bêta fermée · Places limitées</span>
        <span class="size-1 rounded-full bg-white/15" aria-hidden="true" />
        <span>Lancement prévu <strong class="text-white/55">Avril 2026</strong></span>
        <span class="size-1 rounded-full bg-white/15" aria-hidden="true" />
        <span>iOS</span>
      </div>
    </div>

    <!-- PROBLEM / SOLUTION -->
    <section class="py-28 px-6 md:px-16 xl:px-32">
      <div ref="problemEl" class="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-28 items-start">
        <div :class="problemVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
          class="flex flex-col gap-6 transition-all duration-700 ease-out">
          <span class="text-white/20 text-xs font-medium uppercase tracking-widest">Le problème</span>
          <h2 class="font-headline text-4xl md:text-5xl font-bold leading-[1.1]">
            Tu vas au ciné,<br>puis...<span class="text-white/25"> rien.</span>
          </h2>
          <p class="text-white/50 text-lg leading-relaxed">Pas de trace. Pas de souvenir. Juste un ticket froissé au
            fond d'une poche.</p>
          <p class="text-white/30 text-base leading-relaxed">Et pendant ce temps, les salles se vident. Pas parce que
            les films sont mauvais — mais parce que Netflix a compris quelque chose que le cinéma ignore encore :
            l'engagement, ça se construit après la séance.</p>
        </div>
        <div :class="problemVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'"
          class="flex flex-col gap-6 md:pt-14 transition-all duration-700 ease-out delay-150">
          <span class="text-yellow-500/60 text-xs font-medium uppercase tracking-widest">La solution</span>
          <h2 class="font-headline text-4xl md:text-5xl font-bold leading-[1.1]">
            RAW transforme chaque séance en<br>
            <span class="text-yellow-500">trace permanente.</span>
          </h2>
          <p class="text-white/50 text-lg leading-relaxed">Ton historique, tes stats, ton niveau — tout ce que mérite ta
            passion pour le cinéma.</p>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="py-24 px-6 md:px-16 xl:px-32 bg-white/[0.018]">
      <div class="max-w-7xl mx-auto">
        <div ref="stepsEl" :class="stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          class="text-center mb-16 transition-all duration-700 ease-out">
          <span class="text-yellow-500/60 text-xs font-medium uppercase tracking-widest">Comment ça marche</span>
          <h2 class="font-headline text-4xl md:text-5xl font-bold mt-4">Trois gestes. Une collection.</h2>
        </div>
        <ol class="grid md:grid-cols-3 gap-5">
          <li v-for="(step, i) in steps" :key="i"
            :class="stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="stepsVisible ? { transitionDelay: `${i * 130}ms` } : {}"
            class="bg-[#111111] border border-white/8 rounded-2xl p-8 flex flex-col gap-5 transition-all duration-700 ease-out">
            <div class="flex items-center gap-4">
              <span class="font-headline text-5xl font-black text-yellow-500/15 leading-none select-none"
                aria-hidden="true">{{ i + 1 }}</span>
              <div class="size-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <UIcon :name="step.icon" class="size-5 text-yellow-500" />
              </div>
            </div>
            <h3 class="font-headline text-xl font-bold">{{ step.title }}</h3>
            <p class="text-white/45 text-sm leading-relaxed">{{ step.desc }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="py-24 px-6 md:px-16 xl:px-32">
      <div class="max-w-7xl mx-auto">
        <div ref="featuresEl" :class="featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          class="mb-14 transition-all duration-700 ease-out">
          <span class="text-yellow-500/60 text-xs font-medium uppercase tracking-widest">Ce que RAW t'offre</span>
          <h2 class="font-headline text-4xl md:text-5xl font-bold mt-4 max-w-xl leading-[1.1]">Tout ce que le cinéma t'a
            toujours refusé.</h2>
        </div>
        <ul class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <li v-for="(f, i) in features" :key="i"
            :class="featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="featuresVisible ? { transitionDelay: `${i * 100}ms` } : {}"
            class="bg-[#111111] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:border-yellow-500/20 transition-all duration-700 ease-out group">
            <div
              class="size-10 rounded-xl bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/15 transition-colors">
              <UIcon :name="f.icon" class="size-5 text-yellow-500" />
            </div>
            <h3 class="font-headline text-lg font-bold">{{ f.title }}</h3>
            <p class="text-white/40 text-sm leading-relaxed">{{ f.desc }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- THE HOOK -->
    <section class="relative py-36 px-6 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-yellow-500/[0.05] via-transparent to-transparent pointer-events-none"
        aria-hidden="true" />
      <div class="absolute inset-0 border-y border-yellow-500/[0.08] pointer-events-none" aria-hidden="true" />
      <div ref="hookEl"
        :class="hookVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.97]'"
        class="max-w-4xl mx-auto text-center transition-all duration-900 ease-out">
        <blockquote class="font-headline text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.18] text-white/85">
          Parce que chaque film que tu vois en salle<br>
          <span class="text-yellow-500">mérite d'exister quelque part.</span>
        </blockquote>
      </div>
    </section>

    <!-- BETA CTA -->
    <section class="py-28 px-6 md:px-16 xl:px-32">
      <div class="max-w-2xl mx-auto text-center flex flex-col items-center gap-10">
        <div ref="ctaEl" :class="ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          class="flex flex-col items-center gap-5 transition-all duration-700 ease-out">
          <span class="text-yellow-500/60 text-xs font-medium uppercase tracking-widest">Accès anticipé</span>
          <h2 class="font-headline text-4xl md:text-5xl font-bold leading-[1.08]">Places limitées<br>pour la bêta
            fermée.</h2>
          <p class="text-white/45 text-lg max-w-md leading-relaxed">Sois parmi les premiers à vivre RAW. On te contacte
            en priorité dès l'ouverture de la bêta.</p>
        </div>
        <div class="w-full max-w-md flex flex-col gap-3">
          <div v-if="!submitted" class="flex flex-col sm:flex-row gap-3">
            <input v-model="email" type="email" placeholder="ton@email.com"
              aria-label="Adresse email pour rejoindre la bêta RAW" @keyup.enter="subscribe"
              class="flex-1 min-w-0 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/50 text-sm focus:outline-none focus:border-yellow-500/40 transition-all" />
            <button type="button" :disabled="loading" @click="subscribe"
              class="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3.5 rounded-xl text-sm whitespace-nowrap cursor-pointer">
              Rejoindre la bêta →
            </button>
          </div>
          <div v-else class="flex items-center justify-center gap-2.5 text-yellow-500 font-medium py-3.5" role="status">
            <UIcon name="i-lucide-circle-check" class="size-5" />
            <span>Tu es sur la liste. On te contacte bientôt.</span>
          </div>
          <p v-if="!submitted" class="text-white/50 text-xs text-center">Aucun spam. Désabonnement en un clic.</p>
        </div>
      </div>
    </section>
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-white/[0.07] py-10 px-6 md:px-16 xl:px-32">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <div class="flex items-center gap-3">
          <div class="overflow-hidden flex items-center" style="height:28px">
            <NuxtImg src="/logo.png" alt="RAW" width="160" height="160" format="webp" quality="85" class="w-auto" style="height:160px;margin-top:-66px;margin-bottom:-66px" />
          </div>
          <span class="text-white/50 text-xs hidden sm:block">Ta collection de cinéma, enfin réelle.</span>
        </div>
        <nav class="flex flex-col items-center gap-3 md:flex-row md:gap-5 text-white/50">
          <div class="flex items-center gap-5">
            <NuxtLink to="https://www.instagram.com/raw.cine.app" external target="_blank" rel="noopener noreferrer"
              class="hover:text-white/80 transition-colors flex items-center gap-1.5">
              <UIcon name="i-simple-icons-instagram" class="size-4" />
              Instagram
            </NuxtLink>
            <NuxtLink to="https://www.tiktok.com/@raw.cine.app" external target="_blank" rel="noopener noreferrer"
              class="hover:text-white/80 transition-colors flex items-center gap-1.5">
              <UIcon name="i-simple-icons-tiktok" class="size-4" />
              TikTok
            </NuxtLink>
          </div>
          <div class="flex items-center gap-5">
            <NuxtLink to="/mentions-legales" class="hover:text-white/80 transition-colors">Mentions légales</NuxtLink>
            <NuxtLink to="/confidentialite" class="hover:text-white/80 transition-colors">Confidentialité</NuxtLink>
          </div>
        </nav>
        <p class="text-white/50 text-xs">© 2026 RAW. Tous droits réservés.</p>
      </div>
    </footer>

  </div>
</template>
