/*
* @author: Gabriella Ribeiro de Melo e Costa.
* @date: 04/06/2023.
* @file: conversor.js
* @name: Conversor de Números Romanos.
*/

function romParaArab(nRomano){
    let convertido = 0;
    
    const numsRomanos = {
        I: 1,
        IV: 4,
        V: 5,
        IX: 9,
        X: 10,
        XL: 40,
        L: 50,
        XC: 90,
        C: 100,
        CD: 400,
        D: 500,
        CM: 900,
        M: 1000,
        i: 1,
        iv: 4,
        v: 5,
        ix: 9,
        x: 10,
        xl: 40,
        l: 50,
        xc: 90,
        c: 100,
        cd: 400,
        d: 500,
        cm: 900,
        m: 1000
    };
    
    for(let i = 0; i < nRomano.length; i++){
        const num = nRomano[i];
        const valorAtual = numsRomanos[num];
        const proxNum = nRomano[i+1];
        const proxValor = numsRomanos[proxNum];
        
        if(proxValor && proxValor > valorAtual){
            convertido = convertido + (proxValor-valorAtual);
            i++;
        } else{
            convertido = convertido + valorAtual;
        }
    }
    
    return convertido;
}


function arabParaRom(nArabico){
    if(nArabico < 1 || nArabico > 3999){
        throw new Error(window.alert('O número precisa ser entre 1 e 3999!'));
    }
    
    const numsArabicos = [
        {arabico: 1000, romano: 'M'},
        {arabico: 900, romano: 'CM'},
        {arabico: 500, romano: 'D'},
        {arabico: 400, romano: 'CD'},
        {arabico: 100, romano: 'C'},
        {arabico: 90, romano: 'XC'},
        {arabico: 50, romano: 'L'},
        {arabico: 40, romano: 'XL'},
        {arabico: 10, romano: 'X'},
        {arabico: 9, romano: 'IX'},
        {arabico: 5, romano: 'V'},
        {arabico: 4, romano: 'IV'},
        {arabico: 1, romano: 'I'},
    ];

    let convertido = '';
    for(let i = 0; i < numsArabicos.length; i++){
        while(nArabico >= numsArabicos[i].arabico) {
            convertido += numsArabicos[i].romano;
            nArabico -= numsArabicos[i].arabico;
        }
    }
    
    return convertido;
}

//trocar o tipo de conversão
const botaoArabPRom = document.getElementById('SelecArabParaRom');
const botaoRomPArab = document.getElementById('SelecRomParaArab');
const conteudoArabPRom = document.getElementById('ArabParaRom');
const conteudoRomPArab = document.getElementById('RomParaArab');

botaoArabPRom.addEventListener('click', function() {
    let resposta = document.getElementById('resEmArab');
    let romano = document.getElementById('romano');
    if(conteudoArabPRom.classList.contains('nao-selecionado')){
        conteudoArabPRom.classList.remove('nao-selecionado');
        conteudoRomPArab.classList.add('nao-selecionado');
    }
    resposta.textContent = '';
    romano.value = '';
});

botaoRomPArab.addEventListener('click', function(){
    let resposta = document.getElementById('resEmRom');
    let arabico = document.getElementById('arabico');
    if(conteudoRomPArab.classList.contains('nao-selecionado')){
        conteudoRomPArab.classList.remove('nao-selecionado');
        conteudoArabPRom.classList.add('nao-selecionado');
    }
    resposta.textContent = '';
    arabico.value = '';
});

//conversões
let botaoConverRA = document.getElementById('converArab');
botaoConverRA.addEventListener('click', function(){
    let resposta = document.getElementById('resEmRom');
    let arabico = document.getElementById('arabico');
    let conteudo = arabico.value;
    let arabConvertido = arabParaRom(conteudo);
    resposta.textContent = `${arabConvertido}`;
});

let botaoConverAR = document.getElementById('converRom');
botaoConverAR.addEventListener('click', function(){
    let resposta = document.getElementById('resEmArab');
    let romano = document.getElementById('romano');
    let conteudo = romano.value;
    let romConvertido = romParaArab(conteudo);
    resposta.textContent = `${romConvertido}`;
});


