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
    for(final = (candidates.length-1); final > 0 ; final--) {
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


//  JS DOM MANIPULATION
(async function renderCandidates() {
  const candidete = new Candidate();
  const candidates = await candidete.getCandidates();
  const candidatesWithPercentage = await candidete.calcPercentage(candidates);
  const sortedCandidates = await candidete.sortByApproval(candidatesWithPercentage);

  const rankList = document.getElementById('rank-list');

  sortedCandidates
    .map((candidate, indice) => {

      //session percentage of likes
      const containerPercentage = document.createElement('div');
      containerPercentage.setAttribute('class', 'container-percentage');
      const boxLike = document.createElement('div');
      boxLike.setAttribute('class', 'box-like');
      const textLike = document.createElement('p');
      const titlePercetageLike = document.createElement('div');
      const textTitleLike = document.createElement('p');
      titlePercetageLike.setAttribute('class','title-box-percentage');
      textTitleLike.innerHTML = 'GOSTAM'
      titlePercetageLike.appendChild(textTitleLike);

      textLike.innerHTML = `${candidate.likePercentage}%`;
      const boxDoNotLike = document.createElement('div');
      boxDoNotLike.setAttribute('class', 'box-do-not-like');
      const textDoNotLike = document.createElement('p');
      textDoNotLike.innerHTML = `${candidate.doNotLikePercentage}%`;
      const titlePercetageNotLike = document.createElement('div');
      titlePercetageNotLike.setAttribute('class','title-box-percentage');
      const textTitleNotLike = document.createElement('p');
      textTitleNotLike.innerHTML = 'NÃO GOSTAM'
      titlePercetageNotLike.appendChild(textTitleNotLike);


      boxLike.appendChild(titlePercetageLike);
      boxLike.appendChild(textLike);
      boxDoNotLike.appendChild(titlePercetageNotLike);
      boxDoNotLike.appendChild(textDoNotLike);
      containerPercentage.appendChild(boxLike);
      containerPercentage.appendChild(boxDoNotLike);

      const listItem = document.createElement('li');
      listItem.classList.add('list-item', 'list-item-primary');

      const wrapperItem = document.createElement('div');
      wrapperItem.setAttribute('class', 'wrapper-item');

      const name = document.createElement('h2');
      name.innerHTML = candidate.name;

      const description = document.createElement('p');
      description.innerHTML = candidate.description;

      const image = document.createElement('img');
      image.setAttribute('src', candidate.picture);
      image.setAttribute('class', 'img-profile');
      image.setAttribute('alt', `Foto de ${candidate.name}`)

      const position = document.createElement('div');
      const positionText = document.createElement('p');
      positionText.innerHTML = indice+1;
      position.appendChild(positionText);
      position.setAttribute('class', 'box-position');

      const containerImg = document.createElement('div');
      containerImg.setAttribute('class', 'container-img');


      const containerText = document.createElement('div');
      containerText.setAttribute('class', 'container-text');

      containerImg.appendChild(image);
      containerImg.appendChild(position);
      wrapperItem.appendChild(containerImg);

      containerText.appendChild(name);
      containerText.appendChild(description);
      wrapperItem.appendChild(containerText);
      wrapperItem.appendChild(containerPercentage);

      listItem.appendChild(wrapperItem);

      // set background color for even elements
      if((indice + 1)%2 === 0){
        listItem.classList.remove('list-item-primary');
        listItem.classList.add('list-item-secoundary');
      }

      rankList.appendChild(listItem);
    });

})();

