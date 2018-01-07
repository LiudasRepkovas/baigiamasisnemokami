module.exports = {
  servers: {
    one: {
      host: '46.101.152.112',
      username: 'root',
      pem: 'F:/Desktop/raktai/exported.pem'
        // password:
        // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'bilietukai',
    path: './',
    servers: {
      one: {}
    },
    docker: {
      image: 'abernix/meteord:base', // (optional)
    },
    buildOptions: {
      buildLocation: '../../mup-build/',
      serverOnly: false
    },
    env: {
      AOT: 1,
      ROOT_URL: 'http://46.101.152.112/',
      PORT: 80
    },
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};