var blocos = ["x1", "x2", "x3", "x4", "x5"];
var ajuda = {
  id: "ajuda",
  showPrevButton: true,
  i18n: {
    nextBtn: "Próximo",
    prevBtn: "Anterior",
    doneBtn: "Fim",
    skipBtn: "Pular",
    closeTooltip: "Fechar"
  },
  steps: [{
    target: "logo",
    placement: "bottom",
    xOffset: 50,
    fixedElement: true,
    title: "Bem vindo!",
    content: "Neste tutorial voce vai aprender como utilizar os principais recursos deste site."
  }, {
    target: "tut-step1",
    placement: "bottom",
    showSkip: true,
    fixedElement: true,
    nextOnTargetClick: true,
    title: "Adicionando Blocos",
    content: "Para iniciar seu projeto, adicione seu primeiro compartimento clicando no botão 'Adicionar Bloco'."
  }, {
    target: "tut-step1",
    placement: "bottom",
    fixedElement: true,
    nextOnTargetClick: true,
    title: "Compartimento adicionado",
    content: "Sempre que este botão for precionado, um novo compartimento é criado."
  }, {
    target: blocos,
    placement: "bottom",
    xOffset: "center",
    arrowOffset: "center",
    title: "Dados do compartimento",
    content: "Altere o nome do bloco, valor do compartimento e ligações nas suas respectivas opções."
  }, {
    target: blocos,
    placement: "right",
    title: "Ligação",
    content: "Para ligar um bloco a outro apenas arraste o icone <span class='glyphicon glyphicon-random ep'></span> e jogue no bloco destino."
  }, {
    target: "tut-step2",
    placement: "bottom",
    xOffset: "center",
    arrowOffset: "center",
    fixedElement: true,
    nextOnTargetClick: true,
    title: "Salvando alterações",
    content: "Seu projeto pode ser salvo clicando neste botão.<br />Ao clicado, uma URL customizada é criada, será através dela que voce irá acessar seu projeto futuramente."
  }, {
    target: "tut-step3",
    placement: "bottom",
    xOffset: "center",
    arrowOffset: "center",
    fixedElement: true,
    nextOnTargetClick: true,
    title: "Apagar tudo",
    content: "Ao criar um novo projeto, todos os dados atuais que não foram salvos serão apagados."
  }, {
    target: "tut-step4",
    placement: "bottom",
    xOffset: "center",
    arrowOffset: "center",
    fixedElement: true,
    nextOnTargetClick: true,
    zindex: 1000,
    title: "Opções avançadas",
    content: "Neste campo voce pode configurar as opções avançadas do seu projeto."
  }, {
    target: "tut-step5",
    placement: "bottom",
    xOffset: "center",
    arrowOffset: "center",
    fixedElement: true,
    nextOnTargetClick: true,
    zindex: 1000,
    title: "Modelos pré montados",
    content: "Voce também pode selecionar um dos modelos pré montados de projeto que melhor se encaixa em seu trabalho."
  }, {
    target: "tut-step6",
    placement: "bottom",
    fixedElement: true,
    xOffset: -200,
    arrowOffset: 220,
    nextOnTargetClick: true,
    zindex: 1000,
    title: "Criando uma conta",
    content: "Voce também pode criar um conta no site e salvar todos os seus projetos nela."
  }, {
    target: "tut-step6",
    placement: "bottom",
    xOffset: -200,
    arrowOffset: 220,
    zindex: 1000,
    fixedElement: true,
    title: "IMPORTANTE!",
    content: "Para que o projeto seja vinculado a sua conta é necessario que vocë esteja logado antes de clicar no botão salvar."
  }, {
    target: "logo",
    placement: "bottom",
    xOffset: 50,
    fixedElement: true,
    title: "Conclusão",
    content: "Agora que voce já sabe como utilizar este site, utilize seus recursos ao gosto."
  }]
};