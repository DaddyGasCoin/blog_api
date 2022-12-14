# blog_api
# Summary
 An API for the blog using nodejs and mongodb
 
[frontend preview](https://blog-frontend-jy6q.onrender.com/) :point_left:

[CMS](https://blog-cms-seven.vercel.app/)

## Features
 - View individual post and comments
 - Proteced routes using JWT
- Authenticating user using JWTT

## Tools

### Frameworks
- [React](https://reactjs.org/)
### Packages
- [React Router](https://reactrouter.com/)
- [axios](https://axios-http.com/)
 
### Database
- [MongoDB](https://mongodb.com/)
## API Endpoints
 Get all posts
```
 /posts
```
```
 
  axios.get('https://blogapi-production-d43c.up.railway.app/posts')
  //sample respose
  {
    "posts": [
        {
            "_id": "636839033339208bbf2a7510",
            "title": "test title",
            "date": "2022-11-06T22:45:23.688Z",
            "message": "test message",
            "user": {
                "_id": "63646cae406f4377ccde825d",
                "first_name": "Test First Name",
                "last_name": "Test Second Name",
                "username": "test_user"
            },
            "comments": [],
            "__v": 0
        },
        {
            "_id": "637510b8db336b0296d5e3f1",
            "title": "Hello world!",
            "date": "2022-11-16T16:32:56.615Z",
            "message": "First message",
            "user": {
                "_id": "63646cae406f4377ccde825d",
                "first_name": "Test First Name",
                "last_name": "Test Second Name",
                "username": "test_user"
            },
            "__v": 0
        }
    ]
}
```
### Only users with admin privillage can delete and update posts

 Delete post
 ```
  /post/:id/delete
  
  //Needs JWT token for header
  axios.post('https://blogapi-production-d43c.up.railway.app/post/${id}/delete',
               headers: {
                  'Authorization': `Bearer ${user.token}`
               }

  ```
  Update post
  ```
  /post/:id/update
    //Needs JWT token for header
  axios.post('https://blogapi-production-d43c.up.railway.app/post/${id}/update',
               headers: {
                  'Authorization': `Bearer ${user.token}`
               }
  ```
   Get content of speciffic post
  ```
   /post/:id/
   
    axios.get(`https://blogapi-production-d43c.up.railway.app/post/${postID}`)
   //Sample response
   {
    "commets": [
        {
            "_id": "6375626e50a0e65624ebb283",
            "date": "2022-11-16T22:21:34.377Z",
            "message": "NICE ONE!",
            "postID": "637510b8db336b0296d5e3f1",
            "user": {
                "admin": false,
                "_id": "63646cae406f4377ccde825d",
                "first_name": "Test First Name",
                "last_name": "Test Second Name",
                "username": "test_user",
                "password": "$2a$10$fIeJ8UhCDT8i1DvRmMMbDukLWZ5MUAfaQPc31YiYdJ3SYJsQbTbQ2",
                "__v": 0
            },
            "__v": 0
        },
    ],
    "post": {
        "_id": "637510b8db336b0296d5e3f1",
        "title": "Hello world!",
        "date": "2022-11-16T16:32:56.615Z",
        "message": "First message",
        "user": {
            "admin": false,
            "_id": "63646cae406f4377ccde825d",
            "first_name": "Test First Name",
            "last_name": "Test Second Name",
            "username": "test_user",
            "password": "$2a$10$fIeJ8UhCDT8i1DvRmMMbDukLWZ5MUAfaQPc31YiYdJ3SYJsQbTbQ2",
            "__v": 0
        },
        "__v": 0
    }
}
  ```
   Create User
  ```
  /user/create
   axios.post('https://blogapi-production-d43c.up.railway.app/user/create',
      {
         username: value,
         password: values,
         first_name: value,
         last_name: valueu
       })
   // response return JWT if created succesfully
  ```
  User loginn
  ```
  /user/login
   axios.post('https://blogapi-production-d43c.up.railway.app/user/login',
    {
     username: values.username,
     password: values.password
    })
  // Returns JWT if logon success
  ```
 Create comment
  ```
  /comment/:id/create
  axios.post(`https://blogapi-production-d43c.up.railway.app/comment/${postID}/create`,
    {
        message: value
     }, {
      headers: {
        'Authorization': `Bearer ${user.token}`
               }
   })
   
  ```
  Delete comment
  ```
  /comment/:id/delete
  
    axios.post(`https://blogapi-production-d43c.up.railway.app/comment/${postID}/delete`,
    {
        message: value
     }, {
      headers: {
        'Authorization': `Bearer ${user.token}`
               }
   })
  ```
  

