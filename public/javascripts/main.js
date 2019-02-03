function getCandidates() {
  const urlCandidates = 'http://localhost:7007/fazenda.json'
  return fetch(urlCandidates)
    .then(res => res.json())
    .then(candidates => candidates.data)
    .catch(error => console.error(`Ocorreu um erro ao recuperar os candidatos: ${error}`))
}

async function calcPercentage() {
  const candidates = await getCandidates();
  return candidates
    .map(candidate => {
      if(!(candidate.positive && candidate.negative)) {
        return {
          ...candidate,
          likePercentage: 0,
          doNotLikePercentage: 0
        }
      }

      const total = parseInt(candidate.positive, 10) + parseInt(candidate.negative, 10);
      const doNotLikePercentage = Math.round(candidate.negative / (total / 100));
      const likePercentage = Math.round(candidate.positive / (total / 100));

      return {
        ...candidate,
        likePercentage,
        doNotLikePercentage
      };
    });
}

async function sortByApproval() {
  const candidates = await calcPercentage();
  for(final = (candidates.length-1); final > 0 ; final--) {
    for(let begin = 0, end = final; begin < end; begin++) {
      let left = begin;
      let right = begin+1;
      if(candidates[left].likePercentage < candidates[right].likePercentage){
        [candidates[left], candidates[right]] = [candidates[right], candidates[left]];
      }
      count++;
    }
  }

}

sortByApproval();