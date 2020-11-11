import "normalize.css";
import Term from "term-web";
import actions from "./actions";

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

const term = new Term({
  container: ".term",
  width: 600,
  height: 500,
  pixelRatio: 2,
  autofocus: true,
  fontFamily: "monospace",
  title: "老赵茶馆",
  watermark: document.getElementById("watermark").src,
  actions,
  welcome: '🎉 <d color="yellow">恭喜你发现了宝藏，就差钥匙打开了</d>',
});

if (isMobile) {
  document.body.classList.add("isMobile");
  term.events.draggie.destroy();
  term.emit("resize", {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  });
}