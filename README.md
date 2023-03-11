# Kattalk social network by Prinyapon Prinyanut

![Screenshot 2023-03-08 at 1 23 37 PM](https://user-images.githubusercontent.com/100139381/223712502-43142a2c-5353-4bb5-9426-d1b34f4a805e.png)

## Description

The project was to create a responsive social media service for Noroff Sutdents by using Javascript.

## Goals

1. Register Profile
2. Authenticate Profile (login)
3. Logout
4. Use Token to interact with the API

### Register

1. Create an HTML form with the correct fields
2. Set an even listener for submission
3. Send details to the API
4. User-friendly response

### Authenticate

1. Create an HTML form with the correct fields
2. Set an even listener for submission
3. Send details to the API
4. Store token from response
5. User-friendly response

### Logout

1. Clear token from local storage
2. User-friendly response

### Interact using Token

1. Create a function to fetch with token
2. Create HTML forms for the required tasks
3. Create functions to handle POST, PUT, & DELETE
4. User-friendly response

## The pages are:

1. Home page
2. Profile page
3. Login page
4. Register page
5. Individual post page

### Home page

This page has a feed of entries from Noroff API (which can be clicked to view in an individual post page), a search bar, and a form to create a new entry. It will redirect to Login page if the user hasn't signed in (no token in local storage).
The user can also edit or delete his/her own post. Users can also view the comments and reactions to each post.

### Profile page

This page has a profile avatar of the user (if it was provided during a new user registeration), a banner (if it was provided during a new user registeration), name, and email of the user.

### Login page

This page has a form validation to login to the application. A modal will pop up and show a message for both successful login and fail login.

### Register page

This page has a form validation to register a new user for the application. A modal will pop up and show a message for both successful register and fail register.

### Individual post page

This page shows an individual post that was clicked to view from the Home page.

## Trello

Trello was used to plan the project >>
[Kattalk Trello](https://trello.com/b/V6fRQZEG/kattalk-js2)

## Contact

[My Linkedin page](https://www.linkedin.com/in/genie-prinyanut-ab3441257/)

[My Website](https://genieprinyanut.netlify.app/)
