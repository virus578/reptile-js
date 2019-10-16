<template>
  <div class="">
    <el-dialog :title="form.title" :visible.sync="dialogFormVisible" @close="close">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="平台">
          <el-select v-model="form.plateform" size="middle" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="key：">
          <el-input v-model="form.key" size="middle"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="账号：">
          <el-input v-model="form.username" size="middle"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码：">
          <el-input v-model="form.password" size="middle"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="是否更新cookie：">
          <el-radio-group v-model="form.expire_time">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false,$emit('input',dialogFormVisible)">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogFormVisible = false,$emit('input',dialogFormVisible),$emit('mdf_info')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>

</style>

<script>
export default {
  components: {

  },
  props: {
    value: {},
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formLabelWidth: '140px',
      dialogFormVisible: false,
      options: [{
        value: 'aliexpress',
        label: '速卖通'
      }]
    }
  },
  watch: {
    value(val) {
      this.dialogFormVisible = val
    }
  },
  methods: {
    close() {
      this.dialogFormVisible = false
      this.$emit('input', this.dialogFormVisible)
    }
  }
}
</script>
