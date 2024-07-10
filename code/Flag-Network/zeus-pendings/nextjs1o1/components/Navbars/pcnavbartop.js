import React from 'react'




function Pc1() {    
  return (
    <>
        {/* Top navigation */}
        <nav id="pro_navbar_top" className="bg-dark">
          <div id="pntcg1" className="pntc">
            <ion-icon name="menu-outline" />
          </div>
          <div id="pntlc">
            <h1>LetWorkBeDone</h1>
          </div>
          <div id="pntcc">
            <div className="pnti mb" id="tools"> 
              <ion-icon name="caret-down-outline" />
            </div>
            <div id="logo" className="mb pntl">
              <ion-icon name="logo-google" />
            </div>
            <div id="search-container" className="mb-adjust">
              <ion-icon name="search-outline" id="search" />
              <input type="search" name="#search" id="searchbar" placeholder="Search for joy" />
              <ion-icon name="mic-outline" id="mic-search" />
              <ion-icon name="albums-outline" id="photo-search" />
            </div>
          </div>
          <div id="pntrc">
            <div className="pnti" id="cart">
                <ion-icon name="cart-outline"></ion-icon>    
            
            </div>
            <div className="pnti" id="notifications">
              <ion-icon name="notifications-outline" />
            </div>
          </div>
          <div id="pntcg2" className="pntc">
            <ion-icon name="person-add-outline" />
          </div>
        </nav>
        
        
        
        
    </>
  )
}




export default Pc1;
