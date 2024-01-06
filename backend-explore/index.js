console.log("Chai aur code");
const env = require("dotenv").config()
const express = require('express')
const port = https://backend-wine-alpha.vercel.app/
const app = express()
const gopal = {
    "login": "Gopal-nd",
    "id": 140260168,
    "node_id": "U_kgDOCFwzSA",
    "avatar_url": "https://avatars.githubusercontent.com/u/140260168?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Gopal-nd",
    "html_url": "https://github.com/Gopal-nd",
    "followers_url": "https://api.github.com/users/Gopal-nd/followers",
    "following_url": "https://api.github.com/users/Gopal-nd/following{/other_user}",
    "gists_url": "https://api.github.com/users/Gopal-nd/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Gopal-nd/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Gopal-nd/subscriptions",
    "organizations_url": "https://api.github.com/users/Gopal-nd/orgs",
    "repos_url": "https://api.github.com/users/Gopal-nd/repos",
    "events_url": "https://api.github.com/users/Gopal-nd/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Gopal-nd/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Gopal N D",
    "company": null,
    "blog": "",
    "location": null,
    "email": null,
    "hireable": null,
    "bio": null,
    "twitter_username": null,
    "public_repos": 26,
    "public_gists": 0,
    "followers": 2,
    "following": 3,
    "created_at": "2023-07-22T14:29:00Z",
    "updated_at": "2024-01-06T06:31:58Z"
  }
app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.get('/login',(rq,res)=>{
    res.send('login now to acces the data')
})
app.get('/html',(rq,res)=>{
    res.send(`<h1>h1 heading</h1>`)
})
app.get('/gopal',(rq,res)=>{
    res.json(gopal)
})

app.listen(port,()=>{
    console.log(`runing on port ${port}`)
})