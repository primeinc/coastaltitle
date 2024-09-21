<template>
  <div class="form-wrap">
    <v-snackbar
      v-model="snackbar"
      :timeout="4000"
      top
      right
      class="notification"
    >
      <div class="action">
        Message Sent
      </div>
      <v-btn
        text
        icon
        @click="snackbar = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <hidden point="mdUp">
      <div class="logo logo-header">
        <nuxt-link :to="localePath(routeLink.agency.home)">
          <img :src="logo" alt="logo">
        </nuxt-link>
      </div>
    </hidden>
    <hidden point="smDown">
      <v-btn
        :to="localePath(routeLink.agency.home)"
        icon
        variant="text"
        class="backtohome"
      >
        <i class="ion-ios-home-outline" />
        <i class="ion-ios-arrow-round-back-outline" />
      </v-btn>
    </hidden>
    <v-container class="max-md">
      <h3 class="use-text-title pb-3 text-center">
        {{ $t('common.contact_title') }}
      </h3>
      <p class="desc use-text-subtitle2 text-center">
        {{ $t('common.contact_subtitle') }}
      </p>
      <div class="form">
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-row class="spacing6">
            <v-col cols="12" sm="6" class="pa-6">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :label="$t('common.form_name')"
                variant="underlined"
                color="primary"
                class="input"
                required
              />
            </v-col>
            <v-col cols="12" sm="6" class="pa-6">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                :label="$t('common.form_email')"
                variant="underlined"
                class="input"
                color="primary"
                required
              />
            </v-col>
            <v-col cols="12" sm="6" class="pa-6">
              <v-text-field
                v-model="phone"
                :label="$t('common.form_phone')"
                variant="underlined"
                class="input"
                color="primary"
              />
            </v-col>
            <v-col cols="12" sm="6" class="pa-6">
              <v-text-field
                v-model="company"
                :label="$t('common.form_company')"
                variant="underlined"
                class="input"
                color="primary"
              />
            </v-col>
            <v-col cols="12" class="pa-6">
              <v-textarea
                v-model="message"
                :label="$t('common.form_message')"
                rows="6"
                variant="underlined"
                class="input"
                color="primary"
              />
            </v-col>
          </v-row>
          <div class="btn-area">
            <div class="form-control-label">
              <v-checkbox
                v-model="checkbox"
                color="primary"
                :rules="[v => !!v || 'You must agree to continue!']"
                :label="$t('common.form_terms')"
                required
                hide-details
              />
              <a href="#" class="mx-3">
                {{ $t('common.form_privacy') }}
              </a>
            </div>
            <v-btn
              color="primary"
              variant="outlined"
              size="large"
              @click="validate"
            >
              {{ $t('common.form_send') }}
              <v-icon class="right-icon">
                mdi-send
              </v-icon>
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import './form-style.scss';
@import '../Title/title-style.scss';
</style>

<script>
import logo from '@/assets/images/agency-logo.svg';
import brand from '@/assets/text/brand';
import link from '@/assets/text/link';
import { useLocalePath } from '#imports';
import Hidden from '../Hidden';

export default {
  components: {
    Hidden,
  },
  setup() {
    const localePath = useLocalePath();
    return {
      localePath,
    };
  },
  data() {
    return {
      valid: true,
      snackbar: false,
      name: '',
      nameRules: [v => !!v || 'Name is required'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      phone: '',
      company: '',
      message: '',
      checkbox: false,
      logo,
      brand,
      routeLink: link,
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
  },
};
</script>
