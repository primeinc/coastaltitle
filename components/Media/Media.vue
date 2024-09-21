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
                  {{ $t('mediaLanding.media_title') }}
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
                      v-for="(item, index) in smallMedia"
                      :key="index"
                    >
                      <media-card
                        :bg="item.bg || ''"
                        :title="item.title"
                        :desc="item.desc"
                        :size="item.size"
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
                      v-for="(item, index) in mediumMedia"
                      :key="index"
                    >
                      <media-card
                        :bg="item.bg || ''"
                        :title="item.title"
                        :desc="item.desc"
                        :size="item.size"
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
                      v-for="(item, index) in bigMedia"
                      :key="index"
                    >
                      <media-card
                        :bg="item.bg || ''"
                        :title="item.title"
                        :desc="item.desc"
                        :size="item.size"
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
@import './media-style.scss';
@import '../Title/title-style.scss';
</style>

<script>
import AOS from 'aos';
import imgApi from '@/assets/images/imgAPI';
import MediaCard from '../Cards/Media';

export default {
  components: {
    MediaCard,
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
        'events',
        'team',
        'projects',
      ],
      mediaData: [
        {
          idx: 0,
          bg: imgApi.office[0],
          title: 'Office Lobby',
          desc: 'Our welcoming office lobby',
          size: 'small',
        },
        {
          idx: 1,
          bg: imgApi.office[1],
          title: 'Conference Room',
          desc: 'State-of-the-art conference room',
          size: 'medium',
        },
        {
          idx: 2,
          bg: imgApi.office[2],
          title: 'Team Meeting',
          desc: 'Our team in action',
          size: 'big',
        },
        // Add more media items as needed
      ],
    };
  },
  computed: {
    smallMedia() {
      return this.mediaData.filter(i => i.size === 'small');
    },
    mediumMedia() {
      return this.mediaData.filter(i => i.size === 'medium');
    },
    bigMedia() {
      return this.mediaData.filter(i => i.size === 'big');
    },
    mdUp() {
      const mdUp = this.$vuetify.display.mdAndUp;
      return mdUp;
    },
    imgs() {
      return this.mediaData.map(item => item.bg);
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
