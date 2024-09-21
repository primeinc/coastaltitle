<template>
  <div class="counter-wrap">
    <v-container class="fixed-width">
      <v-row
        justify="center"
        align="center"
      >
        <v-col md="4">
          <div class="counter-item">
            <div class="text">
              <h3 class="use-text-title">
                🚀
              </h3>
              <p class="use-text-subtitle">
                {{ $t('agencyLanding.about_turnaround') }}
              </p>
            </div>
          </div>
        </v-col>
        <v-col md="4">
          <div class="counter-item">
            <div class="text">
              <h3 class="use-text-title">
                🎯
              </h3>
              <p class="use-text-subtitle">
                {{ $t('agencyLanding.about_accuracy') }}
              </p>
            </div>
          </div>
        </v-col>
        <v-col md="4">
          <div class="counter-item">
            <div class="text">
              <h3 class="use-text-title">
                🏖️
              </h3>
              <p class="use-text-subtitle">
                {{ $t('agencyLanding.about_satisfaction') }}
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import './counter-style.scss';
</style>
