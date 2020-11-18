<template>
  <div class="viewWrapper" :class="state.className" :style="getStyle">
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent, onMounted, computed, reactive } from "vue";
import { Router } from "./Router";

export default defineComponent({
  props: {
    view: Object,
  },
  setup(props) {
    const state = reactive({
      className: "",
      changeTime: 0,
      history: [],
      zIndex: 1,
    });

    /**
     * 状態ごとのアクション
     */
    const actions = {
      increase: {
        self: (time) => {
          //slideout > slidein
          page.SlideOut(0);
          setTimeout(() => {
            page.SlideIn(time);
          }, 1);
        },
        prev: (time) => {
          page.ZoomOut(time);
        },
        other: (time) => {
          page.Hide(time);
        },
      },
      decrease: {
        self: (time) => {
          page.ZoomOut(0);
          setTimeout(() => {
            page.ZoomIn(time);
          }, 1);
        },
        prev: (time) => {
          page.SlideOut(time);
        },
        other: (time) => {
          page.Hide(time);
        },
      },
    };

    onMounted(() => {
      Router.setCallback(
        ({ stackView, stackViewPrev, history, changeTime }) => {
          //スタックが増えてるかどうか
          const increase = stackView.length > stackViewPrev.length;
          setZindex(increase ? stackView : stackViewPrev);

          //メソッド取得
          const { self, prev, other } = actions[
            increase ? "increase" : "decrease"
          ];

          //自分の次に表示されるかどうか
          const _self = props.view.id === stackView[stackView.length - 1].id;
          if (_self) {
            self(changeTime);
            return;
          }

          //スタックされていない場合
          if (stackView.length >= 2 && increase) {
            if (props.view.id === stackView[stackView.length - 2].id) {
              prev(changeTime);
            } else {
              other(changeTime);
            }
            return;
          }

          if (stackViewPrev.length >= 1 && !increase) {
            if (props.view.id === stackViewPrev[stackViewPrev.length - 1].id) {
              prev(changeTime);
            } else {
              other(changeTime);
            }
            return;
          }
          other(changeTime);
        }
      );
    });

    const setClassName = (v) => {
      state.history.push(v);
      const display = v === "stay" ? "stay" : v === "hide" ? "hide" : "";
      const transform = v !== "stay" || v !== "hide" ? v : "";
      state.className = `${display} ${transform}`;
    };

    const getStyle = computed(() => {
      return `transition:all ${state.changeTime / 1000}s ease-out;z-index:${
        state.zIndex
      }`;
    });

    const setZindex = (views) => {
      const selfIndex = views.findIndex((view) => view.id === props.view.id);
      if (selfIndex) {
        state.zIndex = selfIndex + 10;
      } else {
        state.zIndex = 0;
      }
    };

    const page = {
      Stay: (time) => {
        state.changeTime = time;
        setClassName("stay");
      },
      Hide: (time) => {
        state.changeTime = time;
        setClassName("hide");
      },
      ZoomIn: (time) => {
        state.changeTime = time;
        setClassName("zoomin");
      },
      ZoomOut: (time) => {
        state.changeTime = time;
        setClassName("zoomout");
      },
      SlideIn: (time) => {
        state.changeTime = time;
        setClassName("slidein");
      },
      SlideOut: (time) => {
        state.changeTime = time;
        setClassName("slideout");
      },
    };
    return {
      state,
      getStyle,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./viewWrapper.scss";
</style>