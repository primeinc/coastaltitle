<template>
  <div class="hero-content">
    <hidden point="smUp">
      <figure class="mobile-cover">
        <img
          :src="cover"
          alt="cover"
        >
      </figure>
    </hidden>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <div class="banner-text">
            <div class="title">
              <h3 class="text-helper use-text-title">
                {{ $t('agencyLanding.banner_title') }}
              </h3>
            </div>
            <h5 class="subtitle use-text-subtitle">
              {{ $t('agencyLanding.banner_subtitle') }}
            </h5>
            <v-btn
              variant="outlined"
              size="large"
              color="secondary"
              class="button"
            >
              {{ $t('agencyLanding.banner_button') }}
              <v-icon class="icon">
                mdi-send
              </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col
          v-if="isTablet"
          md="6"
          cols="12"
          class="pa-6"
        >
          <div class="video-wrap">
            <div class="video-figure">
              <div class="inner-figure">
                <hidden point="mdDown">
                  <v-btn
                    v-if="play"
                    icon
                    text
                    class="btn-play"
                    @click="togglePause()"
                  >
                    <v-icon v-if="playCtrl">
                      mdi-pause
                    </v-icon>
                    <v-icon v-else>
                      mdi-play
                    </v-icon>
                  </v-btn>
                </hidden>
                <img
                  v-if="!play || isMobile"
                  :src="cover"
                  alt="cover"
                >
                <div class="overlay" />
                <div
                  v-if="yt.use"
                  class="video"
                >
                  <YouTube
                    v-if="isDesktop"
                    ref="youtube"
                    :src="videoId"
                    :vars="playerVars"
                    :width="1080"
                    :height="720"
                    @ready="playing"
                    @state-change="ended"
                  />
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import './banner-style.scss';
</style>

<script>
import Hidden from '../Hidden';
import imgAPI from '@/assets/images/imgAPI';
import youtube from '@/config/youtube';

export default {
  components: {
    Hidden,
  },
  data() {
    return {
      videoId: 'WRCB2QSrQQU',
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        showinfo: 0,
        mute: 1,
        origin: 'http://localhost:8001',
      },
      yt: youtube,
      play: false,
      playCtrl: true,
      cover: imgAPI.agency[0],
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    mdUp() {
      const mdUp = this.$vuetify.display.mdAndUp;
      return mdUp;
    },
    isDesktop() {
      const lgUp = this.$vuetify.display.lgAndUp;
      return lgUp;
    },
    isTablet() {
      const smUp = this.$vuetify.display.smAndUp;
      return smUp;
    },
    isMobile() {
      const mdDown = this.$vuetify.display.mdAndDown;
      return mdDown;
    },
  },
  methods: {
    playing() {
      this.play = true;
      this.playCtrl = true;
    },
    ended(val) {
      if (val.data === 0) {
        this.player.playVideo();
      }
    },
    togglePause() {
      this.playCtrl = !this.playCtrl;
      if (this.playCtrl) {
        this.player.playVideo();
      } else {
        this.player.pauseVideo();
      }
    },
  },
};
</script>
