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
          title: 'Lorem Ipsum',
          desc:
            'Proin ac arcu nisl. Duis eu molestie lectus. Nam quis mauris faucibus, aliquet elit eu, rhoncus ipsum.',
          img: imgApi.agency[2],
        },
        {
          title: 'Etiam rhoncus',
          desc:
            'Proin quis pellentesque dui. Ut sed leo neque. Nullam aliquet iaculis neque a commodo.',
          img: imgApi.agency[3],
        },
        {
          title: 'Duis fermentum',
          desc:
            'Quisque consectetur lectus vel orci porttitor gravida ac eu erat. Nullam accumsan nibh tortor.',
          img: imgApi.agency[4],
        },
        {
          title: 'Lorem Ipsum',
          desc:
            'Proin ac arcu nisl. Duis eu molestie lectus. Nam quis mauris faucibus, aliquet elit eu, rhoncus ipsum.',
          img: imgApi.agency[2],
        },
        {
          title: 'Etiam rhoncus',
          desc:
            'Proin quis pellentesque dui. Ut sed leo neque. Nullam aliquet iaculis neque a commodo.',
          img: imgApi.agency[3],
        },
        {
          title: 'Duis fermentum',
          desc:
            'Quisque consectetur lectus vel orci porttitor gravida ac eu erat. Nullam accumsan nibh tortor.',
          img: imgApi.agency[4],
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
