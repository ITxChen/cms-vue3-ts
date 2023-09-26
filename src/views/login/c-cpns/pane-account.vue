<template>
  <div class="pane-account">
    <!-- status-icon 输入框里边的小图标（x √） -->
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <!-- 校验 -->
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ElForm, FormRules } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
// 定义account数据

const account = reactive<IAccount>({
  // 两个问号是非空断言
  // 从本地存储中拿账号密码，如果点击过记住密码，则会直接拿到密码
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})
// 定义校验规则
const accountRules: FormRules = {
  name: [
    // 必须传入，没有穿入的话失去焦点的时候提示
    { required: true, message: '必须输入账号信息', trigger: 'blur' },
    {
      // a-z，0-9，且长度6-20
      pattern: /^[a-z0-9]{6,20}$/,
      required: true,
      message: '必须是6-20位的数字或字母',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    {
      // a-z，0-9，且长度6-20
      pattern: /^[a-z0-9]{3,}$/,
      required: true,
      message: '必须是3位以上的数字或字母',
      trigger: 'blur'
    }
  ]
}

// 登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户账户密码
      const name = account.name
      const password = account.password
      // 2.进行网络请求
      loginStore.loginAccountAction({ name, password }).then((res) => {
        // 4. 是否记住密码
        if (isRemPwd) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })

      // accountLoginRequest({name, password}).then((res) => {
      //   console.log(res)
      // })
    } else {
      ElMessage.error('请您输入正确的格式后再操作')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less">
.pane-account {
  color: red;
}
</style>
