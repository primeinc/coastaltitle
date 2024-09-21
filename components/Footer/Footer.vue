<template>
  <v-container class="max-lg footer">
    <v-row class="spacing4">
      <v-col
        class="pa-4"
        md="3"
        cols="12"
      >
        <div class="logo">
          <img
            :src="logo"
            alt="logo"
          >
          <h6 class="text-h6">
            {{ brand.agency.projectName }}
          </h6>
        </div>
        <p class="footer-desc pb-2">
          {{ $t('agencyLanding.footer_paragraph') }}
        </p>
        <p v-if="isDesktop" class="body-2">
          &copy;&nbsp;
          {{ brand.agency.footerText }}
        </p>
      </v-col>
      <v-col
        class="pa-6"
        md="6"
        cols="12"
      >
        <v-expansion-panels v-if="isMobile" class="accordion-root">
          <v-expansion-panel
            v-for="(footer, index) in footers"
            :key="index"
            class="accordion-content"
          >
            <v-expansion-panel-title>
              <h6 class="text-h6">
                {{ footer.title }}
              </h6>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ul>
                <li
                  v-for="(item, index) in footer.description"
                  :key="index"
                >
                  <nuxt-link :to="footer.link[index]">
                    {{ item }}
                  </nuxt-link>
                </li>
              </ul>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-row v-if="isDesktop" justify="space-around">
          <v-col
            v-for="(footer, index) in footers"
            :key="index"
            sm="3"
            cols="12"
            class="px-lg-4 px-0 site-map-item"
          >
            <h6 class="title-nav">
              {{ footer.title }}
            </h6>
            <ul>
              <li
                v-for="(item, index) in footer.description"
                :key="index"
              >
                <nuxt-link :to="footer.link[index]">
                  {{ item }}
                </nuxt-link>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        md="3"
        cols="12"
        class="pa-4"
      >
        <div class="socmed">
          <v-btn
            text
            icon
            class="button"
          >
            <span class="ion-logo-facebook icon" />
          </v-btn>
          <v-btn
            text
            icon
            class="button"
          >
            <span class="ion-logo-twitter  icon" />
          </v-btn>
          <v-btn
            text
            icon
            class="button"
          >
            <span class="ion-logo-instagram icon" />
          </v-btn>
          <v-btn
            text
            icon
            class="button"
          >
            <span class="ion-logo-linkedin icon" />
          </v-btn>
        </div>
        <v-select
          v-model="lang"
          :items="langList"
          :value="curLang"
          variant="outlined"
          class="select-lang"
          color="primary"
          prepend-inner-icon="mdi-web"
          @update:model-value="switchLang(lang)"
        />
      </v-col>
    </v-row>
    <p v-if="isMobile" class="body-2 text-center">
      &copy;&nbsp;
      {{ brand.agency.footerText }}
    </p>
  </v-container>
</template>

<style scoped lang="scss">
@import './footer-style';
</style>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { setRtl } from '@/composables/uiTheme';
import logo from '@/assets/images/agency-logo.svg';
import brand from '@/assets/text/brand';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    // Access the current locale via the Nuxt $i18n property
    const lang = ref(route.params.locale || 'en'); // Fallback to 'en' if no locale

    // Switch language and handle RTL setting
    function switchLang(newLocale) {
      lang.value = newLocale;

      // Update the document attributes for RTL/LTR based on the locale
      document.documentElement.setAttribute('lang', newLocale);

      if (newLocale === 'ar') {
        setRtl(true);
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        setRtl(false);
        document.documentElement.setAttribute('dir', 'ltr');
      }

      // Navigate to the locale-based path
      const newPath = `/${newLocale}${route.path}`;
      router.push(newPath);
    }

    return {
      lang,
      switchLang,
    };
  },
  data() {
    return {
      logo,
      brand,
      footers: [
        {
          title: 'Company',
          description: ['Team', 'History', 'Contact us', 'Locations'],
          link: ['#team', '#history', '#contact-us', '#locations'],
        },
        {
          title: 'Resources',
          description: [
            'Resource',
            'Resource name',
            'Another resource',
            'Final resource',
          ],
          link: [
            '#resource',
            '#resource-name',
            '#another-resource',
            '#final-resource',
          ],
        },
        {
          title: 'Legal',
          description: ['Privacy policy', 'Terms of use'],
          link: ['#privacy-policy', '#terms-of-use'],
        },
      ],
    };
  },
  computed: {
    isDesktop() {
      return this.$vuetify.display.mdAndUp;
    },
    isMobile() {
      return this.$vuetify.display.smAndDown;
    },
    langList() {
      // Access locales from Nuxt's i18n configuration
      return this.$i18n.locales.map(locale => ({
        title: this.$t('common.' + locale.code), // Translate locale name
        value: locale.code, // Use locale code
      }));
    },
  },
};
</script>
