<template>
  <div>
    <Header />
    <ViewWrapper
      :view="state.PAGES.HOME"
      :slideType="state.VIEW_SLIDE_TYPE.BOTTOM2TOP"
    >
      <Home />
    </ViewWrapper>
    <ViewWrapper
      :view="state.PAGES.WORKS"
      :slideType="state.VIEW_SLIDE_TYPE.BOTTOM2TOP"
    >
      <Works />
    </ViewWrapper>
    <ViewWrapper
      :view="state.PAGES.ABOUT"
      :slideType="state.VIEW_SLIDE_TYPE.BOTTOM2TOP"
    >
      <About />
    </ViewWrapper>
  </div>
</template>
<script>
import { defineComponent, reactive, onMounted } from "vue";
import { RouterMount } from "../viewframework/Router";
import ViewWrapper, { VIEW_SLIDE_TYPE } from "../viewframework/ViewWrapper.vue";
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
      VIEW_SLIDE_TYPE,
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