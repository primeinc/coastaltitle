<template>
  <v-menu
    v-model="open"
    :close-on-content-click="false"
    location="bottom"
    class="ma-0"
  >
    <template #activator="{ props }">
      <div class="setting">
        <v-btn
          :class="{ invert: invert, active: open }"
          v-bind="props"
          icon="mdi-cog"
        />
      </div>
    </template>
    <v-list class="popover ocean-var">
      <div class="mode-menu">
        <v-list-subheader>{{ $t('agencyLanding.header_theme') }}</v-list-subheader>
        <v-list-item>
          <div class="flex-menu">
            <span>
              {{ $t('agencyLanding.header_light') }}
            </span>
            <v-switch
              :model-value="isDark"
              class="switch-toggle"
              hide-details
              color="secondary"
              @change="switchDark()"
            />
            <span>
              {{ $t('agencyLanding.header_dark') }}
            </span>
          </div>
        </v-list-item>
      </div>
      <v-divider />
      <div class="lang-menu">
        <v-list-subheader>{{ $t('agencyLanding.header_language') }}</v-list-subheader>
        <v-list-item
          v-for="(lang, index) in langList"
          :key="index"
          :value="lang.code"
          :to="switchLocalePath(lang.code)"
          nuxt
          @click="switchRtl(lang.code)"
        >
          <template #prepend>
            <v-avatar class="flag">
              <i :class="lang.code" />
            </v-avatar>
          </template>
          <v-list-item-title class="lang-opt">
            {{ $t('common.'+lang.code) }}
          </v-list-item-title>
          <template #append>
            <v-icon
              v-if="lang.code === curLang"
              color="primary"
            >
              mdi-check
            </v-icon>
          </template>
        </v-list-item>
      </div>
    </v-list>
  </v-menu>
</template>

<style lang="scss" scoped>
@import './header-style.scss';
</style>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // To handle locale-based routing
import { toggleDark, setRtl } from '@/composables/uiTheme';

export default {
  props: {
    invert: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const isDark = ref(false);
    const isLoaded = ref(false);
    const curLang = ref(route.params.locale || 'en'); // Get locale from route or fallback to 'en'

    onMounted(() => {
      isLoaded.value = true;
      isDark.value = localStorage.getItem('luxiDarkMode') === 'dark';
    });

    // Function to toggle dark mode
    function switchDark() {
      isDark.value = !isDark.value;
      toggleDark();
    }

    // Function to switch locale and handle RTL/LTR changes
    function switchRtl(newLocale) {
      // Update the current language
      curLang.value = newLocale;
      document.documentElement.setAttribute('lang', newLocale);

      if (newLocale === 'ar') {
        setRtl(true);
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        setRtl(false);
        document.documentElement.setAttribute('dir', 'ltr');
      }

      // Navigate to the new locale-based path
      router.push({ path: `/${newLocale}${route.path}` });
    }

    return {
      isLoaded,
      isDark,
      curLang,
      switchDark,
      switchRtl,
    };
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    // Get the list of languages from Nuxt's $i18n
    langList() {
      return this.$i18n.locales;
    },
  },
};
</script>
