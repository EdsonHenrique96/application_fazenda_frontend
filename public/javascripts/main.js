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

// JS DOM MANIPULATION

function createPercentageElement(candidate) {

  const containerPercentage = document.createElement('div');
  containerPercentage.setAttribute('class', 'container-percentage');

  const boxLike = document.createElement('div');
  boxLike.setAttribute('class', 'box-like');

  const boxDoNotLike = document.createElement('div');
  boxDoNotLike.setAttribute('class', 'box-do-not-like');

  const textLike = document.createElement('p');
  textLike.innerHTML = `${candidate.likePercentage}%`;

  const textDoNotLike = document.createElement('p');
  textDoNotLike.innerHTML = `${candidate.doNotLikePercentage}%`;

  const titlePercetageLike = document.createElement('div');
  titlePercetageLike.setAttribute('class','title-box-percentage');

  const titlePercetageNotLike = document.createElement('div');
  titlePercetageNotLike.setAttribute('class','title-box-percentage');

  const textTitleLike = document.createElement('p');
  textTitleLike.innerHTML = 'GOSTAM'

  const textTitleNotLike = document.createElement('p');
  textTitleNotLike.innerHTML = 'NÃO GOSTAM'

  titlePercetageLike.appendChild(textTitleLike);
  titlePercetageNotLike.appendChild(textTitleNotLike);


  boxLike.appendChild(titlePercetageLike);
  boxLike.appendChild(textLike);

  boxDoNotLike.appendChild(titlePercetageNotLike);
  boxDoNotLike.appendChild(textDoNotLike);

  containerPercentage.appendChild(boxLike);
  containerPercentage.appendChild(boxDoNotLike);

  return containerPercentage;
}

function createListItem() {
  const listItem = document.createElement('li');
  listItem.classList.add('list-item', 'list-item-primary');

  return listItem;
}

function createWrapperItem() {
  const wrapperItem = document.createElement('div');
  wrapperItem.setAttribute('class', 'wrapper-item');

  return wrapperItem;
}

function createNameNode(candidate) {
  const name = document.createElement('h2');
  name.innerHTML = candidate.name;
  return name;
}

function createDescriptionNode(candidate) {
  const description = document.createElement('p');
  description.innerHTML = candidate.description;
  return description;
}

function createImgNode(candidate) {
  const image = document.createElement('img');
  image.setAttribute('src', candidate.picture);
  image.setAttribute('class', 'img-profile');
  image.setAttribute('alt', `Foto de ${candidate.name}`)

  return image;
}

function createPositionNode(indice) {
  const position = document.createElement('div');
  const positionNumber = document.createElement('p');
  positionNumber.innerHTML = indice+1;
  position.appendChild(positionNumber);
  position.setAttribute('class', 'box-position');

  return position;
}

function createContainerImg() {
  const containerImg = document.createElement('div');
  containerImg.setAttribute('class', 'container-img');

  return containerImg;
}

function createContainerText() {
  const containerText = document.createElement('div');
  containerText.setAttribute('class', 'container-text');

  return containerText;
}

function render(indice, {
  percentageElement,
  listItem,
  wrapperItem,
  name,
  description,
  image,
  position,
  containerImg,
  containerText,
  rankList,
}) {
  containerImg.appendChild(image);
  containerImg.appendChild(position);
  wrapperItem.appendChild(containerImg);

  containerText.appendChild(name);
  containerText.appendChild(description);
  wrapperItem.appendChild(containerText);
  wrapperItem.appendChild(percentageElement);

  listItem.appendChild(wrapperItem);

  // set background color for even elements
  if((indice + 1)%2 === 0){
    listItem.classList.remove('list-item-primary');
    listItem.classList.add('list-item-secoundary');
  }

  rankList.appendChild(listItem);
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
      const percentageElement = createPercentageElement(candidate);

      const listItem = createListItem();
      const wrapperItem = createWrapperItem();

      const name = createNameNode(candidate);
      const description = createDescriptionNode(candidate);

      const image = createImgNode(candidate);

      const position = createPositionNode(indice);

      const containerImg = createContainerImg();
      const containerText = createContainerText();

      render(indice, {
        percentageElement,
        listItem,
        wrapperItem,
        name,
        description,
        image,
        position,
        containerImg,
        containerText,
        rankList,
      })
    });
})();

