const btnResult = document.querySelector('.btn'); 
const resultNode = document.querySelector('.content'); 


function useRequest(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (cb) {
        cb(result);
      }
    }
  };
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  xhr.send();
};

function displayResult(apiData) {
    let content = '';
  
    apiData.forEach(item => {
      const contentBlock = ` 
        <div class="content__item">
          <div class="content__item-title"> <h2>${item.author}</h2> </div>
          <img class="content__item-img" src="${item.download_url}"/>
        </div>`;
        content = content + contentBlock; 
    });
    resultNode.innerHTML = content; 
  }
  btnResult.addEventListener('click',() => {
    const page = Number(document.querySelector('.input1').value);
    const limit = Number(document.querySelector('.input2').value);
    let errPage, errLimit; 
    
    if (isNaN(page)) errPage = 1;
    else if (page < 1 || page > 10) errPage = 1;
    else if ((page ^ 0) !== page) errPage = 2;
  
    if (isNaN(limit)) errLimit = 1;
    else if (limit < 1 || limit > 10) errLimit = 1;
    else if ((limit ^ 0) !== limit) errLimit = 2;
  
    if (errPage === 1 && errLimit === 1) {
      alert("Номер страницы и лимит вне диапазона от 1 до 10!");
      return;
    }
  
    if (errPage === 1) {
      alert("Номер страницы вне диапазона от 1 до 10!");
      return;
    }
  
    if (errPage === 2) {
      alert("Число в поле <Номер страницы> не является целым !");
      return;
    }
  
    if (errLimit === 1) {
      alert("Лимит вне диапазона от 1 до 10!");
      return;
    }
  
    if (errLimit === 2) {
      alert("Число в поле <Лимит> не является целым !");
      return;
    }
    
    let url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
  
    let urlRequest = localStorage.getItem('urlRequest'); 
    if (urlRequest === url) { 
      console.log('urlStorage', urlRequest);
      let resultJSON = localStorage.getItem('resultJSON'); 
      console.log('result_JSON_Storage', resultJSON);
      let result = JSON.parse(resultJSON);                
      console.log('result_JS_Storage', result);
      displayResult(result);                             
    }
    else { 
      console.log('urlNew', url);
      localStorage.setItem('urlRequest', url);
      useRequest(url, displayResult);
    }
  });
