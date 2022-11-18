<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
const modules = [Pagination]
const listData: Record<string, string>[] = []
</script>

<template>
  <div class="page-motto-list" h-full>
    <div class="page-motto-list__header">
      123123
    </div>
    <div class="page-motto-list__body">
      <Swiper direction="vertical" :pagination="{ clickable: true }" :modules="modules" class="mySwiper">
        <template v-for="(item, index) in items" v-if="index < 10">
          <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
            <template #renderItem="{ item }">
              <a-list-item key="item.title">
                <template #actions>
                  <span v-for="{ type, text } in actions" :key="type">
                    <component :is="type" style="margin-right: 8px" />
                    {{ text }}
                  </span>
                </template>
                <template #extra>
                  <img width="272" alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
                </template>
                <a-list-item-meta :description="item.description">
                  <template #title>
                    <a :href="item.href">{{ item.title }}</a>
                  </template>
                  <template #avatar>
                    <a-avatar :src="item.avatar" />
                  </template>
                </a-list-item-meta>
                {{ item.content }}
              </a-list-item>
            </template>
          </a-list>
        </template>
      </Swiper>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-motto-list__header {
  height: 20%;
}

.page-motto-list__body {
  height: 80%;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
