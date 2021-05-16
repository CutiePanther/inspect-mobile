<template>
  <div class="home-container">
    <vue-qr text="http://strawburry.top/" :margin="0" colorDark="green" colorLight="#fff" :logoSrc="logoSrc" :size="300"></vue-qr>
    <md-bill>
      <div class="header-slot" slot="header">
        <h1 class="title">丰旺小麻辣烫</h1>
        <p class="desc">孝丰路155号
          <md-tag
          size="small"
          shape="fillet"
          type="fill"
          fill-color="gray"
          style="margin-right:4px;"
        >餐饮服务</md-tag>
        </p>
      </div>
      <md-detail-item title="营业执照名称">丰旺麻辣烫有限公司</md-detail-item>
      <md-detail-item title="社会信用代码">91330105MA2FEJ858</md-detail-item>
      <md-detail-item title="经营者姓名">张三</md-detail-item>
      <md-detail-item title="联系电话">13456789046</md-detail-item>
      <md-detail-item title="经营场所面积"> 20-50平方</md-detail-item>
      <div class="footer-slot" slot="footer">
        1 普通用户登录，可以评价商户信息。 <br>
        2 稽查员登录，可以实现巡查操作，可以查看巡查记录。<br>
      </div>
    </md-bill>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
import { Bill, DetailItem, Icon, Tag } from 'mand-mobile'

export default {
  name: 'bill-demo',
  /* DELETE */
  title: '使用插槽',
  titleEnUS: 'Using slots',
  /* DELETE */
  components: {
    [Bill.name]: Bill,
    [DetailItem.name]: DetailItem,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    vueQr
  },
  data () {
    return {
      logoSrc: require('@/assets/interLogo.png')
    }
  }
}

</script>

<style lang="less">
.home-container {
  padding: 24px 0;
  .md-bill {
    background-color: #FFF;
    box-shadow: 0 6px 24px rgba(17, 26, 52, .05);
    &.md-water-mark {
      overflow: visible;
    }
    .md-bill-neck {
      &:before, &:after {
        content: '';
        position: absolute;
        top: 0;
        width: 36px;
        height: 36px;
        border-radius: 18px;
        background-color: #F3F4F5;
      }
      &:before {
        left: -46px;
      }
      &:after {
        right: -46px;
      }
    }
    .header-slot {
      padding: 20px 0;
      .title {
        color: #111A34;
        font-size: 60px;
      }
      .desc {
        margin-top: 32px;
        color: #858B9C;
        font-size: 26px;
        line-height: 26px;
        text-align: left;
      }
    }
    .footer-slot {
      padding: 32px 0;
      color: #858B9C;
      font-size: 22px;
      line-height: 1.5;
      border-top: solid 1px #E1E4EB;
      text-align: left;
    }
  }
}
</style>
