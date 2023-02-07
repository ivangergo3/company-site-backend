# own-html-site-backend

## Getting started

To start the service locally go to the **/functions** folder run `npm install`. Now you can start the function locally, but as the function is written in typescript, we suggest to use 2 separate terminal one to compile the other to run the function.
Accordingly in the first terminal enter `npm run build`, in the second terminal enter `npm run serve`. If you add any changes please execute the `npm run build` again. This way the compiled javascript will change in the function, so you can see the changes right away.
Please keep in mind the function will still need some restarts form time to time.

If you want to deploy it, you can do so by compiling then run the `npm run deploy` command. You might have some issues to open the endpoint to everyone, not just authenticated users. If so have a look at [this](https://stackoverflow.com/a/69158098)

## Function secrets

You can add a new secret with [this](https://console.cloud.google.com/security/secret-manage) firebase feature. With the create new secret button you can create a new secret that you can use in your function right away. To be able to use it locally, or create the secret programatically please have a look at [this page](https://firebase.google.com/docs/functions/config-env#create-secret)

## Send email

We decided to use mailgun for this purpuse as we would like to use this service to be the backend for a contact us form, we can easily fin into the free tier that offers [5000 emails a month](https://www.mailgun.com/pricing/). It is a really well documented API, so its quite easy to set it up.
