<script setup lang="ts">
useSeoMeta({
  title: 'Mentions légales — RAW',
  robots: 'noindex',
})
</script>

<template>
  <div class="bg-[#090909] text-white min-h-screen font-sans">
    <div class="max-w-2xl mx-auto px-6 py-24">
      <a href="/" class="text-white/30 hover:text-white/60 text-sm transition-colors mb-10 inline-block">← Retour</a>

      <h1 class="font-headline text-3xl font-bold mb-10">Mentions légales</h1>

      <div class="prose prose-invert prose-sm max-w-none space-y-8 text-white/60 leading-relaxed">

        <section>
          <h2 class="text-white font-semibold text-base mb-2">Éditeur du site</h2>
          <p>
            Ce site est édité par :<br>
            <strong class="text-white/80">Mattéo Houillon El Belqasmi</strong><br>
            Paris, France<br>
            Email : <a href="mailto:contact@joinraw.fr"
              class="text-yellow-500 hover:text-yellow-400">contact@joinraw.fr</a>
          </p>
        </section>

        <section>
          <h2 class="text-white font-semibold text-base mb-2">Hébergement</h2>
          <p>
            Ce site est hébergé par :<br>
            <strong class="text-white/80">Netlify, Inc.</strong><br>
            512 2nd Street, Suite 200<br>
            San Francisco, CA 94107, États-Unis<br>
            <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer"
              class="text-yellow-500 hover:text-yellow-400">netlify.com</a>
          </p>
        </section>

        <section>
          <h2 class="text-white font-semibold text-base mb-2">Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments constituant ce site (textes, visuels, logo, code) est la propriété exclusive de
            l'éditeur.
            Toute reproduction, même partielle, est interdite sans autorisation préalable.
          </p>
        </section>

        <section>
          <h2 class="text-white font-semibold text-base mb-2">Collecte de données</h2>
          <p>
            Ce site collecte uniquement les adresses email des personnes souhaitant rejoindre la liste d'attente de la
            bêta RAW.
            Pour plus d'informations, consulte notre <a href="/confidentialite"
              class="text-yellow-500 hover:text-yellow-400">politique de confidentialité</a>.
          </p>
        </section>

      </div>
    </div>
  </div>
</template>
