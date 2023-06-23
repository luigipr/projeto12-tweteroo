import  express  from "express";
import cors from 'cors';
import axios from "axios";

const app = express()
app.use(cors())
app.use(express.json())
const tweets = [];
const users = [];


app.post("/sign-up", (req, res) => {
    let {username, avatar} = req.body;

    if (!username || !avatar || typeof username !== "string" || typeof avatar !== "string") {
		
        return res.status(400).send("Todos os campos são obrigatórios!")
	}
    
    const user = {        
        username: username, 
        avatar: avatar        
    }
    users.push(user);
    res.status(201).send("OK")

})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;

    console.log(username)
    console.log(tweet)

    if (users.length === 0) {
		return res.status(401).send({
			message: 'UNAUTHORIZED'
		});
	}

    if (!username || !tweet || typeof tweet !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    const userpost = users.find( (user) => user.username === username)

    const newTweet = {
        
            username: username,
            tweet: tweet,
            avatar: userpost.avatar,            
        
    }
    console.log (newTweet)
    tweets.push(newTweet);
    res.status(201).send("OK")
})

app.get("/tweets", (req, res) => {


    if (tweets.length === 0) {
        return res.status(200).send([])
    }

    if(tweets.length <= 10) {
        const tweetsList = tweets.reverse().map( tweet => ({
            username: tweet.username,
            tweet: tweet.tweet,
            avatar: tweet.avatar
            
        }))
        return res.status(200).send(tweetsList)        
    }

    if( tweets.length > 10) {
    const tweetsList = tweets.reverse().slice(0,10).map( tweet => ({
        username: tweet.username,
        tweet: tweet.tweet,
        avatar: tweet.avatar
    }))
    return res.status(200).send(tweetsList)    
    }          
})
//.slice(-10)


app.get("/tweets/:username", (req, res) => {
    
    
    const userTweets = tweets.filter((tweet) => req.params.username === tweet.username);

    if (userTweets.length === 0) {
        return res.status(200).send([])
    }

	res.status(200).send(userTweets)
})


const PORT = 5000
app.listen(PORT, console.log(`Servidor rodando na porta ${PORT}`))

