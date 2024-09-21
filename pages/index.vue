<template>
  <div id="home-container">
    <main-container nav-scroll>
      <square-parallax />
      <section id="home">
        <video-banner />
      </section>
      <section id="about" :class="[isTablet ? 'space-top-short' : 'space-top']">
        <about />
      </section>
      <dots-parallax />
      <section id="services" class="space-top">
        <services />
      </section>
      <section id="our-expertise" :class="[isTablet ? 'space-top-short' : 'space-top']">
        <expertise />
      </section>
      <section id="testimonials" :class="[isMobile ? 'space-top-short' : 'space-top']">
        <testimonials />
      </section>
      <section id="case-studies">
        <case-studies />
      </section>
      <section id="call-to-action" class="space-top-short">
        <call-action />
      </section>
      <section id="address" class="space-top-short">
        <map-address />
      </section>
      <hidden point="mdDown">
        <page-nav />
      </hidden>
      <hidden point="mdDown">
        <notification />
      </hidden>
    </main-container>
  </div>
</template>

<style scoped lang="scss">
  @function section-margin($margin) {
    @return $margin * 20;
  }
  .space-top {
    margin-top: section-margin($spacing1);
    @include breakpoints-down(md) {
      margin-top: section-margin(6px);
    }
    @include breakpoints-down(xs) {
      margin-top: section-margin($spacing1 * 0.5);
    }
  }
  .space-bottom-short {
    margin-bottom: section-margin($spacing1 * 0.5);
  }
  .space-top-short {
    margin-top: section-margin($spacing1 * 0.5);
  }
  .container-wrap {
    overflow: hidden;
    @include breakpoints-up(md) {
      padding-top: $spacing6;
    }
    section {
      position: relative;
    }
  }
</style>

<script>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import MainContainer from '@/components/MainContainer';
import SquareParallax from '@/components/Parallax/Square';
import VideoBanner from '@/components/VideoBanner';
import About from '@/components/About';
import Services from '@/components/Services';
import Expertise from '@/components/Expertise';
import Testimonials from '@/components/Testimonials';
import CaseStudies from '@/components/CaseStudies';
import CallAction from '@/components/CallAction';
import MapAddress from '@/components/MapAddress';
import Hidden from '@/components/Hidden';
import PageNav from '@/components/PageNav';
import Notification from '@/components/Notification';
import DotsParallax from '@/components/Parallax/Dots';
import brand from '@/assets/text/brand';
import { defineNuxtComponent, useRouter, useCookie } from '#app';

export default defineNuxtComponent({
  components: {
    MainContainer,
    SquareParallax,
    DotsParallax,
    VideoBanner,
    About,
    Services,
    Expertise,
    Testimonials,
    CaseStudies,
    CallAction,
    MapAddress,
    PageNav,
    Hidden,
    Notification,
  },
  setup() {
    // push route to the stored cookie languages only for index page
    const router = useRouter();
    const storedLang = useCookie('i18n_redirected');
    const i18nLocale = useI18n();

    const defaultLocale = '/' + i18nLocale.fallbackLocale.value;
    onMounted(() => {
      const rootUrl = document.location.pathname === '/' || document.location.pathname === defaultLocale;
      if (storedLang.value && rootUrl) {
        router.push({ path: `/${storedLang.value}` });
      }
    });
  },
  head() {
    return {
      title: brand.agency.name + ' - Home Page',
    };
  },
  computed: {
    isTablet() {
      const mdDown = this.$vuetify.display.mdAndDown;
      return mdDown;
    },
    isMobile() {
      const smDown = this.$vuetify.display.smAndDown;
      return smDown;
    },
  },
});
</script>
