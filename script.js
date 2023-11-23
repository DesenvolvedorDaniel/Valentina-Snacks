const lanches = document.querySelectorAll('h4.card-title')
const precoLanche = document.querySelectorAll('span.valor')
const addCarrinho = document.querySelectorAll('a.card-link')
const qtdLanche = document.querySelectorAll('input.card-qtd')
const carrinho = document.querySelector('#pedido')
const precoTotal = document.querySelector('#total-pedido')
const spanAdd = document.querySelectorAll('span.add')
let fade = document.querySelector('#fade')
let modal = document.querySelector('#modal')
let abrirModal = document.querySelector('#carrinho')


let eventos = [fade, abrirModal]
 
let toogleModal = () => {
    fade.classList.toggle('hide')
    modal.classList.toggle('hide')
}
eventos.map((elemento)=>{
    elemento.addEventListener('click', toogleModal)
})


function GerarQRCode(){
    
    var inputUsuario = totalCarrinho().toFixed(2) 
    var GoogleChartAPI = "http://chart.googleapis.com/chart?cht=qr&chs=200x200&chl="
    var conteudoQRCode = GoogleChartAPI + inputUsuario

    document.querySelector('#QRCodeImage').src = conteudoQRCode
}

let carrinhoCompras = []

function totalCarrinho(){
    let total = 0
    for(let i = 0; i < carrinhoCompras.length; i++){
        total += carrinhoCompras[i].valor
    }

    return total
}

function removerDoCarrinho(posicao){
    carrinhoCompras.splice(posicao,1)
    atualizarCarrinho()
    
}

function adicionarAoCarrinho(lanche,quantidade,valor){
    carrinhoCompras.push({lanche,quantidade,valor})
    console.log(carrinhoCompras)
}

function atualizarCarrinho(){
        
        carrinho.innerHTML = ""
        precoTotal.innerHTML = `R$${totalCarrinho().toFixed(2)}`
        for(let i = 0; i < carrinhoCompras.length; i++){
            let lanches = carrinhoCompras[i]
            let div = document.createElement('div')
            div.innerHTML = `${lanches.lanche} - ${lanches.quantidade} - R$${lanches.valor.toFixed(2)} - <button onclick=removerDoCarrinho(${i}) > X </button> </p>`
            carrinho.appendChild(div)
        }    
}

addCarrinho.forEach((a,i)=>{
    a.addEventListener('click',()=>{
        let lanche = lanches[i].textContent

        let qtdLanches = Number(qtdLanche[i].value)

        let total = Number(precoLanche[i].textContent)

        let preco = qtdLanches * total
        spanAdd[i].textContent = `${lanche} adicionado ao carrinho`
        
        setTimeout(()=>{
            desaparecerTexto(spanAdd[i])
        },2000)
        adicionarAoCarrinho(lanche,qtdLanches,preco)
        atualizarCarrinho()
    })
})

function desaparecerTexto(element){
    var opacity = 1
    var intervalo = 50

    let fade = setInterval(()=>{
        if(opacity > 0){
            opacity -= 0.1
            element.style.opacity = opacity
        } else{
            clearInterval(fade)
        }
    },intervalo)
}