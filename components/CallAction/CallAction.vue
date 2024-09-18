<template>
  <svg
    fill="cccccc"
    width="845px"
    height="1099px"
    class="background base"
  >
    <use xlink:href="/images/decoration/square-deco-primary.svg#square" />
  </svg>
  <svg
    fill="cccccc"
    width="845px"
    height="1099px"
    class="background front"
  >
    <use xlink:href="/images/decoration/square-deco-primary.svg#square" />
  </svg>
  <v-container :class="{ 'fixed-width': mdUp }">
    <div class="root">
      <v-card class="paper">
        <v-row align="center" no-gutters>
          <v-col cols="12" md="9">
            <h4 class="text-h4 pb-2">
              {{ $t('agencyLanding.cta_title') }}
            </h4>
            <p>
              {{ $t('agencyLanding.cta_subtitle') }}
            </p>
          </v-col>
          <v-col cols="12" md="3">
            <v-row align="center">
              <v-btn
                size="large"
                variant="outlined"
                color="secondary"
                :to="localePath('/contact')"
                class="button"
              >
                {{ $t('agencyLanding.cta_btn') }}
                <v-icon class="right-icon">
                  mdi-send
                </v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
@import './action-style.scss';
</style>

<script>
import { useLocalePath } from '#imports';

export default {
  setup() {
    const localePath = useLocalePath();
    return {
      localePath,
    };
  },
  computed: {
    mdUp() {
      const mdUp = this.$vuetify.display.mdAndUp;
      return mdUp;
    },
  },
};
</script>
