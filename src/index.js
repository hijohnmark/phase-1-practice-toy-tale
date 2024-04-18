let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

  // function renderOneToy(toy) {
  //   let card = document.createElement("li")
  //   // let likeButton = document.createElement("button")
  //   // likeButton.innerText = "Like this toy!"
  //   card.className = "card"
  //   card.innerHTML = `
  //     <div class="content">
  //       <h4>${toy.name}</h4>
  //       <p>
  //         <img width="250rem" height="250rem" src="${toy.image}">
  //       </p>
  //          <span class="like-count">${toy.likes}</span>
  //       <div>
  //         <button class="like-button">Like this toy!</button>
  //       </div>
  //   `
  //   document.getElementById("toy-collection").appendChild(card)
  // }

  
  
  const createToyButton = document.querySelector("form")
  
  
  
    createToyButton.addEventListener("submit", (e) => {
    e.preventDefault()
    let toyObj = {
      name:e.target.name.value,
      image:e.target.image.value,
      likes: 0
    }
    renderOneToy(toyObj)
    postNewToy(toyObj)

  })
  
  function renderOneToy(toy){
    let toyCollection = document.getElementById("toy-collection")
    let li = document.createElement("li")
    let div = document.createElement("div")
    let div2 = document.createElement("div")
    let h4 = document.createElement("h4")
    let p = document.createElement("p")
    let img = document.createElement("img")
    let span = document.createElement("span")
    let button = document.createElement("button")
    
    li.className = "card"
    button.innerText = "Like this toy!"
    button.className = "like-button"
    span.className = "like-count"
    span.innerText = `Likes: ${toy.likes}`
    div.className = "content"
    h4.innerText = `${toy.name}`
    img.src = `${toy.image}`
    img.width = 250
    img.height = 250

    div2.appendChild(button)
    p.appendChild(img)
    p.appendChild(span)
    p.appendChild(div2)
    h4.appendChild(p)
    div.appendChild(h4)
    li.appendChild(div)
    
    li.querySelector(".like-button").addEventListener("click", () => {
      toy.likes+= 1
      li.querySelector("span").innerText = `Likes: ${toy.likes}`
      updateLikes(toy)
    })

    toyCollection.appendChild(li)
  }
  
  const getAllToys = () => {
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => data.forEach(toy => renderOneToy(toy)))
    }

  getAllToys()
  
  const postNewToy = (toyObj) => {
    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(toyObj)
    })
    .then(res => res.json())
    .then(newToy => {
      toyObj.id = newToy.id
      updateLikes(toyObj)
    })
  }
  
  const updateLikes = (toyObj) => {
    fetch(`http://localhost:3000/toys/${toyObj.id}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toyObj)
    })
  }
})
