//----------------------------------------------------------//

const socket = io.connect();

const form = document.querySelector('#formAddProduct');
form.addEventListener('submit', e => {
    e.preventDefault()
    const product = {
        title: form[0].value,
        price: form[1].value,
        thumbnail: form[2].value,
    }
    socket.emit('update', product);
    form.reset();
})

socket.on('productos', products => {
    makeHtmlTable(products).then(html => {
        document.getElementById('datos').innerHTML = html
    })
});

function makeHtmlTable(products) {
    return fetch('./partial/viewProduct.hbs')
        .then(res => res.text())
        .then(temp => {
            const template = Handlebars.compile(temp);
            const html = template({ products })
            return html
        })
}

//----------------------------------------------------------//

socket.on('messages', async function (data) {
    const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'authorEmail' });

    const schemaMsg = new normalizr.schema.Entity('post', {
        author: schemaAuthor
    }, { idAttribute: '_id' });

    const schemaMssgs = new normalizr.schema.Entity('posts', {
        mensajes: [schemaMsg]
    }, { idAttribute: 'id' });

    const msgsDenormalize = normalizr.denormalize(data.result, schemaMssgs, data.entities);
    console.log(msgsDenormalize);
    render(msgsDenormalize)
});

function render(data) {
    var html = data.mensajes.map(function (elem, index) {
        return (`
            <div>
                <b style="color:blue;">${elem.author.authorEmail}</b> 
                [<span style="color:brown;">${elem.author.fyh}</span>] : 
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
        author: {
            authorEmail: userMessage.value,
            fyh: new Date(),
        },
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
