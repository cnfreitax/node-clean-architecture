module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '3.6.0',
      skipMD5: true,
    },
    instance: {
      dbName: 'jest',
      skipMD5: true,
    },
    autoStart: false,
  },
};
