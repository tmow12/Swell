const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  send: (channel, ...data) => {
    // allowlist channels
    const allowedChannels = [
      "toMain",
      "check-for-update",
      "confirm-clear-history",
      "export-collection",
      "fatalError",
      "import-collection",
      "import-proto",
      "open-http",
      "open-gql",
      "open-grpc",
      "protoParserFunc-request",
      "quit-and-install",
      "uncaughtException",
    ];
    if (allowedChannels.includes(channel)) {
      ipcRenderer.send(channel, ...data);
    }
  },
  receive: (channel, cb) => {
    console.log("listening on channel : ", channel);
    // allowlist channels
    const allowedChannels = [
      "fromMain",
      "add-collection",
      "clear-history-response",
      "message",
      "proto-info",
      "protoParserFunc-return",
      "reply-gql",
      "reqResUpdate",
    ];
    if (allowedChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => cb(...args));
    }
  },
});
