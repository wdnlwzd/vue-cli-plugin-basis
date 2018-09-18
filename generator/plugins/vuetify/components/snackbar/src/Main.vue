<template>
  <v-snackbar
    v-model="visible"
    :color="color"
    :bottom="y === 'bottom'"
    :left="x === left"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
    :vertical="mode === 'vertical'">
    {{ text }}
    <v-btn
      color="pink"
      flat
      @click="close">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      text: '',
    };
  },
  methods: {
    close() {
      this.visible = false;
      setTimeout(() => {
        this.$destroy(true)

        // 从DOM里将这个组件移除
        this.$el.parentNode.removeChild(this.$el);
      }, 500)
    },
    keydown(e) {
      // esc关闭消息
      if (e.keyCode === 27 && !this.visible) {
        this.close();
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.keydown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
  }
}
</script>
