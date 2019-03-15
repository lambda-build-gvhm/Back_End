## Tech used

- `Node.js`
- `Express`
- `JWT`
- `Bcrypt`
- `Jest`
- `Supertest`

## Description

This is the back-end app for the gun violence heatmap project for build week. Created with the above tech, including `Json Web Tokens` for authentication and `Bcrypt` for hashing, connecting to a `React` web application for the client.

User is able to create, update, and delete their personal account for the app.

#### Endpoints

| Method | Endpoint      | Description                                                                                                                                  |
| ------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/register | Creates a `user` using the information sent inside the `body` of the request. **password is hashed** before saving the user to the database. |

| POST | /api/login | Uses the credentials sent inside the `body` to authenticate the user. On successful login, creates a new JWT with the user id as the subject and send it back to the client. If login fails, responds with the correct status code and the message: 'username/password combo is wrong' |

| PUT | /api/update/:id | If the user is logged in, they are able to adjust their username and or password with this endpoint. If password is new, it is hashed before saving to database. **this is a protected route that requires authentication to hit**|

| DELETE | /api/delete/delete/:id | If the user is logged in, they are able to delete their entire account from the database by hitting this endpoint. **this is a protected route that requires authentication to hit**|
