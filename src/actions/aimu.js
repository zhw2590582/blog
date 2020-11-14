export default {
  input: /^aimu$/i,
  output() {
    this.output(`<d color="yellow">Loading...</d>`);
    fetch("http://localhost:8080/statistics")
      .then((res) => res.json())
      .then(({ data }) => {
        this.output(
          Object.keys(data)
            .map((key) => {
              return `<d color="#66d9ef">${key}</d> - <d color="#50fa7b">${data[key].total}</d>`;
            })
            .join("\n"),
          true
        ).input("");
      });
  },
};
