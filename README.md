# Node_Server_Test
Sandbox environment to try executing various node scripts


The primary use of this application is to have a sandbox environment for developing node scripts as well as executing them here. Currently, there is only one script being used in the live development. This is included in the Server.js file where it gets executed but actually its the Treadmaxx.js file that is being executed. In order to format the updated treadmaxx:
1. Clone the repo to a location on your computer
2. Install nodemon "npm install -g nodemon"  The '-g' tells your system to install it globally so now you can easily serve up node scripts and nodemon also updates automatically when you save changes to a file. 
3. Go into the public directory and erase the existing Treadmaxx2.json file.
4. Paste the new Treadmaxx2.json file in the public folder.
5. Type "nodemon server.js" into the command prompt. 
6. After a couple of seconds it will say that the server is online, and begin to start printing "Data written to file." over and over again in an infinite loop. When you get the first message "Data written to file." you can hit ctrl+c in order to terminate the batch job. If you do not type ctrl+c and then 'y' when prompted, the program will run forever so don't forget to exit out of this. This is not a desired function and will be addressed and corrected soon in an issue. 
7. After the data has been written to file, the treadmaxxFixed.json now contains the newest treadmaxx data formatted for the app perfectly. Simply copy that file and replace the existing treadmaxxFixed.json in the live API public folder. 
