(function(baseUrl){
  var d = document;
  var s = d.createElement('script');
  s.src = "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
  d.body.appendChild(s);

  var asin        = $('#ASIN').attr('value') || $('input[name=ASIN.0]').attr('value');
  var url         = 'http://amazon.co.jp/dp/' + asin + '/';
  var imgurl      = 'http://images-jp.amazon.com/images/P/' + asin + '.09.MAIN._SX280__SCLZZZZZZZ_.jpg';
  var isKindleVer = ($('#btAsinTitle').text().indexOf('Kindle') != -1) ? true : false;

  // title
  $('#btAsinTitle').children().remove();
  var title = $('#btAsinTitle').text();

  if(!title){
      title = $('h1#title #productTitle').text();
  }

  if(isKindleVer) title = "[Kindle] " + title;
  d.title = title;

  // authors
  var $ad;
  var authors;
  $('#handleBuy .buying, #divsinglecolumnminwidth .buying').each(function(){
    if($(this).children('.parseasinTitle').length == 1){
      $ad = $(this);
    }
  });
  if($ad){
    $ad.children('h1, input, script, .buying').remove();
    authors = $ad.text();
  }

  if(!$ad){
    $ad = $('#byline');
    $ad.find('.a-popover-trigger, .a-popover-preload').remove();
    authors = $ad.text();
  }

  if(!authors){
    alert('Parse Error!');
  }

  // price
  var price = $('#actualPriceValue .priceLarge, #priceBlock .priceLarge').text();
  if(!price){
    price = $('#buyNewSection .a-color-price').text();
  }

  // publisher
  var $pd;
  $('#detail_bullets_id table td.bucket .content ul li').each(function(){
    if($(this).text().match(/\([0-9]*\/[0-9]*\/[0-9]*\)/)){
      $pd = $(this);
    }
  });
  if(!$pd){
    alert('Parse Error!');
  }
  $pd.children('b').remove();
  var publisher = $pd.text();


  // create view
  var $b = $('body');
  $b.children().remove();

  var $l = $('<link />');
  $l.attr('rel', 'stylesheet');
  $l.attr('href', baseUrl + '/styles.css');
  $('head').append($l);

  var $h = $('<div id="abdb-header" />');

  var $d1 = $('<div id="abdb-img" />');
  $d1.html('<img src="' + imgurl + '" />');

  var $d2 = $('<div id="abdb-info" />');
  $d2.html('<h1>' + title + '</h1><h2>' + authors + '</h2><ul><li>' + price + '</li><li>'
           + publisher + '</li><li><a href="' + url + '">' + url + '</a></li></ul>');

  $h.append($d1);
  $h.append($d2);
  $b.append($h);
})(window.abdbUrl);
