const BASE_URL = "http://localhost:3000/"
const REALQUOTE_URL = "http://localhost:3000/quotes/"
const QUOTES_URL = "http://localhost:3000/quotes?_embed=likes"

document.addEventListener('DOMContentLoaded', () => {
    fetchQuotes()
})

function fetchQuotes(){
    fetch(QUOTES_URL)
    .then(res => res.json())
    .then(quotes => renderQuotes(quotes))
}

function renderQuotes( quotes ) {
 quotes.forEach( quote => renderQuote(quote) )
}

function renderQuote( quote ) {
    ul = document.getElementById('quote-list')
    
    li = document.createElement('li')
    li.classList += 'quote-card'
    ul.appendChild(li)
    
    block = document.createElement('blockquote')
    block.classList += 'blockquote'
    li.appendChild(block)

    p = document.createElement('p')
    p.textContent = quote.quote
    block.appendChild(p)
    
    footer = document.createElement('footer')
    footer.classList += 'block-quote-footer'
    footer.textContent = quote.author
    block.appendChild(footer)

    br = document.createElement('br')
    block.appendChild(br)

    likeButton = document.createElement('button')
    likeButton.classList += 'btn-success'
    likeButton.textContent = 'Likes:'
    span = document.createElement('span')
    span.textContent = quote.likes.length
    likeButton.addEventListener('click', (e) => increaseLikes(e,quote,))
    likeButton.appendChild(span)
    block.appendChild(likeButton)

    deleteButton = document.createElement('button')
    deleteButton.classList += 'btn-danger'
    deleteButton.textContent = 'Delete'
    deleteButton.addEventListener('click', () => deleteQuote(quote, li ))
    block.appendChild(deleteButton)
}



function deleteQuote(quote, li) {
    fetch(REALQUOTE_URL + quote.id, {method: 'delete' } )
     .then( res => res.json() )
     .then( quote => { li.remove() })
        
    
}


const quoteForm = document.getElementById('new-quote-form')


quoteForm.addEventListener( 'submit',(event)=>{  
    event.preventDefault()

    let newQuote = quoteForm.quote.value
    let newAuthor = quoteForm.author.value
    
    handleNewQuoteFormSubmit(newQuote, newAuthor)
} )

function handleNewQuoteFormSubmit(newQuote, newAuthor){
    let config = {
        method: 'post',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify({
            quote: newQuote,
            author: newAuthor,
            likes: '0'
        })
    }
fetch("http://localhost:3000/quotes", config)
.then( res => res.json() )
.then( quote => renderQuote(quote) )
}

