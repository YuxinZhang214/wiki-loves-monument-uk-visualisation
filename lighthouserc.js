module.exports = {
    ci: {
      collect: {
        startServerCommand: 'npm run start',
        url: ['http://localhost:3000'],
        startServerReadyPattern: 'started server on',
        startServerReadyTimeout: 120000,
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  };