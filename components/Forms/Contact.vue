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

      <div class="office-locations mt-6">
        <v-row justify="center">
          <v-col v-for="(office, index) in offices" :key="index" cols="12" sm="6" md="4" class="d-flex justify-center">
            <v-card class="office-card" elevation="2" max-width="350">
              <v-card-title class="text-center pb-0">
                {{ office.name }}
              </v-card-title>
              <v-card-text class="pt-2">
                <p class="text-center mb-2">
                  <a :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(office.address)" target="_blank" class="address-link">
                    {{ office.address }}
                  </a>
                </p>
                <p class="text-center mb-2">
                  <a :href="'tel:' + office.phone" class="phone-link">{{ formatPhone(office.phone) }}</a>
                </p>
                <p class="text-center mb-2">
                  <a :href="'mailto:' + office.email" class="email-link">{{ office.email }}</a>
                </p>
              </v-card-text>
              <v-card-actions class="justify-center pb-4">
                <v-btn
                  color="primary"
                  variant="outlined"
                  class="call-now-btn"
                  @click="callOffice(office.phone)"
                >
                  <span class="phone-icon">📞</span> Call Now
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div class="additional-emails mt-6">
        <v-row justify="center">
          <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
            <v-card class="email-card" elevation="2" max-width="350">
              <v-card-title class="text-center pb-0">
                Additional Contacts
              </v-card-title>
              <v-card-text class="pt-2">
                <p v-for="(email, index) in additionalEmails" :key="index" class="text-center mb-2">
                  <a :href="'mailto:' + email" class="email-link">{{ email }}</a>
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div class="divider-container my-8">
        <p class="divider-text text-center font-weight-bold">
          Or write us a message below...
        </p>
        <v-divider />
      </div>

      <!-- Contact Form -->
      <div class="form">
        <v-form ref="form" v-model="valid">
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

.office-locations, .additional-emails {
  margin-bottom: $spacing6;
}

.office-card, .email-card {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.v-card-title {
  font-size: 1.25rem;
  font-weight: 500;
}

.v-card-text {
  flex-grow: 1;
}

.call-now-btn {
  transition: all 0.3s ease;
  transform: translateY(0);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px 0 rgba(0,0,0,0.12);
  }

  .phone-icon {
    margin-right: 4px;
  }
}

.email-link, .phone-link, .address-link {
  color: $palette-primary-main;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: $palette-primary-dark;
    text-decoration: underline;
  }
}

.additional-emails {
  display: flex;
  justify-content: center;
}

.address-link {
  // Remove the white-space: pre-line; rule
}

.v-divider {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.divider-container {
  position: relative;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.divider-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff; // Or any color that matches your background
  padding: 0 16px;
  color: #000000; // Or any color that provides good contrast
  z-index: 1;
}

.v-divider {
  margin-top: 12px; // Adjust this value to fine-tune the text position relative to the divider
}
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
      offices: [
        {
          name: 'Ft Lauderdale Office',
          phone: '(954) 519-2477',
          email: 'ftlauderdale@coastaltitlellc.com',
          address: '333 Las Olas Way #314, Fort Lauderdale, FL 33301',
        },
        {
          name: 'Tampa Office',
          phone: '(813) 213-3410',
          email: 'tampa@coastaltitlellc.com',
          address: '550 N Reo St, Suite 300, Tampa, FL 33609',
        },
        {
          name: 'Miami Office',
          phone: '(305) 423-0091',
          email: 'miami@coastaltitlellc.com',
          address: '350 S. Miami Ave., Suite A, Miami, FL 33130',
        },
      ],
      additionalEmails: [
        'docs@coastaltitlellc.com',
        'title@coastaltitlellc.com',
      ],
      selectedOffice: null,
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    callOffice(phone) {
      window.open(`tel:${phone}`, '_self'); // Opens the phone dialer
    },
    formatPhone(phone) {
      const cleaned = ('' + phone).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
      return phone;
    },
  },
};
</script>
