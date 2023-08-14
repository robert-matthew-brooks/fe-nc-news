# Northcoders News Website

## Live version:

Front End Website:<br>
https://frontend-nc-news.netlify.app/articles<br>
<small><em>Because the backend host is free, it may take a few moments to spin up when first loading</em></small>

Back End API:<br>
https://be-nc-news-nvms.onrender.com/api

## Summary:

This is a website which I build during my time at the Northcoders bootcamp. It was built to showcase using the `React` framework to present data from a backend api I built earlier in the course. The project focussed on these key frontend topics from the course:

- Responsive CSS - the styling for the website uses vanilla `CSS`, and responds to different screen sizes. To test this in Chrome, press `F12`, then click the `Toggle device` button to simulate a mobile device screen. I used the project as an opportunity to practise styling without resorting to any external templates or frameworks. CSS is very powerful and easy to use, and with practice, the selectors can be fast to target whole groups of elements for styling.

- Mobile First Design - I designed the layout with a smaller screen in mind to begin with. This allowed me to concentrate on what the focus of each page was, and not present too much information to the user. It also allowed the website for function well and display everything that is required on a smaller screen, so that the mobile experience was not an afterthought.

- Loading and Error handling - providing feedback to the user is important, and I made use of `React` states to control when certain areas of the screen could be interacted while loading the backend data. A longer loading time can be simulated in Chrome by pressing `F12`, choosing the `Network` tab, then choosing `Slow 3G` under the throttling menu (remember to turn this back off!). Different areas of the page, eg menu, article content, comments etc have individual loading and error handlers.

- GitHub - the different pages of this project were uploaded to GitHub on separate branches. This allowed me to keep working on a different page or aspect of the website while my submitted branch was being reviewed.

## Areas for further development:

Login functionality - given further time, I would like to have explored options for the login page and user profile pages. Currently the user details are hardcoded, and a boolean React state monitors if the user is logged in or not. While this does work prohibit some functionality such as commenting and deleting comments, it is not ideal. To expand on this, I would need to research how to store information outside of React states (eg cookies) and what legal responsibilities this would involve (eg GDPR/cookie notifications).

Pagination - the data from the backend api is paginated and requires the user to interact with a button to provide more articles, comments etc. However it would be interesting to experiment with loading data on demand when the user scrolls to the end of the currently displayed data. This would require more research into how this could be triggered, but also the economics of api requests - is it more economical to load a lot of data on a single request, and smaller amounts of data spread over multiple requests?

## Future plans:

I have learned a lot about frontend and backend while working on these projects. Rather than develop the nc-news project any further, I'm planning to use the same tech stack to build a website to display portfolio projects that I'm currently working on.