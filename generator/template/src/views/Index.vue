<template>
  <el-container>
    <el-header
      height="54px"
      class="flex-box space-btw">
      <!-- logo -->
      <router-link
        :to="{ path: '/' }">
        <span class="logo">
          <img src="@/assets/logo.png" alt="">
        </span>
      </router-link>

      <!-- menu -->
      <el-menu
        :default-active="activeMenu"
        mode="horizontal"
        router>
        <template v-for="(route, index) in $router.options.routes[1].children">
          <template
            v-if="route.meta.hasSub">
            <el-submenu
              v-if="roleShow(route)"
              :index="route.name"
              :key="index">
              <template slot="title">{{ route.name }}</template>
              <el-menu-item
                v-for="(cRoute, idx) in route.children"
                :key="idx"
                :index="cRoute.name"
                :route="cRoute">
                <span slot="title">{{ route.name }}</span>
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item
              v-if="roleShow(route)"
              :key="index"
              :index="route.name"
              :route="route">
              <span slot="title">{{ route.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>

      <!-- avatar -->
      <div class="flex-box">
        <el-dropdown>
          <span class="el-dropdown-link userinfo flex-box">
            <span class="avatar flex-box">
              <!-- <img src="../assets/avatar.svg"> -->
              <i class="icon-avatar"></i>
            </span>
            <span>{{ user && user.username }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">
              <i class="icon-switch"></i>
              <%_ if (i18n === 'none') { _%>
              退出登录
              <%_ } else { _%>
              {{ $t('common.logout') }}
              <%_ } _%>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <%_ if (i18n !== 'none') { _%>
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
        <%_ } _%>
      </div>
    </el-header>

    <el-main>
      <transition name="move" mode="out-in">
        <router-view ref="index" />
      </transition>
    </el-main>
    <!-- <el-footer>
      © 2014 - {{ currentYear }} 深圳市一面网络技术有限公司 粤ICP备14054704号-4
    </el-footer> -->
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      currentYear: (new Date()).getFullYear(),
      <%_ if (i18n !== 'none') { _%>
      currentLang: this.$i18n.locale,
      <%_ } _%>
    };
  },
  computed: {
    activeMenu() {
      return this.$route.name;
    },
    user() {
      <%_ if (hamlet) { _%>
      return this.$auth.token() && this.$store.state.auth ? this.$store.state.auth.user || {} : {};
      <%_ } else {_%>
      return { username: 'Demo' };
      <%_ }_%>
    },
  },
  methods: {
    roleShow(route) {
      // hack, there is no user when logout
      if (!this.user || route.meta.hidden) {
        return false;
      }

      const { auth } = route.meta;
      return auth ? auth.indexOf(this.user.role) !== -1 : !auth;
    },
    <%_ if (i18n !== 'none') { _%>
    switchLang(lang = 'zh') {
      this.currentLang = lang;
      this.$locale.use(lang);
      localStorage.setItem('<%= rootOptions.projectName.toUpperCase() %>_LANGUAGE', lang);
    },
    <%_ } _%>
    logout() {
      <%_ if (hamlet) { _%>
      this.$auth.logout().then(() => {
        this.$router.push({ name: 'Login' });
      });
      <%_ } else {_%>
      console.log('logout');
      this.$message({
        showClose: true,
        message: 'Ahem: Please add logout function',
      });
      this.$router.push({ name: 'Login' });
      <%_ }_%>
    },
  },
  created() {
  },
};
</script>
