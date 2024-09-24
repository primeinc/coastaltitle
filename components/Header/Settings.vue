<template>
  <li>
    <v-btn
      :class="{ invert: invert }"
      class="menu-link"
      @click="toggleLanguage"
    >
      {{ $t('common.language_toggle') }}
    </v-btn>
  </li>
</template>

<style lang="scss" scoped>
@import './header-style.scss';
</style>

<script>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useLocalePath } from '#imports';

export default {
  props: {
    invert: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { locale } = useI18n();
    const router = useRouter();
    const localePath = useLocalePath();

    function toggleLanguage() {
      const newLocale = locale.value === 'en' ? 'es' : 'en';
      const path = localePath('/', newLocale);
      router.push(path);
    }

    return {
      toggleLanguage,
    };
  },
};
</script>
