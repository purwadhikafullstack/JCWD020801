module.exports = {
    apps: [
      {
        name: "JCWD-0208-01", // Format JCWD-{batchcode}-{groupnumber}
        script: "./apps/api/src/index.js",
        env: {
          NODE_ENV: "production",
          PORT: 2801,
        },
        time: true,
      },
    ],
  };
  