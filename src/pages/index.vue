<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper'
import _ from 'lodash'
import { message } from 'ant-design-vue'
import type { LifeMottoItem } from '~/typings/motto'
import { apiGetData } from '~/service/supabase'
import 'ant-design-vue/es/message/style/css'

const lifeMottoList: LifeMottoItem[] = reactive([]) // motto list
const spinning = ref<boolean>(true)
const modules = [Pagination, Autoplay]

/**
 * 根据返回值显示隐藏遮罩
 * @param flag
 */
const handleShowSpin = (flag: boolean) => {
  spinning.value = flag
}

function handleTurnData(res: any) {
  const status = res.status
  if (res?.data?.length) {
    _.forEach(res.data, (item) => {
      lifeMottoList.push(item)
    })
  }

  if (status === 200)
    message.success('数据加载成功！')
  handleShowSpin(false)
}

/**
 * 从后端获取数据
 */
async function getLifeMottoList() {
  try {
    handleShowSpin(true)
    let result = await apiGetData()
    result = handleTurnData(result)
  }
  catch (error) {
    // message.error(error)
    // message.error(error)
  }
}

onMounted(() => {
  getLifeMottoList()
})
</script>

<template>
  <div class="page-motto-list p-10 overflow-hidden" h-full>
    <a-spin tip="Loading..." :spinning="spinning">
      <div class="page-motto-list__header flex items-center justify-center">
        <h3 class="page-motto-list__header-text">
          标题
        </h3>
      </div>
      <div class="page-motto-list__body">
        <Swiper
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }" :pagination="{
            clickable: true,
          }" :modules="modules" class="mySwiper"
        >
          <SwiperSlide v-for="(item) in lifeMottoList" :key="item.id">
            <div w-full class="p-4">
              <a-card w-full>
                <template #actions>
                  <a-tooltip>
                    <template #title>
                      赞一下
                    </template>
                    <LikeOutlined key="like" />
                  </a-tooltip>
                  <a-tooltip>
                    <template #title>
                      踩一下
                    </template>
                    <DislikeOutlined key="dislike" />
                  </a-tooltip>
                  <a-tooltip>
                    <template #title>
                      评论
                    </template>
                    <EditOutlined key="edit" />
                  </a-tooltip>
                  <a-tooltip>
                    <template #title>
                      查看更多评论
                    </template>
                    <EllipsisOutlined key="ellipsis" />
                  </a-tooltip>
                </template>
                <a-card-meta class="text-left" :title="item.creator" :description="item">
                  <template #avatar>
                    <a-avatar src="https://joeschmoe.io/api/v1/random" />
                  </template>
                </a-card-meta>
              </a-card>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </a-spin>
  </div>
</template>

<style scoped lang="scss">
.page-motto-list__header {
  height: 10%;

  &-text {
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
  }
}

.page-motto-list__body {
  height: 40%;
  overflow: hidden
}

.swiper {
  width: 100%;
  height: 100%;

  :deep(.swiper-pagination) {
    display: none !important;
  }
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
