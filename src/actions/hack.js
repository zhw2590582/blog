export function download(url, name) {
  const elink = document.createElement("a");
  elink.style.display = "none";
  elink.href = url;
  elink.download = name;
  document.body.appendChild(elink);
  elink.click();
  document.body.removeChild(elink);
}

export default {
  input: /^hack$/i,
  output() {
    download(
      "https://github.com/zhw2590582/alioss-tester/archive/1.0.1.zip",
      "alioss-tester.zip"
    );
    return `
<d color="#009fff" href="https://chrome.google.com/webstore/detail/alioss-tester/dnenemkpgiimpmngociildomilhpdahm">Get from Chrome</d>
<d color="#009fff" href="https://github.com/zhw2590582/alioss-tester">Get from Github</d>
    `.trim();
  },
};
