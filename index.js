
document.addEventListener('DOMContentLoaded', function() {

  const yourUUID = 'c900d530-c86f-48de-99f8-b9dc8e64044d'

  const imageURL = `https://randopic.herokuapp.com/images/${yourUUID}`

  let imageId = 876

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  const imgCard = document.querySelector("#image_card")
  const img = document.querySelector("#image_card #image")
  const name = document.querySelector("#image_card #name")
  const span = document.querySelector("#image_card span")
  const likes = document.querySelector("#image_card span span")
  const likeBtn = document.querySelector("#image_card #like_button")
  const form = document.querySelector("#image_card #comment_form")
  const commentsUl = document.querySelector("#image_card #comments")
  // const deleteBtn = document.querySelector("#image_card #comments button")

  likeBtn.addEventListener("click", likeStep)

  form.addEventListener("submit", commentMaker)

  // deleteBtn.addEventListener("click", deleteComment)


  fetchData()

  function fetchData() {
    fetch(imageURL)
      .then(res => res.json())
      .then(data => getData(data))
  }

  function getData(data) {
    img.src = data.url
    name.innerText = data.name
    likes.innerText = data.like_count
    data.comments.forEach(comment => {
      const commentLi = document.createElement('li')
      commentLi.innerText = comment.content
      // const deleteComment = document.createElement('button')
      commentsUl.append(commentLi)
    })
  }

  function likeStep(event) {
    const likeNode = event.target.parentNode.children[2]
    const liker = likeNode.querySelector("#likes")
    ++liker.innerText

    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id:imageId})
    })
  }

  function commentMaker(event) {
    event.preventDefault()
    const parent = event.target.parentNode
    const ul = parent.querySelector("#comments")
    let input = event.target[0].value
    const commentLi = document.createElement('li')
    commentLi.innerText = input
    ul.append(commentLi)
    form.reset()

    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id:imageId, content:input})
    })
  }

  // function deleteComment(event) {
  //   debugger
  // }

  // ## Step 6 - Delete a comment feature
  //
  // This feature is not required and you should only attempt if you have time.
  //
  // When you display new comments add a button next to each comment to delete that comment.
  //
  // Clicking the button should delete the comment from the DOM as well as deleting it from the database.
  //
  // Take the same iterative approach as before.

})
