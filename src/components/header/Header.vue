<template>
  <div class="header">
    <button @click="back()">back</button>
    <button @click="page(state.PAGES.HOME)">home</button>
    <button @click="page(state.PAGES.WORKS)">works</button>
    <button @click="page(state.PAGES.ABOUT)">about</button>
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
import { Router } from "../../viewframework/Router";
import { PAGES } from "../../views/router.config";
export default defineComponent({
  setup() {
    const state = reactive({
      PAGES,
    });
    const page = (page) => {
      Router.push(page);
    };
    const back = () => {
      Router.pull();
    };
    return {
      state,
      page,
      back,
    };
  },
});
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 48px;
  z-index: 99;
}
</style>