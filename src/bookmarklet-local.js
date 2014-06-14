(function(){
  window.abdbUrl = 'http://localhost:9000/';
  var d = document, s = d.createElement('script');
  s.src = window.abdbUrl + '/main.js';
  d.body.appendChild(s);
})();
