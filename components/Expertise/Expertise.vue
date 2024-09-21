<template>
  <svg
    fill="#cccccc"
    width="845px"
    height="1099px"
    class="background base"
  >
    <use xlink:href="/images/decoration/square-deco-primary.svg#square" />
  </svg>
  <svg
    fill="#cccccc"
    width="845px"
    height="1099px"
    class="background front"
  >
    <use xlink:href="/images/decoration/square-deco-primary.svg#square" />
  </svg>
  <div class="root">
    <v-container>
      <v-row class="spacing8">
        <v-col v-if="isDesktop" cols="12" lg="1" />
        <v-col cols="12" md="4">
          <div class="title-deco">
            <svg
              v-if="isDesktop"
              fill="#cccccc"
              width="845px"
              height="1099px"
              class="decoration"
            >
              <use xlink:href="/images/agency/wave_decoration.svg#main" />
            </svg>
            <title-deco :text="$t('agencyLanding.expertise_title')" />
          </div>
          <div>
            <div
              data-aos-offset="500"
              data-aos="zoom-in"
              data-aos-anchor-placement="center center"
              data-aos-delay="100"
              data-aos-duration="300"
              class="parallax-wrap"
            >
              <div v-if="loaded" class="parallax-wrap">
                <kinesis-container
                  :duration="1500"
                  easing="cubic-bezier(0.23, 1, 0.32, 1)"
                >
                  <kinesis-element
                    :strength="15"
                    type="translate"
                    tag="div"
                  >
                    <span class="icon-green" />
                  </kinesis-element>
                  <kinesis-element
                    :strength="10"
                    type="translate"
                    tag="div"
                  >
                    <span class="icon-violet" />
                  </kinesis-element>
                  <kinesis-element
                    :strength="30"
                    type="translate"
                    tag="div"
                  >
                    <span class="icon-blue" />
                  </kinesis-element>
                </kinesis-container>
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          lg="7"
          md="8"
        >
          <h4 class="title-default use-text-subtitle">
            {{ $t('agencyLanding.expertise_subtitle') }}
          </h4>
          <p class="desc use-text-paragraph">
            {{ $t('agencyLanding.expertise_paragraph') }}
          </p>
          <hidden point="xsDown">
            <div v-if="loaded" class="running-tag">
              <splide :options="slickOptions">
                <splide-slide
                  v-for="(group, indexGroup) in expertiseList"
                  :key="indexGroup"
                >
                  <div class="tag-group">
                    <span
                      v-for="(item, indexChild) in group"
                      :key="indexChild"
                      class="tag-item"
                    >
                      {{ item }}
                    </span>
                  </div>
                </splide-slide>
              </splide>
            </div>
          </hidden>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import './expertise-style.scss';
@import '../Title/title-style.scss';
</style>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import AOS from 'aos';
import TitleDeco from '../Title/WithDecoration';
import Hidden from '../Hidden';

export default {
  components: {
    TitleDeco,
    Hidden,
    Splide,
    SplideSlide,
  },
  data() {
    return {
      loaded: false,
      slickOptions: {
        direction: 'ttb',
        height: '10rem',
        type: 'loop',
        focus: 'center',
        autoplay: true,
        perPage: 3,
        perMove: 2,
        interval: 5000,
        pagination: false,
        arrows: false,
        reducedMotion: {
          speed: 500,
          rewindSpeed: 1000,
          autoplay: true,
        },
      },
      expertiseList: [
        ['Title Insurance Solutions', 'Risk Mitigation', 'Compliance Expertise'],
        ['Escrow & Closing Services', 'Transaction Management', 'Secure Disbursements'],
        ['Underwriting Services', 'Title Searches', 'Clearance Expertise'],
        ['Market-Specific Expertise', 'Local Regulations', 'Community Partnerships'],
        ['Client Retention Strategies', 'Long-Term Client Relations', 'Post-Closing Support'],
        ['Document Recording', 'Title Curative Services', 'Lender Support'],
        ['Foreclosure Services', 'Digital Closing Solutions', 'Title Insurance Policy Review'],
        ['Construction Loan Services', 'Zoning and Land Use Analysis', 'Lien Searches'],
        ['Real Estate Settlement Solutions', 'Investor Services', 'Trust and Estate Title Transfers'],
      ],

    };
  },
  computed: {
    isDesktop() {
      const lgUp = this.$vuetify.display.lgAndUp;
      return lgUp;
    },
  },
  mounted() {
    this.loaded = true;
    AOS.init({
      once: true,
    });
  },
};
</script>
