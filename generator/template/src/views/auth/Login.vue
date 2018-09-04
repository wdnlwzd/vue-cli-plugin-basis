<template>
  <div class="panel-wrapper">
    <span class="logo">
      <img src="../../assets/logo.png" alt="">
    </span>

    <div class="slogan-wrapper">
      <el-row class="slogan">
        <img src="../../assets/login-bg2.svg" alt="">
      </el-row>
    </div>

    <div class="panel-content">
      <div class="change-lang">
        <span
          @click="switchLang('zh')"
          :class="{ 'active-lang': currentLang === 'zh' }">
          中文
        </span> /
        <span
          @click="switchLang('en')"
          :class="{ 'active-lang': currentLang === 'en' }">
          En
        </span>
      </div>

      <el-row class="login-con">
        <el-form>
          <h1 v-if="!isMobile">{{ $t('common.loginN') }}</h1>
          <!-- <p>Don’t have an account? <el-button type="text">Create your account</el-button></p> -->
          <el-form-item>
            <el-input
              size="medium"
              :placeholder="$t('common.username')"
              v-model="form.username"
              @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              size="medium"
              :placeholder="$t('common.password')"
              v-model="form.password"
              type="password"
              @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="12">
              <el-button
                type="text"
                @click="redirectForgotPassword">
                {{ $t('common.forgetPassword') }}
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                type="primary"
                size="medium"
                style="width:100%"
                :disabled="loginLoading"
                @click="login">
                {{ $t('common.login') }}
                <i v-if="loginLoading"
                  class="el-icon-loading"></i>
              </el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-row>

      <el-footer>
        {{ $t('common.copyrightMessage', { currentYear }) }}
      </el-footer>
    </div>

  </div>
</template>

<script>
import { isMobile } from '@/utils/util';

export default {
  data() {
    return {
      currentYear: (new Date()).getFullYear(),
      form: {
        username: '',
        password: '',
      },
      loginLoading: false,
      currentLang: this.$i18n.locale,
    };
  },
  computed: {
    user() {
      if (this.$auth.token()) {
        return this.$store.state.auth.user || {};
      }

      return {};
    },
    isMobile() {
      return isMobile();
    },
  },
  methods: {
    login() {
      if (!this.form.password || !this.form.username) {
        return;
      }

      this.loginLoading = true;
      this.$auth.login(this.form).then(() => {
        try {
          this.$router.push({ path: 'Index' });
        } catch (err) {
          this.$router.push({ name: 'Index' });
        }
      }).catch((res) => {
        console.log('login failed', res);
        const reason = res.body.reason;
        const data = res.body.data;
        if (!data) {
          this.$message.error(this.$t('common.invalid_password_username'));
          return;
        }

        const maxAttempts = data.login_max_attempts;
        const failedCount = data.login_failed_count;
        const enableLoginLock = data.enable_login_lock;
        const remainedCount = maxAttempts - failedCount;

        if (enableLoginLock && (reason !== 'invalid login or password' ||
          (maxAttempts && maxAttempts <= failedCount))) {
          this.locked = true;
          this.$message.error(this.$t('common.account_is_locked'));
        } else if (enableLoginLock && maxAttempts && failedCount !== null && failedCount <= maxAttempts) {
          if (this.$locale.current() === 'en' && remainedCount === 1) {
            this.$message.error('Invalid Username or Password. last login Remained.');
          } else {
            this.$message.error(this.$t('common.invalid_password_username_number',
              { number: remainedCount }));
          }
        } else {
          this.$message.error(this.$t('common.invalid_password_username'));
        }
      }).finally(() => {
        this.loginLoading = false;
      });
    },
    switchLang(lang) {
      this.currentLang = lang;
      this.$locale.use(lang);
      localStorage.setItem('<%= rootOptions.projectName.toUpperCase() %>_LANGUAGE', lang);
    },
    redirectForgotPassword() {
      /* eslint-disable max-len */
      window.location = `${process.env.VUE_APP_HAMLET_URL}/forgot_password?app_key=${process.env.VUE_APP_APP_KEY}&callback_url=${document.location.href}`;
    },
  },
  created() {
  },
};
</script>

<style lang="scss">
  @import "../../styles/_login.scss";
</style>
