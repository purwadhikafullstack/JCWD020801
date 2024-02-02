module.exports = {
    apps: [
      {
        name: "JCWDOL-0208-01", // Format JCWD-{batchcode}-{groupnumber}
        script: "./projects/server/src/index.js",
        env: {
          NODE_ENV: "production",
          PORT: 2801,
        },
        time: true,
      },
    ],
  };
  