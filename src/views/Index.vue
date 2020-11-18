<template>
  <div>
    <Header />
    <ViewWrapper :view="state.PAGES.HOME">
      <Home />
    </ViewWrapper>
    <ViewWrapper :view="state.PAGES.WORKS">
      <Works />
    </ViewWrapper>
    <ViewWrapper :view="state.PAGES.ABOUT">
      <About />
    </ViewWrapper>
  </div>
</template>
<script>
import { defineComponent, reactive, onMounted, nextTick } from "vue";
import { RouterMount } from "../viewframework/Router";
import ViewWrapper from "../viewframework/ViewWrapper.vue";
import Header from "../components/header/Header.vue";
import Home from "../views/Home.vue";
import Works from "../views/Works.vue";
import About from "../views/About.vue";
import { PAGES } from "./router.config";

export default defineComponent({
  components: { ViewWrapper, Header, Home, Works, About },
  setup() {
    const state = reactive({
      PAGES,
    });

    onMounted(() => {
      RouterMount();
    });

    return {
      state,
    };
  },
});
</script>