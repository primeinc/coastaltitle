<template>
  <div class="root">
    <v-container class="fixed-width">
      <v-row class="spacing6">
        <v-col v-if="isDesktop" cols="12" md="1" class="pa-6" />
        <v-col cols="12" lg="5" md="6" class="pa-6">
          <title-deco :text="$t('agencyLanding.office_title')" />
          <div class="block">
            <div
              data-aos="fade-left"
              data-aos-offset="450"
              data-aos-delay="300"
              data-aos-duration="300"
            >
              <v-card class="paper">
                <h6 class="text-h6">
                  {{ $t('agencyLanding.office_head') }}
                </h6>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-icon class="icon">
                      mdi-phone
                    </v-icon>
                    <span>+123 456 78 91</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-icon class="icon">
                      mdi-email
                    </v-icon>
                    <span>hello@luxi.com</span>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-icon class="icon">
                      mdi-map-marker
                    </v-icon>
                    Lorem ipsum street no.14 Block A
                  </v-col>
                </v-row>
              </v-card>
            </div>
            <div
              data-aos="fade-left"
              data-aos-offset="450"
              data-aos-delay="500"
              data-aos-duration="300"
            >
              <v-card class="paper">
                <h6 class="text-h6">
                  {{ $t('agencyLanding.office_branch') }}
                </h6>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-icon class="icon">
                      mdi-phone
                    </v-icon>
                    <span>+98 765 432 10</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-icon class="icon">
                      mdi-email
                    </v-icon>
                    <span>hello@luxi.com</span>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-icon class="icon">
                      mdi-map-marker
                    </v-icon>
                    Lorem ipsum street Block C - Vestibullum Building
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="pa-6">
          <v-card class="map">
            <GoogleMap
              :zoom="5"
              :center="center"
              style="width: 100%; height: 100%"
            >
              <MarkerCluster>
                <Marker
                  v-for="(location, i) in locations"
                  :key="i"
                  :options="{ position: location }"
                />
              </MarkerCluster>
            </GoogleMap>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import './map-address-style.scss';
</style>

<script>
import AOS from 'aos';
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map';
import TitleDeco from '../Title/WithDecoration';

export default {
  components: {
    TitleDeco,
    GoogleMap,
    MarkerCluster,
    Marker,
  },
  setup() {
    const center = { lat: -33.718234, lng: 150.363181 };
    const locations = [
      { lat: -31.56391, lng: 147.154312 },
      { lat: -33.718234, lng: 150.363181 },
    ];

    return {
      center,
      locations,
    };
  },
  computed: {
    isDesktop() {
      const lgUp = this.$vuetify.display.lgAndUp;
      return lgUp;
    },
  },
  mounted() {
    AOS.init({
      once: true,
    });
  },
};
</script>
