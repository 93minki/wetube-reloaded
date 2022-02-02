const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, id, username) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newCommnet = document.createElement("li");
  newCommnet.dataset.id = id;
  newCommnet.className = "video__comment";
  const user = document.createElement("span");
  user.innerText = username;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = " ❌";
  span2.addEventListener("click", handleDelete);
  newCommnet.appendChild(user);
  newCommnet.appendChild(icon);
  newCommnet.appendChild(span);
  newCommnet.appendChild(span2);
  videoComments.prepend(newCommnet);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId, newCommentUser } = await response.json();
    console.log(newCommentUser);
    addComment(text, newCommentId, newCommentUser);
  }
};

const handleDelete = async (event) => {
  const commentId = event.target.parentElement.dataset.id;
  const response = await fetch("/api/videos/comments/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId }),
  });
  if (response.status === 200) {
    const comment = document.querySelectorAll(".video__comment");
    comment.forEach((comment) => {
      if (comment.dataset.id === commentId) {
        comment.remove();
      }
    });
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
  const deleteBtns = document.querySelectorAll(".video__delete-comments");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", handleDelete);
  });
}
