My application is splitted into two directories: "client" for the front end and "server" for the back end.

How to get started:

1. In your editor e. g. Visual Studio Code, open your console and create a directory for the to be cloned q-do repository if you haven't already done yet:
  mkdir julians_projekt 
  
2. Get inside the diretory you want to clone this repository: 
  cd julian_projekt
  
3. Now clone this repository: git clone https://github.com/Guaxinobi/q-do.git
         
      
############################### FRONT END ######################################
4. Once the repository is cloned go into the "client"-directory with the following command:
  cd client
 
5. inside the client-directory type following command to install all packages from the package.json:
  npm install
  
  
6. After that is done, you should be able to start the front end in dev in your browser on http://localhost:3000/ mode with:
  npm start

############################### BACK END ######################################  


Be sure you have already installed some soft ware to create a mysql schema like MYSQL WORKBENCH, NODE Version 12 or higher and XAMPP


7. Start "Apache" and "MySQL" on XAMPP 


8. you can escape the running frontend application with CTRL+C or open a new Terminal-Window with CTRL+SHIFT+5


10. Inside the new terminal switch to the backend Directory with:
  cd ../server
  
  
10. Install all the neccessary packages with:
  npm install
  
  
11. While "npm install" installs all package from the package.json of the server-directory, you should open your MySQL Workbench for example and create a schema called:
  "qdo" 
  
  
12. Once this is done and "npm install" is ready you should be able to start the backend with:
  nodemon server.js
