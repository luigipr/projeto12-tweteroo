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

    if (!user.username|| !user.avatar || typeof user.username !== "string" || typeof user.avatar !== "string") {
		return res.status(400).send("Todos os campos são obrigatórios!")
	}

    tweets.push(tweet);
    return res.send(tweet)


})



app.get("/tweets", (req, res) => {

    if (tweets.length === 0) {
        return res.send([])
    }

    if( tweets.length > 0 && tweets.length < 10) {
        tweets.reverse().map( tweet => ({
            username: tweet.username,
            avatar: tweet.avatar,
            tweet: tweet.text
        }))
        return res.send(tweets)        
    }

    if( tweets.length > 10) {
    tweets.reverse().slice(0,11).map( tweet => ({
        username: tweet.username,
        avatar: tweet.avatar,
        tweet: tweet.text
    }))
    return res.send(tweets)    
}          
})
//.slice(-10)


app.get("/tweets/:username", (req, res) => {



	res.send(tweets.filter((tweet) => req.params.username === tweet.username))
})


const PORT = 5000
app.listen(PORT, console.log(`Servidor rodando na porta ${PORT}`))

