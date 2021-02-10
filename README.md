#npm start - to start the server

#endpoints

1.to create a user

  endpoint:/users/create
  
  method:POST
  
  body:{
    "name":"shivam",
    "email":"skdd@gmail.com",
    "age":23,
    "description":"hi"
    }
    
2.to list all users 

   endpint:/users
   
   method:GET
   
3.to get a particular user
  
  endpoint:/users/:id
  
  method:GET

4.to update a user

  endpoint: users/:id
  
  method:PATCH
  
  body:{
    "name":"shivam",
    "email":"skdd@gmail.com",
    "age":23,
    "description":"hi"
  }

5.to delete a user
  
  endpoint:/users/:id
  
  method:DELETE
  
   
