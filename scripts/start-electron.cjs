const spawn = require("child_process").spawn;
const waitOn = require("wait-on");
const config = require("../config/index.json");

async function startElectron() {
  try {
    console.log("等待 Vite 服务器启动...");
    // 等待 Vite 服务器启动并获取实际端口
    await waitOn({
      resources: ["http://localhost:" + config.port],
      timeout: 30000,
      validateStatus: (status) => status >= 200 && status < 300,
    });
    // 启动 Electron
    const electronProcess = spawn("electron", ["./main.js"], {
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_ENV: "development",
        VITE_DEV_SERVER_URL: "http://localhost:" + config.port,
      },
    });

    electronProcess.on("close", (code) => {
      console.log(`Electron 进程退出，代码: ${code}`);
    });
  } catch (error) {
    console.error("启动失败:", error.message);
    process.exit(1);
  }
}

startElectron();
