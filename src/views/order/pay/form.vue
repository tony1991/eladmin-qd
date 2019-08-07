<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="商户ID" >
        <el-input v-model="form.mchId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="商户订单号" >
        <el-input v-model="form.mchOrderNo" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="渠道ID" >
        <el-input v-model="form.channelId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="渠道商户ID" >
        <el-input v-model="form.channelMchId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="渠道订单号" >
        <el-input v-model="form.channelOrderNo" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="支付金额" >
        <el-input v-model="form.amount" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="三位货币代码" >
        <el-input v-model="form.currency" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="支付状态" >
        <el-input v-model="form.orderStatus" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="客户端IP" >
        <el-input v-model="form.clientIp" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="终端设备号" >
        <el-input v-model="form.terminalCode" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="支付方式" >
        <el-input v-model="form.payMode" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="商品标题" >
        <el-input v-model="form.subject" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="商品描述信息" >
        <el-input v-model="form.body" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="特定渠道发起时额外参数" >
        <el-input v-model="form.extra" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="商户门店编号" >
        <el-input v-model="form.storeId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="商户操作员编号" >
        <el-input v-model="form.operatorId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="付款用户编号" >
        <el-input v-model="form.userId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="渠道支付错误码" >
        <el-input v-model="form.errCode" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="渠道支付错误描述" >
        <el-input v-model="form.errMsg" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="商户保留字段" >
        <el-input v-model="form.reserveParams" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="通知地址" >
        <el-input v-model="form.notifyUrl" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="通知次数" >
        <el-input v-model="form.notifyCount" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="最后一次通知时间" >
        <el-input v-model="form.lastNotifyTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="订单失效时间" >
        <el-input v-model="form.expireTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="订单支付成功时间" >
        <el-input v-model="form.paySuccTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="订单退款时间" >
        <el-input v-model="form.refundTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建时间" >
        <el-input v-model="form.createTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="更新时间" >
        <el-input v-model="form.updateTime" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/tPayOrder'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        payOrderId: '',
        mchId: '',
        mchOrderNo: '',
        channelId: '',
        channelMchId: '',
        channelOrderNo: '',
        amount: '',
        currency: '',
        orderStatus: '',
        clientIp: '',
        terminalCode: '',
        payMode: '',
        subject: '',
        body: '',
        extra: '',
        storeId: '',
        operatorId: '',
        userId: '',
        errCode: '',
        errMsg: '',
        reserveParams: '',
        notifyUrl: '',
        notifyCount: '',
        lastNotifyTime: '',
        expireTime: '',
        paySuccTime: '',
        refundTime: '',
        createTime: '',
        updateTime: ''
      },
      rules: {
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        payOrderId: '',
        mchId: '',
        mchOrderNo: '',
        channelId: '',
        channelMchId: '',
        channelOrderNo: '',
        amount: '',
        currency: '',
        orderStatus: '',
        clientIp: '',
        terminalCode: '',
        payMode: '',
        subject: '',
        body: '',
        extra: '',
        storeId: '',
        operatorId: '',
        userId: '',
        errCode: '',
        errMsg: '',
        reserveParams: '',
        notifyUrl: '',
        notifyCount: '',
        lastNotifyTime: '',
        expireTime: '',
        paySuccTime: '',
        refundTime: '',
        createTime: '',
        updateTime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
