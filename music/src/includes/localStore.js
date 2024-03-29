// 用户信息
const userCollection = {
  name: 'users',
  setUsers: (data) => {
    localStorage.setItem(userCollection.name, JSON.stringify(data))
  },
  getUsers: () => {
    return JSON.parse(localStorage.getItem(userCollection.name)) || []
  },
  removeUser: async (uid) => {
    return new Promise((resolve) => {
      let data = userCollection.getUsers()
      data = data.filter((x) => x.uid === uid)
      userCollection.setUsers(data)
      resolve(data)
    })
  },
  set: async (value) => {
    return new Promise((resolve) => {
      let data = userCollection.getUsers()
      data = data.filter((x) => x.uid !== value.uid)
      data.push(value)
      userCollection.setUsers(data)
      resolve(value)
    })
  }
}

// 认证信息
const auth = {
  currentUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      return user
    }
    user = localStorage.getItem('user')
    return JSON.parse(user)
  },
  createUserWithEmailAndPassword: async (email, password) => {
    return new Promise((resolve, reject) => {
      if (auth.getUserByEmail(email)) {
        reject()
        return
      }

      const data = {
        user: {
          uid: auth.newUID(),
          email,
          password,
          token: '111222333444555666777888999'
        },
        operationType: 'signIn'
      }

      resolve(data)
    })
  },
  signInWithEmailAndPassword: async (email, password) => {
    return new Promise((resolve, reject) => {
      var user = auth.getUserByEmailAndPassword(email, password)
      if (user) {
        resolve(user)
      } else {
        reject()
      }
    })
  },
  signOut: async () => {
    return new Promise((resolve, reject) => {
      const user = auth.currentUser()
      if (user) {
        localStorage.removeItem('user')
        resolve()
      } else {
        reject()
      }
    })
  },
  // 生成用户ID
  newUID: () => {
    return +new Date()
  },
  // 根据UID查找用户
  getUserByUID: (uid) => {
    return userCollection.getUsers().find((x) => x.uid === uid)
  },
  // 根据邮箱查找用户
  getUserByEmail: (email) => {
    return userCollection.getUsers().find((x) => x.email === email)
  },
  // 根据邮箱和密码查找用户
  getUserByEmailAndPassword: (email, password) => {
    return userCollection.getUsers().find((x) => x.email === email && x.password === password)
  }
}

const songCollection = {
  name: 'songs',
  add: (song) => {
    if (!song.docID) {
      song.docID = +new Date()
    }

    let songs = JSON.parse(localStorage.getItem(songCollection.name)) || []
    songs = songs.filter((x) => x.docID !== song.docID)
    songs.push(song)
    localStorage.setItem(songCollection.name, JSON.stringify(songs))
  },
  set: (values) => {
    if (!values.docID) {
      values.docID = +new Date()
    }

    let songs = JSON.parse(localStorage.getItem(songCollection.name)) || []
    let song = songs.find((x) => x.docID == values.docID)
    for (let value in values) {
      song[value] = values[value]
    }
    songs = songs.filter((x) => x.docID !== values.docID)
    songs.push(song)
    localStorage.setItem(songCollection.name, JSON.stringify(songs))
  },
  get() {
    return new Promise((resolve) => {
      let songs = JSON.parse(localStorage.getItem(songCollection.name)) || []
      resolve(songs)
    })
  },
  getSonsByUID: (uid) => {
    let songs = JSON.parse(localStorage.getItem(songCollection.name)) || []
    songs = songs.filter((x) => x.uid === uid)
    return songs
  },
  removeByName: (name) => {
    let songs = JSON.parse(localStorage.getItem(songCollection.name)) || []
    songs = songs.filter((x) => x.modified_name !== name)
    localStorage.setItem(songCollection.name, JSON.stringify(songs))
  },
  getSongByDocID(docID) {
    let songs = JSON.parse(localStorage.getItem(songCollection.name)) || []
    let song = songs.find((x) => x.docID == docID)
    return song
  }
}

const commentCollection = {
  set: (comment) => {
    if (!comment.cID) {
      comment.cID = +new Date()
    }

    let comments = JSON.parse(localStorage.getItem('comments')) || []
    comments = comments.filter((x) => x.cID !== comment.cID)
    comments.push(comment)
    localStorage.setItem('comments', JSON.stringify(comments))
  },
  getCommentsBySID: (sid) => {
    let comments = JSON.parse(localStorage.getItem('comments')) || []
    comments = comments.filter((x) => x.sid === sid)
    return comments
  }
}

export { auth, userCollection, songCollection, commentCollection }
