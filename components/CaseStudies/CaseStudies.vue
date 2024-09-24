<template>
  <vue-easy-lightbox
    v-if="loaded"
    :visible="visible"
    :imgs="imgs"
    :index="index"
    @hide="handleHide"
  />
  <div class="root">
    <v-container :class="{ 'fixed-width': mdUp }">
      <div>
        <v-row class="spacing6">
          <v-col cols="12" md="3" class="pa-6">
            <div
              data-aos-offset="500"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="300"
            >
              <div class="side-filter">
                <h4 class="title-primary">
                  {{ $t('agencyLanding.case_title') }}
                </h4>
                <v-list class="nav">
                  <v-list-item
                    v-for="(item, index) in categories"
                    :key="index"
                    :class="{'v-list-item--active text-primary': item === value }"
                    color="primary"
                    class="filter"
                    @click="value = item"
                  >
                    {{ item }}
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="9" class="pa-6">
            <div class="massonry">
              <v-row>
                <v-col cols="12" sm="3" class="pa-3">
                  <div
                    data-aos-offset="200"
                    data-aos="fade-up"
                    data-aos-delay="200"
                    data-aos-duration="400"
                  >
                    <div
                      v-for="(item, index) in smallCase"
                      :key="index"
                    >
                      <case-card
                        :bg="item.bg || ''"
                        :logo="item.logo"
                        :title="item.title"
                        :desc="item.desc"
                        :size="item.size"
                        :simple="item.simple || false"
                        :show-img="() => showImg(item.idx)"
                      />
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" sm="4" class="pa-3">
                  <div
                    data-aos-offset="200"
                    data-aos="fade-up"
                    data-aos-delay="400"
                    data-aos-duration="400"
                  >
                    <div
                      v-for="(item, index) in mediumCase"
                      :key="index"
                    >
                      <case-card
                        :bg="item.bg || ''"
                        :logo="item.logo"
                        :title="item.title"
                        :desc="item.desc"
                        :size="item.size"
                        :simple="item.simple || false"
                        :show-img="() => showImg(item.idx)"
                      />
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" sm="5" class="pa-3">
                  <div
                    data-aos-offset="200"
                    data-aos="fade-up"
                    data-aos-delay="600"
                    data-aos-duration="400"
                  >
                    <div
                      v-for="(item, index) in bigCase"
                      :key="index"
                    >
                      <case-card
                        :bg="item.bg || ''"
                        :logo="item.logo"
                        :title="item.title"
                        :desc="item.desc"
                        :size="item.size"
                        :simple="item.simple || false"
                        :show-img="() => showImg(item.idx)"
                      />
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import './case-study-style.scss';
@import '../Title/title-style.scss';
</style>

<script>
import AOS from 'aos';
import imgAPI from '@/assets/images/imgAPI'; // Import imgAPI
import CaseCard from '../Cards/Case';

export default {
  components: {
    CaseCard,
  },
  data() {
    return {
      visible: false,
      index: 0,
      loaded: false,
      item: 0,
      value: 'office',
      categories: [
        'office',
      ],
      caseData: [
        {
          idx: 0,
          bg: imgAPI.office[0],
          title: 'Modern Office Space',
          desc: 'Our state-of-the-art facilities',
          size: 'small',
          simple: false,
        },
        {
          idx: 1,
          bg: imgAPI.office[2],
          title: 'Continuing Education Classes',
          size: 'small',
          simple: false,
        },
        {
          idx: 2,
          bg: imgAPI.office[4],
          title: 'Lunch & Learn',
          desc: 'Dedicated professionals',
          size: 'medium',
          simple: false,
        },
        {
          idx: 3,
          bg: imgAPI.office[6],
          title: 'Coastal Property Closing',
          desc: ' ',
          size: 'small',
        },
        {
          idx: 5,
          bg: imgAPI.office[9],
          title: 'Expanding our reach',
          desc: 'Successful beachfront transaction',
          size: 'medium',
        },
        {
          idx: 6,
          bg: imgAPI.office[11],
          size: 'big',
        },
      ],
      lastImageIndex: null, // Existing line
      lastBigImageIndex: null, // Add this line
      lastSmallImageIndex: null, // Add this line
    };
  },
  computed: {
    smallCase() {
      return this.caseData.filter(i => i.size === 'small');
    },
    mediumCase() {
      return this.caseData.filter(i => i.size === 'medium');
    },
    bigCase() {
      return this.caseData.filter(i => i.size === 'big');
    },
    mdUp() {
      const mdUp = this.$vuetify.display.mdAndUp;
      return mdUp;
    },
    imgs() {
      const arr = [];
      this.caseData.map((item) => {
        arr.push(item.bg || item.logo);
        return arr;
      });
      return arr;
    },
  },
  mounted() {
    this.loaded = true;
    AOS.init({
      once: true,
    });
  },
  methods: {
    showImg(index) {
      this.index = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
    getRandomOfficeImage() {
      const images = imgAPI.office;
      const weights = images.map((_, index) => (index === this.lastImageIndex ? 0.5 : 1),
      );

      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      let random = Math.random() * totalWeight;

      let selectedIndex = 0;
      for (let i = 0; i < weights.length; i += 1) { // Changed 'i++' to 'i += 1'
        if (random < weights[i]) {
          selectedIndex = i;
          break;
        }
        random -= weights[i];
      }

      this.lastImageIndex = selectedIndex;
      return images[selectedIndex];
    },
    getRandomBigImage() {
      const images = imgAPI.office;
      const weights = images.map((_, index) => (index === this.lastBigImageIndex ? 0.5 : 1));

      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      let random = Math.random() * totalWeight;

      let selectedIndex = 0;
      for (let i = 0; i < weights.length; i += 1) { // Changed 'i++' to 'i += 1'
        if (random < weights[i]) {
          selectedIndex = i;
          break;
        }
        random -= weights[i];
      }

      this.lastBigImageIndex = selectedIndex;
      return images[selectedIndex];
    },

    getRandomSmallImage() {
      const images = imgAPI.office;
      const weights = images.map((_, index) => (index === this.lastSmallImageIndex ? 0.5 : 1));

      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      let random = Math.random() * totalWeight;

      let selectedIndex = 0;
      for (let i = 0; i < weights.length; i += 1) { // Changed 'i++' to 'i += 1'
        if (random < weights[i]) {
          selectedIndex = i;
          break;
        }
        random -= weights[i];
      }

      this.lastSmallImageIndex = selectedIndex;
      return images[selectedIndex];
    },
  },
};
</script>
