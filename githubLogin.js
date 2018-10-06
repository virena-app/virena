// const {parse} = require('url')
// const {remote, ipcRenderer} = require('electron')
// const qs = require('qs')
// const axios = require('axios')

const GITHUB_AUTHORIZATION_URL = 'http://github.com/login/oauth/authorize'
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'
const GITHUB_PROFILE_URL = 'https://api.github.com/?'

async function githubSignIn () {
  const code = await signInWithPopup()
  const tokens = await fetchAccessTokens(code)
  console.log(tokens)
  const {id, email, name} = await fetchGithubProfile(tokens.access_token)
  const providerUser = {
    uid: id,
    email,
    displayName: name,
    idToken: tokens.id_token,
  }

  return ipcRenderer.send('authorized', providerUser)
}

function signInWithPopup () {
  return new Promise((resolve, reject) => {
    const authWindow = new remote.BrowserWindow({
      width: 500,
      height: 600,
      show: true,
    })

    // TODO: Generate and validate PKCE code_challenge value
    const urlParams = {
      response_type: 'code',
      redirect_uri: 'http://127.0.0.1:8000',
      client_id: process.env.GITINIT,
      client_secret: process.env.GITSEE
    }
    const authUrl = `${GITHUB_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`

    function handleNavigation (url) {
      const query = parse(url, true).query
      console.log(query)
      if (query) {
        if (query.error) {
          reject(new Error(`There was an error: ${query.error}`))
        } else if (query.code) {
          // Login is complete
          authWindow.removeAllListeners('closed')
          setImmediate(() => authWindow.close())

          // This is the authorization code we need to request tokens
          resolve(query.code)
        }
      }
    }

    authWindow.on('closed', () => {
      // TODO: Handle this smoothly
      throw new Error('Auth window was closed by user')
    })

    authWindow.webContents.on('will-navigate', (event, url) => {
      handleNavigation(url)
    })

    authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      handleNavigation(newUrl)
    })

    authWindow.loadURL(authUrl)
  })
}

async function fetchAccessTokens (code) {
  console.log('code')
  const response = await axios.post(GITHUB_TOKEN_URL, qs.stringify({
    code,
    client_id: process.env.GITINIT,
    redirect_uri: 'http://127.0.0.1:8000',
    grant_type: 'authorization_code',
    client_secret: process.env.GITSEE
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return response.data
}

async function fetchGithubProfile (accessToken) {
  console.log('fetch')
  const response = await axios.get(GITHUB_PROFILE_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
  })
  return response.data
}

const github = document.getElementById('github-login')
github.addEventListener('click', () => {
  console.log('clicked GitHub Login!')
  githubSignIn()
})