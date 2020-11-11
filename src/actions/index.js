import bilibili from "./bilibili";
import v2ex from "./v2ex";
import hack from "./hack";

export default [
  bilibili,
  v2ex,
  hack,
  {
    input: /^clear$/i,
    output() {
      this.clear();
      return '<d color="#27C93F">Cleared successfully</d>';
    },
  },
];
