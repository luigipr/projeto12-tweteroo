import  express  from "express";
import cors from 'cors';
import axios from "axios";

const app = express()
app.use(cors())
const tweets = [];
const users = [];


app.post("/sign-up", (req, res) => {
    let {username, avatar} = req.params
    const user = {        
            username: username, 
            avatar: avatar        
    }
    users.push(user);
    res.send(user)
})

app.post("/tweets", (req, res) => {
    let {username , message} = req.params;

    const user = users.find( (user) => user.username === username)

    const tweet = {
        
            username: username,
            avatar: user.avatar,
            tweet: message
        
    }
    tweets.push(tweet);
    res.send(tweet)
})



app.get("/tweets", (req, res) => {

    if (tweets.length === 0) {
        res.send('Não há tweets para serem exibidos neste momento')
    }
    tweets.map( tweet => ({
        username: tweet.username,
        avatar: tweet.avatar,
        tweet: tweet.text
    }))
    res.send(tweets)              
})
//.slice(-10)

const PORT = 5000
app.listen(PORT, console.log(`Servidor rodando na porta ${PORT}`))

