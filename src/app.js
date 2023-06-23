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

    if (!username || !avatar) {
		
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
    let {username , message} = req.body;

    if (users.length === 0) {
		return res.status(401).send({
			message: 'UNAUTHORIZED'
		});
	}

    if (!username || !tweet) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    const user = users.find( (user) => user.username === username)

    const tweet = {
        
            username: username,
            avatar: user.avatar,
            tweet: message
        
    }

    tweets.push(tweet);
    res.status(201).send("OK")
})

app.get("/tweets", (req, res) => {

    if (tweets.length === 0) {
        return res.status(200).send([])
    }

    if(tweets.length <= 10) {
        tweetsList = tweets.reverse().map( tweet => ({
            username: tweet.username,
            avatar: tweet.avatar,
            tweet: tweet.text
        }))
        return res.status(200).send(tweetsList)        
    }

    if( tweets.length > 10) {
    const tweetsList = tweets.reverse().slice(0,10).map( tweet => ({
        username: tweet.username,
        avatar: tweet.avatar,
        tweet: tweet.text
    }))
    return res.status(200).send(tweetsList)    
    }          
})
//.slice(-10)


app.get("/tweets/:username", (req, res) => {

    const userTweets = tweets.filter((tweet) => req.params.username === tweet.username);

	res.status(200).send("Sucesso")
})


const PORT = 5000
app.listen(PORT, console.log(`Servidor rodando na porta ${PORT}`))

