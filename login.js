const {parse} = require('url')
const {remote, ipcRenderer} = require('electron')
const qs = require('qs')
const axios = require('axios')

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'
const GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me'

async function googleSignIn () {
  const code = await signInWithPopup()
  const tokens = await fetchAccessTokens(code)
  const {id, email, name} = await fetchGoogleProfile(tokens.access_token)
  console.log('after async fetch google profile')
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
      client_id: '484818166811-l38imlkp6f9s2t4p0c8mt9vui0vf7f0q.apps.googleusercontent.com',
      scope: 'profile email',
    }
    const authUrl = `${GOOGLE_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`

    function handleNavigation (url) {
      const query = parse(url, true).query
      if (query) {
        if (query.error) {
          reject(new Error(`There was an error: ${query.error}`))
        } else if (query.code) {
          authWindow.removeAllListeners('closed')
          setImmediate(() => authWindow.close())

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
  const response = await axios.post(GOOGLE_TOKEN_URL, qs.stringify({
    code,
    client_id: '484818166811-l38imlkp6f9s2t4p0c8mt9vui0vf7f0q.apps.googleusercontent.com',
    redirect_uri: 'http://127.0.0.1:8000',
    grant_type: 'authorization_code',
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return response.data
}

async function fetchGoogleProfile (accessToken) {
  console.log('fetch')
  const response = await axios.get(GOOGLE_PROFILE_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  })
  return response.data
}

const google = document.getElementById('google-login')
google.addEventListener('click', () => {
  console.log('cheese')
  googleSignIn()
})

const guest = document.getElementById('guest-login')
guest.addEventListener('click', () => {
  ipcRenderer.send('guest', 'guest')
})
