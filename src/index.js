const quotesUrl = 'http://localhost:3000/quotes'
const likesUrl = 'http://localhost:3000/likes'
const quotesContainer = document.querySelector('ul#quote-list')
const form = document.querySelector('form#new-quote-form')

// let notSorted = true
// const sortBtn = document.createElement('button')
// sortBtn.innerText = "Sort"

// sortBtn.addEventListener('click', () => {
//     notSorted = !notSorted
//     if (notSorted){
//         sortBtn.innerText = "Sort"
//         quotesContainer.innerHTML = ''
//         get('?_embed=likes')
//     }
//     else {
//         sortBtn.innerText = "Unsort"
//         quotesContainer.innerHTML = ''
//         get('?_sort=author')
//     }
// })
// document.body.children[0].append(sortBtn)

// function get(url){
//     fetch(quotesUrl + url)
//     .then(res => res.json())
//     .then(quotes => quotes.forEach(quote => {
//         display(quote)
//     }))
// }
fetch(quotesUrl + '?_embed=likes')
    .then(res => res.json())
    .then(quotes => quotes.forEach(quote => {
        display(quote)
    }))

function display(quote){
    const li = document.createElement('li')
    li.className = 'quote-card'
    
    const blockquote = document.createElement("blockquote")
        blockquote.className = "blockquote"
    const p = document.createElement("p")
        p.className = "mb-0"
        p.innerText = quote.quote
    const footer = document.createElement("footer")
        footer.className = "blockquote-footer"
        footer.innerText = quote.author
    const br = document.createElement('br')
    const likeBtn = document.createElement("button")
        likeBtn.className = "btn-success"
        likeBtn.innerText = "Likes: "
        likeBtn.addEventListener('click', () => {
            const configObject = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quoteId: quote.id, 
                    createdAt: Date.now() 
                })
            }
            fetch(likesUrl, configObject)
            .then(res => res.json())
            .then(span.innerText = Number(span.innerText) + 1)
        })

    const span = document.createElement("span")
        if(quote.likes){
            span.innerText = quote.likes.length
        }else{
            span.innerText = 0
        }
    const deleteBtn = document.createElement("button")
        deleteBtn.className = "btn-danger"
        deleteBtn.innerText = "Delete"
        deleteBtn.addEventListener("click", () => {
            fetch(quotesUrl + `/${quote.id}`,{
                method: "DELETE"
            })
            .then(() => li.remove())
        })
    
    likeBtn.append(span)  
    blockquote.append(p, footer, br, likeBtn, deleteBtn)
    li.append(blockquote)
    quotesContainer.append(li)
}

form.addEventListener('submit', () => {
    event.preventDefault()
    const configObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quote: document.querySelector('input#new-quote').value,
            author: document.querySelector('input#author').value
        })
    }
    fetch(quotesUrl, configObj)
    .then(res => res.json())
    .then(data => {
        display(data)
        form.reset()
    })

})