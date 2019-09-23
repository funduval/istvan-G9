> I was really hoping to get this working by running: 

docker-compose build
docker-compose up

>But I really struggled with it, had it always 'almost working.'
>I removed the reference to the docker mongo instance in docker-compose.yml 
>and instead provisioned my own remote mongo server, using mlab. 
>The pword for the mlab url is in the .env file, but I won't chance it, and will leave it here:

`mongodb://test-user:t35tpw0rd@ds229878.mlab.com:29878/funda-test
`

>The above mongo db instance works in the app, without the need for a docker build.

###It Works On My Machine

>To run this project locally, follow these steps:

>From the root of the main project directory

`cd api`
`npm install`
`npm start`
>express app is listening on port 9000`

`cd ..`
`cd client`
`npm install`
`npm start` 
>React app is viewable on localhost:3000


###SUMMARY
######I attempted to make a fullstack app with CRUD operations and a working backend. 
######However, in its unfinished state, you can only Create new videos with this, 
######and view them in the UI.

###CHALLENGES
######I struggled for a full day with docker (I know, working backwards!) and another full day with building the routes and posting the data correctly (I really wanted to use the FormData object, as a minimalistic approach, but it only seemingly returns an object --this took me a while to work through.)

######I am sorry to submit an unfinished project after so much progress but I do have coding obligations at work, and I can't commit any further to this. I appreciate the time and consideration you extended to me. Thank you for the opportunity to challenge myself in this way--it will prove very useful!!!!

Best wishes,

Funda Istvan
