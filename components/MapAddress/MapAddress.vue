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
                    <div class="icon-text">
                      <v-icon class="icon">
                        mdi-phone
                      </v-icon>
                      <a :href="'tel:' + office.phone">{{ formatPhone(office.phone) }}</a> <!-- Made phone clickable -->
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="email-col">
                    <div class="icon-text">
                      <v-icon class="icon">
                        mdi-email
                      </v-icon>
                      <a :href="'mailto:' + office.email">{{ office.email }}</a> <!-- Made email clickable -->
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <div class="icon-text">
                      <v-icon class="icon">
                        mdi-map-marker
                      </v-icon>
                      <a :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(office.address)" target="_blank">{{ office.address }}</a> <!-- Made address clickable -->
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="pa-6">
          <v-card class="map">
            <GoogleMap
              :api-key="googleMapsApiKey"
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
import { useRuntimeConfig } from '#app';
import TitleDeco from '../Title/WithDecoration';

export default {
  components: {
    TitleDeco,
    GoogleMap,
    MarkerCluster,
    Marker,
  },
  setup() {
    const config = useRuntimeConfig();
    const { googleMapsApiKey } = config.public;

    console.log('Google Maps API Key:', googleMapsApiKey); // Add this line

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
        email: 'ftlauderdale@coastaltitlellc.com', // Updated email
        address: '333 Las Olas Way #314, Fort Lauderdale, FL 33301',
      },
      {
        name: 'Tampa Office',
        phone: '(813) 213-3410',
        email: 'tampa@coastaltitlellc.com', // Updated email
        address: '550 N Reo St, Suite 300, Tampa, FL 33609',
      },
      {
        name: 'Miami Office',
        phone: '(305) 423-0091',
        email: 'miami@coastaltitlellc.com', // Updated email
        address: '350 S. Miami Ave., Suite A, Miami, FL 33130',
      },
    ];

    const formatPhone = (phone) => {
      const cleaned = ('' + phone).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
      return phone;
    };

    return {
      googleMapsApiKey,
      center,
      locations,
      offices,
      formatPhone,
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
