<template>
  <div>
    <decoration />
    <contact />
  </div>
</template>

<script>
import Contact from '@/components/Forms/Contact';
import Decoration from '@/components/Forms/Decoration';
import brand from '@/assets/text/brand';
import { defineNuxtComponent } from '#app';

export default defineNuxtComponent({
  components: {
    Contact,
    Decoration,
  },
  head() {
    return {
      title: brand.agency.name + ' - Contact',
    };
  },
});
</script>
