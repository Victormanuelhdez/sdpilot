(function buildQuestionBank() {
  const questions = [];
  let id = 1;
  const rotate = (items, shift) => items.map((_, index) => items[(index + shift) % items.length]);
  const answerIndex = (options, value) => options.indexOf(value);

  window.TOPICS.forEach((topic, topicIndex) => {
    topic.concepts.forEach((concept, conceptIndex) => {
      const peers = topic.concepts.filter(item => item.term !== concept.term);
      const allPeers = window.TOPICS.flatMap(item => item.concepts).filter(item => item.term !== concept.term);
      const distractors = [...peers, ...allPeers].filter((item, index, arr) => arr.findIndex(x => x.term === item.term) === index).slice(0, 3);
      const shift = (topicIndex + conceptIndex) % 4;
      const termOptions = rotate([concept.term, ...distractors.map(item => item.term)], shift);
      const memoryOptions = rotate([concept.memory, ...distractors.map(item => item.memory)], (shift + 1) % 4);
      const trapOptions = rotate([concept.trap, ...distractors.map(item => item.trap)], (shift + 2) % 4);
      const factOptions = rotate([concept.quickFacts[0], ...distractors.map(item => item.quickFacts[0])], (shift + 3) % 4);
      const source = `${topic.title} · Material de Desarrollo Seguro`;

      questions.push({id:id++,topic:topic.id,type:"single",difficulty:"Media",question:`Según el material, ¿qué concepto se define con esta descripción? ${concept.explanation}`,options:termOptions,answer:[answerIndex(termOptions, concept.term)],explanation:`El concepto definido es «${concept.term}». ${concept.explanation}`,source});
      questions.push({id:id++,topic:topic.id,type:"single",difficulty:"Media",question:`Según el material, ¿qué regla mental resume específicamente «${concept.term}»?`,options:memoryOptions,answer:[answerIndex(memoryOptions, concept.memory)],explanation:`Para «${concept.term}», la regla es: ${concept.memory} ${concept.explanation}`,source});
      questions.push({id:id++,topic:topic.id,type:"single",difficulty:"Alta",question:`Según el material, ¿cuál de estas afirmaciones se presenta como la trampa específica de «${concept.term}»?`,options:trapOptions,answer:[answerIndex(trapOptions, concept.trap)],explanation:`En «${concept.term}», la trampa indicada es: ${concept.trap}`,source});
      questions.push({id:id++,topic:topic.id,type:"single",difficulty:"Baja",question:`Según el resumen del material, ¿qué elemento aparece asociado específicamente con «${concept.term}»?`,options:factOptions,answer:[answerIndex(factOptions, concept.quickFacts[0])],explanation:`Los elementos resumidos para «${concept.term}» son: ${concept.quickFacts.join(" · ")}.`,source});
    });
  });

  window.QUESTIONS = questions;
})();
