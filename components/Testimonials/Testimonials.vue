<template>
  <div class="root">
    <square-parallax :loaded="loaded" />
    <div v-if="loaded" class="carousel">
      <splide
        ref="splide"
        :options="slickOptions"
      >
        <splide-slide
          v-for="(item, index) in testiContent"
          :key="index"
          class="item"
        >
          <testimonial-card
            :avatar="item.avatar"
            :title="item.title"
            :name="item.name"
            :text="item.text"
            :star="item.rating"
          />
        </splide-slide>
        <splide-slide class="item">
          <div class="item-props-last" />
        </splide-slide>
      </splide>
    </div>
    <div class="floating-title">
      <v-container class="fixed-width">
        <div class="title">
          <title-icon
            :text="$t('agencyLanding.testimonial_title')"
            icon="format-quote-close"
          />
        </div>
      </v-container>
    </div>
    <company-logo />
  </div>
</template>

<style lang="scss" scoped>
@import './testi-style.scss';
</style>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import imgAPI from '@/assets/images/imgAPI';
import TestimonialCard from '../Cards/Testimonial';
import TitleIcon from '../Title/WithIcon';
import CompanyLogo from '../CompanyLogo';
import SquareParallax from '../Parallax/SingleSquare';

export default {
  components: {
    Splide,
    SplideSlide,
    TestimonialCard,
    TitleIcon,
    CompanyLogo,
    SquareParallax,
  },
  data() {
    return {
      loaded: false,
      testiContent: [
        {
          text: 'The team at Coastal Title Solutions has been a game changer for me. I needed a title company that could turn around commitments and closing packages with speed and accuracy, and they delivered.',
          avatar: imgAPI.avatar[9],
          name: 'Ken Pozek',
          title: 'Keller Williams Realty',
          rating: 5,
        },
        {
          text: 'For over 20 years, Coastal Title Solutions has consistently adapted to the market and delivered lightning-fast updates and closing packages. Their team always out-performs the competition.',
          avatar: imgAPI.avatar[2],
          name: 'Troy J. Fairbanks',
          title: 'First Merchants Bank',
          rating: 5,
        },
        {
          text: 'Coastal Title has provided first-class service for 12 years. They helped develop our processes and always saved the day when we needed it most. Partner with them today!',
          avatar: imgAPI.avatar[1],
          name: 'Jeffrey M. Levine',
          title: 'Senior VP, Level One Bank',
          rating: 5,
        },
        {
          text: 'Coastal Title consistently delivers the professionalism and accountability I expect. They make my life easier with their wide coverage and exceptional service.',
          avatar: imgAPI.avatar[8],
          name: 'Rick Richter',
          title: 'EVP, Cross Country Mortgage',
          rating: 5,
        },
      ],
      slickOptions: {
        pagination: true,
        speed: 500,
        perPage: 4,
        arrows: false,
        perMove: 1,
        autoWidth: true,
        direction: 'ltr',
        reducedMotion: {
          speed: 500,
          rewindSpeed: 1000,
        },
        breakpoints: {
          1100: {
            perPage: 4,
            autoWidth: false,
            perMove: 1,
            rewind: true,
            pagination: true,
          },
          800: {
            perPage: 3,
          },
          600: {
            autoWidth: true,
            perPage: 1,
          },
        },
      },
    };
  },
  mounted() {
    this.loaded = true;
    const props = window.innerWidth > 1400 ? 1 : 2; // div.carousel-props length for screen < 1400px and (-1) for screen > 1400px
    const lastSlide = Math.floor(this.testiContent.length + props - this.slickOptions.perPage);

    setTimeout(() => {
      if (this.$vuetify.locale.isRtl) {
        this.slickOptions.direction = 'rtl';
      } else {
        this.slickOptions.direction = 'ltr';
      }

      if (window.innerWidth > 1279) {
        this.$refs.splide.go(lastSlide);
      }
    }, 100);
  },
};
</script>
