<template>
  <div class="root">
    <v-container class="fixed-width">
      <v-row class="spacing6">
        <v-col v-if="isDesktop" cols="12" md="1" class="pa-6" />
        <v-col cols="12" lg="5" md="6" class="pa-6">
          <title-deco :text="$t('agencyLanding.office_title')" />
          <div class="block">
            <div
              v-for="(office, index) in offices"
              :key="index"
              :data-aos="'fade-left'"
              :data-aos-offset="200"
              :data-aos-delay="300 + index * 200"
              data-aos-duration="300"
            >
              <v-card class="paper">
                <h6 class="text-h6">
                  {{ $t(office.name) }}
                </h6>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-icon class="icon">
                      mdi-phone
                    </v-icon>
                    <span>{{ office.phone }}</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-icon class="icon">
                      mdi-email
                    </v-icon>
                    <span>{{ office.email }}</span>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-icon class="icon">
                      mdi-map-marker
                    </v-icon>
                    {{ office.address }}
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="pa-6">
          <v-card class="map">
            <GoogleMap
              :zoom="7"
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
    const center = { lat: 27.9944024, lng: -81.7602544 }; // Centered around Florida
    const locations = [
      { lat: 26.122439, lng: -80.137317 }, // Ft Lauderdale Office
      { lat: 27.950575, lng: -82.457178 }, // Tampa Office
      { lat: 25.761680, lng: -80.191790 }, // Miami Office
    ];
    const offices = [
      {
        name: 'Ft Lauderdale Office',
        phone: '(954) 519-2477',
        email: 'title@coastaltitlellc.com',
        address: '333 Las Olas Way #314, Fort Lauderdale, FL 33301',
      },
      {
        name: 'Tampa Office',
        phone: '813-213-3410',
        email: 'title@coastaltitlellc.com',
        address: '550 N Reo St, Suite 300, Tampa, FL 33609',
      },
      {
        name: 'Miami Office',
        phone: '(305) 423-0091',
        email: 'title@coastaltitlellc.com',
        address: '350 S. Miami Ave., Suite A, Miami, FL 33130',
      },
    ];

    return {
      center,
      locations,
      offices,
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
