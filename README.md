# Django Email Client

This project is a single-page email client built using **Django**, **HTML**, **CSS**, and **JavaScript**. The application supports sending, receiving, and managing emails with a user-friendly interface. It also leverages Django's backend to handle user authentication, email management, and API endpoints for a seamless client experience.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [License](#license)

---

## Features

1. **Authentication**

   - User registration, login, and logout functionality.
2. **Send Mail**

   - Compose and send emails to registered users.
   - Use `fetch` API to POST email data to the backend.
3. **Mailboxes**

   - View Inbox, Sent, and Archive mailboxes.
   - Each email displays:
     - Sender
     - Subject
     - Timestamp
   - Read/unread emails styled differently.
4. **View Email**

   - View detailed information about an email, including:
     - Sender, recipients, subject, timestamp, and body.
   - Mark emails as read.
5. **Archive/Unarchive Emails**

   - Archive emails from Inbox.
   - Unarchive emails from the Archive mailbox.
6. **Reply to Emails**

   - Pre-fill the compose form with sender, subject, and original email body for replying.

---

## Installation

### Prerequisites

- Python 3.8+
- Django 4.0+

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Elhussin/wiki.git
   cd django-wiki
   ```
2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
3. Run database migrations:

   ```bash
   python manage.py migrate
   ```
4. Start the development server:

   ```bash
   python manage.py runserver
   ```
5. Access the application:
   Open your browser and navigate to [http://localhost:8000](http://localhost:8000).

---

## Usage

### User Authentication

- Register as a new user or log in with existing credentials.
- After logging in, you are redirected to your inbox.

### Compose Email

- Click "Compose" to open the email composition form.
- Fill in:
  - **Recipients**: Comma-separated email addresses.
  - **Subject**: The subject of the email.
  - **Body**: The message content.
- Click "Send" to deliver the email.

### Mailboxes

- Navigate between Inbox, Sent, and Archive using the navigation menu.
- Emails are displayed in reverse chronological order.
- Unread emails have a white background; read emails have a gray background.

### View Email

- Click on an email to view its details.
- Emails are automatically marked as read when viewed.

### Archive/Unarchive

- Archive emails from the Inbox.
- Unarchive emails from the Archive mailbox.

### Reply

- Click "Reply" to respond to an email.
- The compose form is pre-filled with the original sender, subject, and body.

---

## API Endpoints

### `/emails/<mailbox>` [GET]

- Retrieves emails for the specified mailbox (`inbox`, `sent`, or `archive`).

### `/emails` [POST]

- Sends a new email.
- **Request Body**:
  ```json
  {
    "recipients": "example@example.com",
    "subject": "Subject Text",
    "body": "Message content."
  }
  ```

### `/emails/<email_id>` [GET]

- Retrieves details of a specific email.

### `/emails/<email_id>` [PUT]

- Updates email properties such as `read` or `archived`.
- **Request Body**:
  ```json
  {
    "read": true,
    "archived": false
  }
  ```

---

## Project Structure

```
mail/
├── static/         # Contains CSS, JS, and static assets
├── templates/      # HTML templates
├── migrations/     # Database migrations
├── models.py       # Email and User models
├── views.py        # Django views and API endpoints
├── urls.py         # URL routing
└── inbox.js        # Frontend logic for the SPA
```

---

## Contributors

- **Elhusseini Taha**

---

## License

This project is licensed under the [MIT License](LICENSE).
