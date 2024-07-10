let dropbox = document.querySelector('#dropbox');
  let drg , drgT , drgL , drgB , drgR ;
  let el , avail ;
  
  function dragStart(evt){
      el = evt.target ;
      if(el.getAttribute('draggable') == 'true'){
          avail = 'available';
      } else {
          avail = '';
      }
  }
  
  function drag(evt){
      if(avail == 'available'){
          el.style.position="absolute";
          el.style.left=evt.touches[0].clientX-el.clientWidth/2;
           el.style.top=evt.touches[0].clientY-el.clientHeight/2;
           
           drg = el.getBoundingClientRect();
           drgT = drg.top ;
           drgB = drg.bottom ;
           drgL = drg.left ;
           drgR = drg.right ;
      } else {}
      evt.preventDefault();
  }
  
  function drop(){
      
      // update on drop
  
      let drp = dropbox.getBoundingClientRect();
  
  let drpT = drp.top ,
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
                 el.style.background='yellow';
                 el.style.height='10vh';
                 el.style.width='10vh';
                 el.setAttribute('draggable','true');
             }
      } else {}
      
  }




































































