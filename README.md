 <img src="https://user-images.githubusercontent.com/43398149/188796531-2cf70461-c5b3-40c4-922f-4726b15db3fe.png" height="60">

<br/>

 # NoteVote

 NoteVote is an online platform that connects public spaces to music that their users love. 

 **"I love democracy" - Senator Palpatine**

# How to use it?

If you are a:

* **Host** - you can create a host account where you can control your playlist parameters. You get a host id with which your users can find you and vote for music. You can sync the user-generated playlist with your Spotify account - magic!

* **User** - all you need to do is find your desired host. You can then choose the song you'd like to vote for and the host playlist gets updated accordingly! Your voting content and frequency will depend on the restrictions set by the host

<br>
<br>

# Technologies Used
The following techologies and languages are part of the stack for NoteVote:

* **MongoDB (Atlas)** - The way that the host data was structured, I felt that it made sense to use a NoSQL database. MongoDB has turned out to be an excellent choice especially for managing nested data such as playlist information. In addition, Atlas (MongoDB's cloud offering), has been instrumental in making deployment much easier.

* **Django** - There's no particular reason I chose Django over Express for the backend. I have been working with Django very closely for the past 4 months and found myself more comfortable using it. The backend manages the REST API for the groups/hosts and updates the MongoDB database accordingly

* **React** - With little to none state management required coupled with my hatred for vanilla JS, React was a no-brainer for this project. 

* **Auth0** - Auth0 helps make identity and access management functions such as authentication, authorization, social connections (Oauth 2.0) much easier. It was not worth the time to implement my own database with user and host credentials.

<br>
<br>

# Improvements / Upcoming Changes

* Ability to search host by their name
* Enforcing playlist length and votes-per-day limit
* Adding additional restrictions such as song length, genre and content filters to host preferences
* Better ways for users and hosts to navigate dashboards and voting pages


<br>
<br>

# Don't like something about NoteVote?
I appreciate any kind of input towards the functioning and the design of NoteVote greatly. Feel free to reach out to me: a7nagpal@uwaterloo.ca