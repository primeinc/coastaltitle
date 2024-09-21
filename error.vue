<template>
  <theme-wrapper :theme="theme">
    <v-app>
      <div>
        <main-container invert>
          <Error
            :error-code="errObj?.statusCode || 500"
            :text="$t('common.404')"
          />
        </main-container>
      </div>
    </v-app>
  </theme-wrapper>
</template>

<script>
import brand from './assets/text/brand';
import ThemeWrapper from './components/ThemeWrapper';
import MainContainer from './components/MainContainer';
import Error from './components/Error';
import theme from '../config/theme'; // Import the theme configuration
import { useHead, useError, defineNuxtComponent } from '#app';

export default defineNuxtComponent({
  components: {
    MainContainer,
    ThemeWrapper,
    Error,
  },
  setup() {
    const error = useError();
    const errObj = error.value || {}; // Ensure errObj is always an object
    if (process.client && process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      // console.log(errObj);
    }
    useHead({
      title: errObj.statusCode === 404
        ? brand.agency.name + ' - Not Found'
        : brand.agency.name + ' - An error occurred',
    });

    return {
      theme, // Return the theme to use in the template
      errObj,
    };
  },
});
</script>
