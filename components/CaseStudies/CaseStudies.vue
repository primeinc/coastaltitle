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
import imgApi from '@/assets/images/imgAPI';
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
      value: 'corporate',
      categories: [
        'corporate',
        'advertising',
        'marketing',
        'government',
        'creative',
      ],
      caseData: [
        {
          idx: 0,
          bg: imgApi.agency[5],
          logo: '/images/logos/mobile.png',
          title: 'Donec commodo convallis ligula',
          desc: 'Vestibulum consequat hendrerit',
          size: 'small',
        },
        {
          idx: 1,
          logo: '/images/logos/coin.png',
          title: 'Donec commodo convallis ligula',
          desc: 'Vestibulum consequat hendrerit',
          size: 'small',
          simple: true,
        },
        {
          idx: 2,
          logo: '/images/logos/starter.png',
          title: 'Donec commodo convallis ligula',
          desc: 'Vestibulum consequat hendrerit',
          size: 'medium',
          simple: true,
        },
        {
          idx: 3,
          bg: imgApi.agency[6],
          logo: '/images/logos/profile.png',
          title: 'Donec commodo convallis ligula',
          desc: 'Vestibulum consequat hendrerit',
          size: 'medium',
        },
        {
          idx: 4,
          bg: imgApi.agency[7],
          logo: '/images/logos/architect.png',
          title: 'Donec commodo convallis ligula',
          desc: 'Vestibulum consequat hendrerit',
          size: 'medium',
        },
        {
          idx: 5,
          bg: imgApi.agency[8],
          logo: '/images/logos/fashion.png',
          title: 'Donec commodo convallis ligula',
          desc: 'Vestibulum consequat hendrerit',
          size: 'big',
        },
        {
          idx: 6,
          bg: imgApi.agency[9],
          logo: '/images/logos/cloud.png',
          title: 'Donec commodo convallis ligula',
          desc: 'Vestibulum consequat hendrerit',
          size: 'big',
        },
      ],
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
  },
};
</script>
