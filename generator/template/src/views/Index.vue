<template>
  <%_ if (ui === 'element') { _%>
  <el-container>
    <el-header
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
        background-color="#065bc9"
        text-color="#fff"
        active-text-color="#21d5cb"
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
                <span slot="title">{{ cRoute.name }}</span>
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
              <img
                src="http://67.218.155.2:8082/1.png"
                alt="Demo">
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
            @click="switchLang('zh-CN')"
            :class="{ 'active-lang': currentLang === 'zh-CN' }">
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
  <%_ } else { _%>
  <v-app>
    <v-toolbar
      app
      fixed
      :clipped-left="$vuetify && $vuetify.breakpoint.mdAndUp">
      <v-toolbar-side-icon
        @click.stop="drawerRight = !drawerRight"
      ></v-toolbar-side-icon>
      <v-toolbar-title><%= rootOptions.projectName.toUpperCase() %></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <template v-for="(route, index) in $router.options.routes[1].children">
          <template v-if="route.meta.hasSub">
            <v-menu
              :key="index"
              bottom
              origin="bottom center"
              offset-y
              transition="scale-transition">
              <v-btn
                slot="activator"
                flat>
                {{ route.name }}
                <v-icon dark>arrow_drop_down</v-icon>
              </v-btn>
              <v-list :key="index">
                <v-list-tile
                  v-for="(cRoute, idx) in route.children"
                  :to="{ name: cRoute.name }"
                  :key="idx">
                  <v-list-tile-action v-if="cRoute.meta && cRoute.meta.icon">
                    <v-icon>{{ cRoute.meta.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ cRoute.name }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
          </template>
          <template v-else>
            <v-btn
              :key="index"
              flat
              :to="{ name: route.name }">
              {{ route.name }}
             </v-btn>
          </template>
        </template>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-toolbar-title slot="activator">
          <v-avatar size="40">
            <img
              src="http://67.218.155.2:8082/1.png"
              alt="Demo">
          </v-avatar>
          <span style="margin-left: 10px;">vasttian</span>
          <v-icon>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>
              <%_ if (i18n === 'none') { _%>
              修改密码
              <%_ } else { _%>
              {{ $t('common.account') }}
              <%_ } _%>
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-title>
              <%_ if (i18n === 'none') { _%>
              退出登录
              <%_ } else { _%>
              {{ $t('common.logout') }}
              <%_ } _%>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <%_ if (i18n !== 'none') { _%>
      <div class="change-lang">
        <span
          @click="switchLang('zh-CN')"
          :class="{ 'active-lang': currentLang === 'zh-CN' }">
          中文
        </span> /
        <span
          @click="switchLang('en')"
          :class="{ 'active-lang': currentLang === 'en' }">
          En
        </span>
      </div>
      <%_ } _%>
    </v-toolbar>

    <v-navigation-drawer
      stateless
      value="true"
      clipped
      fixed
      app
      v-model="drawerRight">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>

        <v-list-group
          prepend-icon="account_circle"
          value="true">
          <v-list-tile slot="activator">
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile>

          <v-list-group
            no-action
            sub-group
            value="true">
            <v-list-tile slot="activator">
              <v-list-tile-title>Admin</v-list-tile-title>
            </v-list-tile>

            <v-list-tile
              v-for="(admin, i) in admins"
              :key="i">
              <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-list-group
            sub-group
            no-action>
            <v-list-tile slot="activator">
              <v-list-tile-title>Actions</v-list-tile-title>
            </v-list-tile>

            <v-list-tile
              v-for="(crud, i) in cruds"
              :key="i">
              <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="crud[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view/>
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
  <%_ } _%>
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
      <%_ if (ui === 'vuetify') {_%>
      drawerRight: true,
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings'],
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete'],
      ],
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
    switchLang(lang = 'zh-CN') {
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
      <%_ if (ui === 'element') { _%>
      this.$message({
        showClose: true,
        message: 'Ahem: Please add logout function',
      });
      <%_ } else if (ui === 'vuetify') { _%>
      this.$message({
        type: 'info',
        text: 'Ahem: Please add logout function',
      });
      this.$router.push({ name: 'Login' });
      <%_ } _%>
      <%_ } _%>
    },
  },
  created() {
  },
};
</script>
