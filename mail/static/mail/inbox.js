document.addEventListener("DOMContentLoaded", function() {
  // Use buttons to toggle between views
  document
      .querySelector("#inbox")
      .addEventListener("click", () => load_mailbox("inbox"));
  document
      .querySelector("#sent")
      .addEventListener("click", () => load_mailbox("sent"));
  document
      .querySelector("#archived")
      .addEventListener("click", () => load_mailbox("archive"));
  document.querySelector("#compose").addEventListener("click", compose_email);

  // document.querySelector('#send').addEventListener('click', sendEmail);
  document
      .querySelector("#compose-form")
      .addEventListener("submit", (event) => {
          event.preventDefault();
          sendEmail();
      });
  // By default, load the inbox
  load_mailbox("inbox");
});

// Handles the creation and sending of emails.
function compose_email() {
  // Show compose view and hide other views
  document.querySelector("title").innerHTML = "Compose";
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "block";
  // Clear out composition fields
  document.querySelector("#compose-recipients").value = "";
  document.querySelector("#compose-subject").value = "";
  document.querySelector("#compose-body").value = "";
}

// Handles replying to emails.
function replay(id) {
  //   // Show compose view and hide other views
  document.querySelector("title").innerHTML = "Replay";
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "block";
  // fetch one single message the add to compose fields
  fetch(`/emails/${id}`)
      .then((response) => response.json())
      .then((email) => {
          document.querySelector("#compose-recipients").value = email["sender"];
          if (email["subject"].includes("Re:")) {
              document.querySelector("#compose-subject").value = email["subject"];
          } else {
              document.querySelector("#compose-subject").value =
                  `Re: ` + email["subject"];
          }
          document.querySelector("#compose-body").value = `
    
    On ${email["timestamp"]} ${email["sender"]} wrote:
    ${email["body"]}`;
      })
      .catch((error) => {
          console.log(error);
      });
}

// Loads messages within the mailbox.
function load_mailbox(mailbox) {
  //  keep  inbox updet
  if (mailbox == "inbox") {
      setInterval(getMailBox(mailbox), 5000);
  }
  //  set title for bage 
  document.querySelector("title").innerHTML =
      mailbox.charAt(0).toUpperCase() + mailbox.slice(1);
      //  fetch data for mail box 
  getMailBox(mailbox);

  // Show the mailbox and hide other views
  document.querySelector("#emails-view").style.display = "block";
  document.querySelector("#compose-view").style.display = "none";
  document.querySelector("#alert").style.display = "none";
  // Show the mailbox name
  document.querySelector("#emails-view").innerHTML = `<h3>${
  mailbox.charAt(0).toUpperCase() + mailbox.slice(1)
}</h3>`;
}

// Fetches data from the server.
function getMailBox(boxName) {
  // fetch data for one mail
  fetch(`/emails/${boxName}`)
      .then((response) => response.json())
      .then((emails) => {
          // Print emails foe view All mail function
          viewAllMail(emails, boxName);
      })
      .catch((error) => {
          // print error
          console.log(error);
      });
}

// Handles View all for messages  on the mailbox
function viewAllMail(emails, boxName) {
  let emailsView = document.querySelector("#emails-view");

  emailsView.innerHTML = "";
  emails.forEach((item) => {
      //  creat new dev
      let element = document.createElement("div");
      //  inner html by 
      element.innerHTML += `<div  class="   cont-samll "   onclick="getOneMail(${item.id})"  id="${item.id}" >
  <span> <p> ${item.sender} <span > ${item.subject}</span> <span class="float-right">${item.timestamp} </span>   </p></span>
  </div> `;
      if (item.read == true) {
          element.className =
              " container  p-4 m-1 bg-secondary   border border-black ";
          element.innerHTML += `<button class="btn btn-outline-info m-2 " onclick="unReadMail(${item.id})"> Un Read   </button>`;
      } else {
          element.className = " container   p-4 m-1 bg-light   border border-black";
          element.innerHTML += ` <button class="btn btn-outline-info m-2 " onclick="updatReadMail(${item.id})"> Read  </button>`;
      }
      if (boxName == "inbox") {
          element.innerHTML += `
    <button class="btn btn-outline-warning  " onclick="addArchive(${item.id})"> Archive  </button>
   `;
      } else if (boxName == "archive") {
          element.innerHTML += `
    <button class="btn btn-outline-warning  " onclick="unArchive(${item.id})"> UnArchive  </button>
    `;
      } else {
          element.innerHTML += `
    <button class="btn btn-outline-info" > view  </button>
   `;
      }
      emailsView.append(element);
  });
}

// Fetches a single email.
function getOneMail(id) {
  // Fetches a single email by id .
  fetch(`/emails/${id}`)
      .then((response) => response.json())
      .then((email) => {
          // updet read
          updatReadMail0(id);
          //  view single mail
          viewOneMail(email);
      })
      .catch((error) => {
          // print error
          console.log(error);
      });
}

function viewOneMail(emails) {
  const element = document.querySelector("#emails-view");
  element.innerHTML = "";
  let iteams = document.createElement("div");

  // hande multi recipients 
  let recipien = "";
  for (let i in emails["recipients"]) {
      recipien += emails["recipients"][i] + ",";
  }
  iteams.innerHTML += `
  <div class=" " id="${emails["id"]}" >
  <p>From:  ${emails["sender"]}  </p>
  <p>To:   ${recipien} </p>
  <p>Subject: ${emails["subject"]}</p>
  <p>Timestamp: ${emails["timestamp"]}</p>
  <button class="btn btn-outline-info " onclick="replay(${emails["id"]})">Reply </button>
  <hr>
  <textarea class="form-control"  disabled>${emails["body"]}</textarea>
 </div> 
  `;
  if (emails["archived"] == false) {
    iteams.innerHTML += `
    <button class="btn btn-outline-warning m-3 float-right"  onclick="addArchive(${emails["id"]})"> Archive  </button>`;
  } else {
    iteams.innerHTML += `
    <button class="btn btn-outline-warning m-3 float-right"  onclick="unArchive(${emails["id"]})"> UnArchive  </button>`;
  }
  element.append(iteams) 
}

// Archives emails.
function addArchive(x) {
  fetch(`/emails/${x}`, {
      method: "PUT",
      body: JSON.stringify({
          archived: true,
      }),
  }).catch((error) => {
    // print error
    console.log(error);
});
  load_mailbox("inbox");
  // location.reload();
}
//  Unarchives emails.
function unArchive(x) {
  fetch(`/emails/${x}`, {
      method: "PUT",
      body: JSON.stringify({
          archived: false,
      })
  }).catch((error) => {
          // print error
          console.log(error);
      });
  // setTimeout( load_mailbox("inbox"), 3000)
  load_mailbox("inbox");
  // location.reload();
}

// Marks emails as read.
function updatReadMail(x) {
  fetch(`/emails/${x}`, {
      method: "PUT",
      body: JSON.stringify({
          read: true,
      }),
  }).catch((error) => {
    // print error
    console.log(error);
});
  load_mailbox("inbox");
}

function updatReadMail0(x) {
  fetch(`/emails/${x}`, {
      method: "PUT",
      body: JSON.stringify({
          read: true,
      }),
  }).catch((error) => {
    // print error
    console.log(error);
});
}
// / Marks emails as unread.
function unReadMail(x) {
  fetch(`/emails/${x}`, {
      method: "PUT",
      body: JSON.stringify({
          read: false,
      }),
  }).catch((error) => {
    // print error
    console.log(error);
});
  load_mailbox("inbox");
}

// Send emails to server.
function sendEmail() {
  fetch("/emails", {
          method: "POST",
          body: JSON.stringify({
              recipients: document.querySelector("#compose-recipients").value,
              subject: document.querySelector("#compose-subject").value,
              body: document.querySelector("#compose-body").value,
          }),
      })
      .then((response) => response.json())
      .then((result) => {
          viewAlert(result);
      }).catch((error) => {
        // print error
        console.log(error);
    });
}
// view alert messages to user .
function viewAlert(result) {

  document.querySelector("#alert").style.display = "block";
  if (result.message) {
      const iteam = (document.querySelector("#alert").innerHTML = result.message);
      load_mailbox("sent");
  } else {
      const iteam2 = (document.querySelector(
          "#alert"
      ).innerHTML = `<p class="alert alert-warning"> ${result.error}</p>`);
  }
}