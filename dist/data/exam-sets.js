(function buildExamSets() {
  const ids = window.QUESTIONS.map(question => question.id);
  const pick = (offset, step = 1) => Array.from({length: 48}, (_, index) => ids[(offset + index * step) % ids.length]);
  window.EXACT_QUESTIONNAIRES = [
    {id:"simulacro-general-a",title:"Simulacro General A",subtitle:"48 preguntas · cobertura equilibrada",description:"Recorre los siete módulos de Desarrollo Seguro.",questionIds:pick(0, 5)},
    {id:"simulacro-general-b",title:"Simulacro General B",subtitle:"48 preguntas · segunda combinación",description:"Una combinación distinta para evitar memorizar el orden.",questionIds:pick(7, 9)},
    {id:"simulacro-testing",title:"Simulacro Aplicaciones",subtitle:"48 preguntas · web, móvil y APIs",description:"Profundiza en OWASP Web, MASVS y seguridad de APIs.",questionIds:window.QUESTIONS.filter(q => ["seguridad-web","seguridad-movil","seguridad-apis"].includes(q.topic)).slice(0,48).map(q=>q.id)},
    {id:"simulacro-normativa",title:"Simulacro Ingeniería Segura",subtitle:"48 preguntas · SDLC, código, DevSecOps e IA",description:"Refuerza el desarrollo seguro de extremo a extremo.",questionIds:window.QUESTIONS.filter(q => ["sdlc-seguro","programacion-segura","devsecops","seguridad-ia"].includes(q.topic)).slice(0,48).map(q=>q.id)}
  ];
})();
