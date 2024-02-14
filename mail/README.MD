# Mail App README

## Overview
This README provides an overview of the Mail App built using Django for the backend and JavaScript for the frontend.


## Backend (Django)

### Views (views.py)
1. **compose:** Handles the creation and sending of new messages.
2. **mailbox:** Displays messages within the mailbox.
3. **email:** Displays a single chosen email.
4. **login:** Handles user authentication and login.
5. **logout:** Handles user logout.
6. **register:** Handles user registration.

## Frontend (JavaScript)

### Functions (script.js)
1. **composeEmail:** Handles the creation and sending of emails.
2. **reply:** Handles replying to emails.
3. **loadMailbox:** Loads messages within the mailbox.
4. **getMailbox:** Fetches the mailbox. 
5. **viewAllMail:** Handles View  for messages  on the mailbox
6. **getOneMail:** Fetches a single email.
7. **viewOneMail:**  View a single email
8. **addArchive:** Archives emails.
9. **unarchive:** Unarchives emails.
10. **updatReadMail:** Marks emails as read.
10. **markUnread:** Marks emails as unread.
11. **sendEmail** Send emails to server.
12. **viewAlert** view alert messages to user .

## Setup Instructions
1. Clone the repository.
2. Install dependencies for both Django and JavaScript.
3. Configure Django settings, such as database connection and email settings.
4. Run Django server.
5. Access the application via a web browser.

## Dependencies
- Django
- JavaScript 
- Database (SQLite)

## Usage
1. Register a new account or login if you already have one.
2. Compose a new email or reply to existing emails.
3. View your mailbox to see received emails.
4. Click on an email to view its contents.
5. Archive or unarchive emails as needed.
6. Mark emails as read or unread.



## Contributors
- [Elhusseini Taha]

## license
- [Open source]
