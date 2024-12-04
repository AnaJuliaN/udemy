//criando um objeto
class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }

  validarDados() {
    for(let i in this){
      if(this[i] === undefined || this[i] == '' || this[i] == null){
        return false
      }
      //console.log(i, this[i])
    }
    return true
  }
}

//salvando o obj no armazenamento local do navegador
class Bd {

  constructor() {
    let id = localStorage.getItem('id')
    if(id === null){
      localStorage.setItem('id', 0)
    }
  }
  getProximoId() {
    let proximoId = localStorage.getItem('id') //null
    return parseInt(proximoId) + 1
  }
  gravar(d) {
    let id = this.getProximoId()
    //convertendo o obj d em uma string no formato JSON
    localStorage.setItem(id, JSON.stringify(d))

    localStorage.setItem('id', id)
  }
}

let bd = new Bd()

//função chamada quando o usuário clicar no botão
function cadastrarDespesa() {

  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
  let valor = document.getElementById('valor')

  //criando um novo objeto despesa
  let despesa = new Despesa(
    ano.value, 
    mes.value, 
    dia.value, 
    tipo.value, 
    descricao.value, 
    valor.value
  )

  if(despesa.validarDados()) {
    //gravando as depesas
    bd.gravar(despesa)
    //dialog de sucesso com jquery e modal do bootstrap
    $('#sucessoGravacao').modal('show')
  } else {
    //dialog de erro com jquery e modal do bootstrap
    $('#erroGravacao').modal('show')
  }
}
