<template>
  <div class="parallax-wrap">
    <div v-if="loaded">
      <div class="banner inner-parallax">
        <div class="figure">
          <div>
            <scroll-parallax
              :speed="0"
              direction="y"
            >
              <div class="parallax-square parallax-primary" />
            </scroll-parallax>
          </div>
        </div>
      </div>
      <div class="about inner-parallax">
        <div class="figure">
          <div>
            <scroll-parallax
              :speed="0.25"
              direction="y"
            >
              <div class="parallax-square parallax-secondary" />
            </scroll-parallax>
          </div>
        </div>
        <div class="figure">
          <div>
            <scroll-parallax
              :speed="0.2"
              direction="y"
            >
              <div class="parallax-square parallax-primary" />
            </scroll-parallax>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './parallax-style.scss';
</style>

<script>
export default {
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    this.loaded = true;
  },
};
</script>
