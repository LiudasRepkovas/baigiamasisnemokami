module.exports = {
  servers: {
    one: {
      host: '139.59.131.21',
      username: 'root',
      pem: './key'
      //pem: 'C:/Users/Liudas/Desktop/baigiamasis/socially/key'
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'Atiduodu',
    path: '../socially',
    docker: {
      //image: 'kadirahq/meteord', // (optional)
      image: 'abernix/meteord:base', // use this image if using Meteor 1.4+
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: false,
    },
    env: {
      ROOT_URL: 'http://139.59.131.21'
    },

    //dockerImage: 'kadirahq/meteord'
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