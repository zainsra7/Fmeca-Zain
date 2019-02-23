# Fmeca-Zain
Risk Assessment tool developed to help CA's perform risk analysis of OES systems under NIS Directive.

This tool was a part of open assessment for Safety Critical Systems module at University of Glasgow. (2019)

See the tool in action -> http://fmeca-zain.herokuapp.com

## Technologies used
![technologies](https://github.com/zainsra7/Fmeca-Zain/blob/master/Screenshots/Technologies.PNG)

The developed tool has a minimalistic design and the emphasis was put on the interface and client-side technologies.

The application logic of the tool is written in JavaScript/jQuery and the complete application contain three main files:

•	Index.html

•	Index.css

•	Index.js

It took almost two days to develop and test the tool, and on completion it was deployed on cloud. 
Heroku was used as the PAAS (Platform as a Service) with underlying Django server, whose job is to display content from above files to the user. 
## Features

Following are the features of the tool:

•	On start, tool shows the proposed solution of the author of this report in form of a risk matrix

•	Tool allows CA to add hazard which involves giving title, severity level, detection rate, likelihood of occurrence, causes and actions in a user-friendly HTML form

•	Tool allows CA to view hazard table which displays sorted list of all hazards based on modified RPN scores. 

•	Tool allows CA to edit/view/delete any Hazard by clicking on the title of the hazard in the risk matrix

•	Tool contains a questionnaire which is used for evaluation

•	Tool displays error-messages for wrong input, or in case there are no hazards to display.

•	Tool is deployed on the cloud (Heroku) as a web application.


## Screenshots

### Main Page
![Main Page](https://github.com/zainsra7/Fmeca-Zain/blob/master/Screenshots/Matrix-Main2.PNG)
### Hazard Details
![Hazard Details](https://github.com/zainsra7/Fmeca-Zain/blob/master/Screenshots/Matrix-Main2.PNG)
### Add/Edit Hazard
![Edit/Add Hazard](https://github.com/zainsra7/Fmeca-Zain/blob/master/Screenshots/Hazard-Edit2.PNG)
### Hazard Table
![Hazard Table](https://github.com/zainsra7/Fmeca-Zain/blob/master/Screenshots/Hazard-Table2.PNG)
### Reset Matrix
![Reset Matrix](https://github.com/zainsra7/Fmeca-Zain/blob/master/Screenshots/Matrix-Reset2.PNG)
### Questionnaire
![Questionnaire](https://github.com/zainsra7/Fmeca-Zain/blob/master/Screenshots/Questionnaire.PNG)
### Tool Info
![Tool Information](https://github.com/zainsra7/Fmeca-Zain/blob/master/Screenshots/Info2.PNG)
