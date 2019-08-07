<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
      <!-- 新增 -->
      <div style="display: inline-block;margin: 0px 2px;">
        <el-button
          v-permission="['ADMIN','TPAYORDER_ALL','TPAYORDER_CREATE']"
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add">新增</el-button>
      </div>
    </div>
    <!--表单组件-->
    <eForm ref="form" :is-add="isAdd"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="payOrderId" label="支付订单号"/>
      <el-table-column prop="mchId" label="商户ID"/>
      <el-table-column prop="mchOrderNo" label="商户订单号"/>
      <el-table-column prop="channelId" label="渠道ID"/>
      <el-table-column prop="channelOrderNo" label="渠道订单号"/>
      <el-table-column prop="amount" label="金额"/>
      <el-table-column prop="orderStatus" label="支付状态"/>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="paySuccTime" label="支付时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.paySuccTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="checkPermission(['ADMIN','TPAYORDER_ALL','TPAYORDER_EDIT','TPAYORDER_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-button v-permission="['ADMIN','TPAYORDER_ALL','TPAYORDER_EDIT']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>
          <el-popover
            v-permission="['ADMIN','TPAYORDER_ALL','TPAYORDER_DELETE']"
            :ref="scope.row.payOrderId"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.payOrderId].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.payOrderId)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page + 1"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/tPayOrder'
import { parseTime } from '@/utils/index'
import eForm from './form'
export default {
  components: { eForm },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      queryTypeOptions: [
        { key: 'payOrderId', display_name: '支付订单号' },
        { key: 'mchId', display_name: '商户ID' },
        { key: 'mchOrderNo', display_name: '商户订单号' },
        { key: 'channelId', display_name: '渠道ID' },
        { key: 'channelOrderNo', display_name: '渠道订单号' },
        { key: 'orderStatus', display_name: '支付状态' }
      ]
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/tPayOrder'
      const sort = 'payOrderId,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }
      return true
    },
    subDelete(payOrderId) {
      this.delLoading = true
      del(payOrderId).then(res => {
        this.delLoading = false
        this.$refs[payOrderId].doClose()
        this.dleChangePage()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[payOrderId].doClose()
        console.log(err.response.data.message)
      })
    },
    add() {
      this.isAdd = true
      this.$refs.form.dialog = true
    },
    edit(data) {
      this.isAdd = false
      const _this = this.$refs.form
      _this.form = {
        payOrderId: data.payOrderId,
        mchId: data.mchId,
        mchOrderNo: data.mchOrderNo,
        channelId: data.channelId,
        channelMchId: data.channelMchId,
        channelOrderNo: data.channelOrderNo,
        amount: data.amount,
        currency: data.currency,
        orderStatus: data.orderStatus,
        clientIp: data.clientIp,
        terminalCode: data.terminalCode,
        payMode: data.payMode,
        subject: data.subject,
        body: data.body,
        extra: data.extra,
        storeId: data.storeId,
        operatorId: data.operatorId,
        userId: data.userId,
        errCode: data.errCode,
        errMsg: data.errMsg,
        reserveParams: data.reserveParams,
        notifyUrl: data.notifyUrl,
        notifyCount: data.notifyCount,
        lastNotifyTime: data.lastNotifyTime,
        expireTime: data.expireTime,
        paySuccTime: data.paySuccTime,
        refundTime: data.refundTime,
        createTime: data.createTime,
        updateTime: data.updateTime
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>

</style>
