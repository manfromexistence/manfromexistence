  var dropbox = document.querySelector('#dropbox');
  var drg , drgT , drgL , drgB , drgR ;
  var el , avail ;
  function dragStart(e){
      el = e.target ;
      if(el.getAttribute('draggable') == 'true'){
          avail = 'available';
      } else {
          avail = '';
      }
  }
  function drag(e){
      if(avail == 'available'){
          el.style.position="absolute";
          el.style.left=e.touches[0].clientX-el.clientWidth/2;
          el.style.top=e.touches[0].clientY-el.clientHeight/2;
           
           drg = el.getBoundingClientRect();
           drgT = drg.top ;
           drgB = drg.bottom ;
           drgL = drg.left ;
           drgR = drg.right ;
      } else {}
      e.preventDefault();
  }
  function drop(){
      // update on drop
      var drp = dropbox.getBoundingClientRect();
  var drpT = drp.top ,
      drpL = drp.left ,
      drpB = drp.bottom ,
      drpR = drp.right ;
      if(avail == 'available'){
          if(drpT < drgT &&
             drpL < drgL &&
             drpB > drgB &&
             drpR > drgR){
                 dropbox.appendChild(el);
                 el.style.position='';
                 el.style.background='red';
                 el.style.width='5vh';
                 
                 el.setAttribute('draggable','true');
             }
      } else {}
      
  }




















