// const {parse} = require('url')
// const {remote, ipcRenderer} = require('electron')
// const qs = require('qs')
// const axios = require('axios')

const GITHUB_AUTHORIZATION_URL = 'http://github.com/login/oauth/authorize'
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'
//perhaps the below url is causing overly general user info to return
const GITHUB_PROFILE_URL = `https://api.github.com/?`

async function githubSignIn () {
  const code = await signInWithPopup()
  const tokens = await fetchAccessTokens(code)
  console.log('fetched token', tokens)
  // const {id, email, name} = await fetchGithubProfile(tokens.access_token)
  const responseData = await fetchGithubProfile(tokens.access_token, tokens);
  console.log('response from fetchting profile', responseData)
  // const providerUser = {
  //   uid: id,
  //   email,
  //   displayName: name,
  //   idToken: tokens.id_token,
  // }

  return ipcRenderer.send('authorized', responseData)
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
      client_id: '8fcf3e5c2d3d5dd78188',
      client_secret: '0e102c56021e1aa28005b469b3c83ef7cb7e5b0e',
      scope: ['user:email','read:user']
    }
    const authUrl = `${GITHUB_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`

    function handleNavigation (url) {
      console.log('url!', url)
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
//perhaps build another async await function just to grab the dotcom_user from cookie from header from request of access_token
//append dotcom_user to the end of the GITHUB_PROFILE_URL, and then use that to run fetchGithubProfile to get specific user data
async function fetchAccessTokens (code) {
  console.log('code')
  const reqHeader = await axios.post(GITHUB_TOKEN_URL, qs.stringify({
    code,
    client_id: '8fcf3e5c2d3d5dd78188',
    redirect_uri: 'http://127.0.0.1:8000',
    grant_type: 'authorization_code',
    client_secret: '0e102c56021e1aa28005b469b3c83ef7cb7e5b0e',
    scope: ['user:email','read:user']
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Set-Cookie': 'dotcom_user',
    },
  })

  console.log('reqheaders', reqHeader.headers);




  const response = await axios.post(GITHUB_TOKEN_URL, qs.stringify({
    code,
    client_id: '8fcf3e5c2d3d5dd78188',
    redirect_uri: 'http://127.0.0.1:8000',
    grant_type: 'authorization_code',
    client_secret: '0e102c56021e1aa28005b469b3c83ef7cb7e5b0e',
    scope: ['user:email','read:user']
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Set-Cookie': 'dotcom_user',
    },
  })
  console.log('inside fetchgithub token', JSON.stringify(response));
  //return response.data?
  return response
}

async function fetchGithubProfile (accessToken, tokens) {
  console.log('fetch')
  const response = await axios.get(GITHUB_PROFILE_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
      'Set-Cookie': 'dotcom_user'
    },
  })
  
  return response
}

const github = document.getElementById('github-login')
github.addEventListener('click', () => {
  console.log('clicked GitHub Login!')
  githubSignIn()
})