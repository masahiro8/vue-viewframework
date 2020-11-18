import { PAGES } from "../views/router.config";

/**
 *
 * @param {$router} _router
 */
const _Router = () => {
  let changeTime = 400;
  let stackView = []; //ここが画面上の重なりの状態
  let stackViewPrev = []; //ここが画面上の重なりの前の状態
  let history = []; //重なりの変更履歴
  let callbacks = [];

  const init = (_PAGE) => {
    push(_PAGE);
    publishCallback();
  };

  const setCallback = (callback) => {
    callbacks.push(callback);
  };

  const publishCallback = () => {
    callbacks.forEach((callback) => {
      callback({ stackView, stackViewPrev, history, changeTime });
    });
  };

  const push = (_PAGE) => {
    stackViewPrev = [...stackView];
    const index = stackView.findIndex((view) => view.id === _PAGE.id);
    if (index < 0) {
      stackView.push(_PAGE);
    } else {
      stackView = stackView.slice(0, index + 1);
    }
    history.push(stackView);
    window.history.pushState(`${_PAGE.id}`, _PAGE.label, `${_PAGE.path}`);
    publishCallback();
  };

  const pull = () => {
    stackView = history[history.length - 1];
    if (history.length > 1) {
      history = history.slice(0, history.length - 1);
      stackView = history[history.length - 1];
    }
    const _PAGE = stackView[stackView.length - 1];
    window.history.pushState(`${_PAGE.id}`, _PAGE.label, `${_PAGE.path}`);
    publishCallback();
  };

  return {
    setCallback,
    publishCallback,
    init,
    push,
    pull
  };
};

const RouterMount = () => {
  const path = window.location.pathname;
  if (!path) {
    Router.push(PAGES.INDEX);
    return;
  }
  const page = Object.keys(PAGES).find((key) => {
    return PAGES[key].path === path;
  });
  Router.push(PAGES[page]);
};

const Router = _Router();

export { Router, RouterMount };
