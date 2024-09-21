<template>
  <div class="root">
    <div class="carousel-handle">
      <div v-if="loaded" class="carousel-wrap">
        <splide
          ref="splide"
          :options="slickOptions"
        >
          <splide-slide
            v-for="(item, index) in servicesList"
            :key="index"
          >
            <div class="item">
              <card
                :title="item.title"
                :desc="item.desc"
                :img="item.img"
                :button="$t('agencyLanding.services_button')"
              />
            </div>
          </splide-slide>
          <splide-slide>
            <div class="item">
              <div class="carousel-prop">
                <div />
              </div>
            </div>
          </splide-slide>
        </splide>
      </div>
    </div>
    <div class="floating-title">
      <v-container class="fixed-width">
        <div class="title">
          <title-icon
            :text="$t('agencyLanding.services_title')"
            icon="apps"
            extended
          />
          <nav class="arrow">
            <v-btn
              icon
              small
              aria-label="next"
              class="margin"
              @click="next()"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn
              icon
              small
              aria-label="prev"
              class="margin"
              @click="prev()"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </nav>
        </div>
      </v-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './services-style.scss';
</style>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import imgApi from '@/assets/images/imgAPI';
import Card from '../Cards/Default';
import TitleIcon from '../Title/WithIcon';

export default {
  components: {
    Card,
    TitleIcon,
    Splide,
    SplideSlide,
  },
  data() {
    return {
      loaded: false,
      slickOptions: {
        perPage: 4,
        perMove: 1,
        autoWidth: true,
        pagination: false,
        arrows: false,
        direction: 'ltr',
        reducedMotion: {
          speed: 500,
          rewindSpeed: 1000,
        },
        breakpoints: {
          1100: {
            perPage: 4,
          },
          800: {
            perPage: 3,
          },
          600: {
            perPage: 2,
          },
        },
      },
      servicesList: [
        {
          title: 'Title Search',
          desc: 'Conducting thorough title searches to verify property ownership, identify any existing liens, encumbrances, or title defects.',
          img: imgApi.services.search,
        },
        {
          title: 'Insurance Policies',
          desc: 'Offering title insurance policies to protect homebuyers and lenders against potential financial losses due to title issues.',
          img: imgApi.services.insurance,
        },
        {
          title: 'Escrow Services',
          desc: 'Facilitating escrow services to securely hold funds during the real estate transaction until all conditions are met.',
          img: imgApi.services.escrow,
        },
        {
          title: 'Title Clearance',
          desc: 'Assisting in resolving title issues, such as clearing unpaid liens or resolving ownership disputes, to ensure a clean title.',
          img: imgApi.services.clearance,
        },
        {
          title: 'Document Recording',
          desc: 'Submitting legal documents to the appropriate government offices for official recording and public recordation.',
          img: imgApi.services.recording,
        },
        {
          title: 'Property Reports',
          desc: 'Providing detailed property reports, including chain of title, tax information, and other relevant property details.',
          img: imgApi.services.property,
        },
        {
          title: 'Mobile Closings',
          desc: 'Offering mobile closing services for added convenience, allowing closings to take place at a location preferred by the parties involved.',
          img: imgApi.services.closing,
        },
        {
          title: 'Notary Services',
          desc: 'Providing licensed notary services for the notarization of important legal documents related to the real estate transaction.',
          img: imgApi.services.notary,
        },
      ],
    };
  },
  mounted() {
    this.loaded = true;
    const props = window.innerWidth > 1400 ? 1 : 2; // div.carousel-props length for screen < 1400px and (-1) for screen > 1400px
    const lastSlide = Math.floor(this.servicesList.length + props - this.slickOptions.perPage);

    setTimeout(() => {
      if (this.$vuetify.locale.isRtl) {
        this.slickOptions.direction = 'rtl';
      } else {
        this.slickOptions.direction = 'ltr';
      }

      if (window.innerWidth > 1200) {
        this.$refs.splide.go(lastSlide);
      }
    }, 100);
  },
  methods: {
    next() {
      this.$refs.splide.go('>');
    },
    prev() {
      this.$refs.splide.go('<');
    },
  },
};
</script>
