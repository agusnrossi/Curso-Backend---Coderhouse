
const socket = io.connect();

//----------------------------------------------------------//


const form = document.querySelector('#formAddProduct');
form.addEventListener('submit', e => {
    e.preventDefault()
    const product = {
        title: form[0].value,
        price:form[1].value,
        thumbnail: form[2].value,
    }
    socket.emit('update', product);
    form.reset()
})

socket.on('productos', products => {
    makeHtmlTable(products).then(html => {
        document.getElementById('datos').innerHTML = html
    })
});

function makeHtmlTable(products) {
    return fetch('views/viewProduct.hbs')
        .then(res => res.text())
        .then(temp => {
            const template = Handlebars.compile(temp);
            const html = template({ products })
            return html
        })
}



//----------------------------------------------------------//

//----------------------------------------------------------//

socket.on('messages', function (data) {
    console.log(data);
});

function render(data) {
    var html = data.map(function (elem, index) {
        return (
            `<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`

        )
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}
socket.on('messages', function (data) { render(data); });

function addMessage(e) {
    var message = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', message);
    return false;
}

//----------------------------------------------------------//

socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(function (elem, index) {
        return (`
            <div>
                <b style="color:blue;">${elem.author}</b> 
                [<span style="color:brown;">${elem.fyh}</span>] : 
                <i style="color:green;">${elem.text}</i>
            </div>
        `)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

const userMessage = document.getElementById('username')
const centerText = document.getElementById('texto')
const button = document.getElementById('enviar')

function addMessage(e) {
    var message = {
        author: userMessage.value,
        text: centerText.value
    };
    socket.emit('new-message', message);

    centerText.value = ''
    centerText.focus()

    button.disabled = true

    return false;
}

userMessage.addEventListener('input', () => {
    let isEmail = userMessage.value.length
    let isText = centerText.value.length
    centerText.disabled = !isEmail
    button.disabled = !isEmail || !isText
})

centerText.addEventListener('input', () => {
    let isText = centerText.value.length
    button.disabled = !isText
})


//----------------------------------------------------------//
