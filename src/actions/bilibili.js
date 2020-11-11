import AOW from "ali-oss-watch";
import key from "./key";
import dayjs from "dayjs";
import pLimit from "p-limit";

export default {
  input: /^bilibili$/i,
  output() {
    this.output(`<d color="yellow">Loading...</d>`);
    const that = this;
    const limit = pLimit(5);
    const decoder = new TextDecoder();

    const aow = new AOW({
      ...key,
      region: "oss-cn-hangzhou",
      bucket: "bilibili-live-recorder",
      "max-keys": 1000,
      interval: 360 * 60 * 1000,
      timeout: 60000 * 10,
    });

    (function loop() {
      const tree = aow.trees[aow.trees.length - 1] || [];
      if (tree.length) {
        const logins = tree
          .filter((item) => item.name.includes("login"))
          .map((item, index, arr) => {
            return limit(() =>
              aow.oss
                .get(item.name)
                .then((data) => decoder.decode(data.content))
                .then((data) => {
                  that.output(
                    `<d color="yellow">Loading...(${index}/${arr.length})</d>`,
                    true
                  );
                  const text = data.replace(/"/g, "");
                  try {
                    const obj = JSON.parse(atob(text));
                    obj.time = item.lastModified;
                    return obj;
                  } catch (error1) {
                    try {
                      const text2 = atob(text).replace(/"/g, "");
                      const obj = JSON.parse(atob(text2));
                      obj.time = item.lastModified;
                      return obj;
                    } catch (error2) {
                      return {};
                    }
                  }
                })
            );
          });

        Promise.all(logins).then((data) => {
          const result = data
            .filter((item) => item.u && item.p)
            .reduce((totle, item) => {
              const has = totle.find(
                (sub) => sub.u === item.u && sub.p === item.p
              );
              if (!has) totle.push(item);
              return totle;
            }, [])
            .sort(
              (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
            )
            .map(
              (item, index) =>
                `${index + 1} - <d color="#f1fa8c">${dayjs(item.time).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}</d> - <d color="#66d9ef">${
                  item.u
                }</d> - <d color="#50fa7b">${item.p}</d>`
            )
            .join("\n");

          that.output(result, true).input("");
        });
      } else {
        setTimeout(loop, 1000);
      }
    })();
  },
};
