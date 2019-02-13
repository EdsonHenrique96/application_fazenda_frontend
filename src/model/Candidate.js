function Candidate() {

  Candidate.prototype.getCandidates = function getCandidates() {
    const urlCandidates = 'http://localhost:7007/fazenda.json';
    return fetch(urlCandidates)
      .then(res => res.json())
      .then(candidates => candidates.data)
      .catch(error => console.error(`Ocorreu um erro ao recuperar os candidatos: ${error}`))
  }

  Candidate.prototype.calcPercentage = async function calcPercentage(candidates) {
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

  Candidate.prototype.sortByApproval = async function sortByApproval(candidates) {
    for(let final = (candidates.length-1); final > 0 ; final--) {
      for(let begin = 0, end = final; begin < end; begin++) {
        let left = begin;
        let right = begin+1;
        if(candidates[left].likePercentage < candidates[right].likePercentage){
          [candidates[left], candidates[right]] = [candidates[right], candidates[left]];
        }
      }
    }
    return candidates;
  }

}

export default Candidate;