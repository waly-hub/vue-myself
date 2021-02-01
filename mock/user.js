import Mock from 'mockjs'
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}
const users = {
  'admin-token': {
    roles: [ 'admin' ],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: [ 'editor' ],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

Mock.mock('/vue-myself/user/login', 'post', config => {
  console.log(config);
  const { username } = JSON.parse(config.body)
  const token = tokens[ username ]
  if (!token) {
    return {
      code: 60204,
      message: 'Account and password are incorrect'
    }
  }
  return {
    code: 20000,
    data: token
  }
})

Mock.mock('/vue-myself/user/getInfo', 'post', config => {
  console.log('getInfo', config);
  const { token } = JSON.parse(config.body)
  const info = users[ token ]
  if (!info) {
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  }
  return {
    code: 20000,
    data: info
  }
})
Mock.mock('/vue-myself/user/logout', 'post', config => {

  return {
    code: 20000,
    data: 'success'
  }
})