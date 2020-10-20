<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-header style="color:green">家庭开销账本</el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#333333"
                text-color="#FFFFFF"
                active-text-color="#ffd04b"
                mode="horizontal "
                :router="true"
              >
                <el-menu-item index="1" :route="'/payList'">
                  <span slot="title">消费记录</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <span slot="title">统计记录</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.el-header {
  background-color: #e3ebf3;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #333333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>