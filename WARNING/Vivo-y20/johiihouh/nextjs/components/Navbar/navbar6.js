import Link from 'next/link'
// import Head from 'next/head'





function Navbar6() {
    return (
        <>
          {/*  Ul page manu repaing🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉 */}
          <nav className="pro_navbar_main_container" id="nav1">
            {/* /////////////////////////  mb  //////////////////////////// */}
            <div className="pro_navbar_mb_sm pro_navbar_mb_lg pro_navbar_mb_lg">
              <div className="pro_navbar_mb_header">
                <h1 className="pro_navbar_brand_mb">Thapapay</h1>
                <span className="pro_navbar_mb_btn">
                  <ion-icon id="icon_menu" name="menu-outline" />
                  <ion-icon id="icon_close" name="close-outline" />
                </span>
              </div>
              <div className="pro_navbar_mb_main-content">
                <ul className="pro_navbar_page-menu_mb" id="circle">
                  <li>
                    <div className="pro_toggle_navbar_mb">
                      {/* <img id="goal" src="data:image/png;base64,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"/> */}
                      <ion-icon name="home-outline" className="mb_icons" />
                      <span className="mb_items">Home</span>
                    </div>
                  </li>
                  <li>
                    <div className="pro_toggle_navbar_mb">
                      <ion-icon name="logo-tiktok" className="mb_icons" />
                      <span className="mb_items">Sorts</span>
                    </div>
                  </li>
                  <li>
                    <div className="pro_toggle_navbar_mb">
                      <ion-icon name="chatbubbles-outline" className="mb_icons" />
                      <span className="mb_items">Messages</span>
                    </div>
                  </li>
                  <li>
                    <div className="pro_toggle_navbar_mb">
                      <ion-icon name="notifications-outline" className="mb_icons" />
                      <span className="mb_items">Notifications</span>
                    </div>
                  </li>
                  <li>
                    <div className="pro_toggle_navbar_mb">
                      <ion-icon name="notifications-outline" className="mb_icons" />
                      <span className="mb_items">Notifications</span>
                    </div>
                  </li>
                </ul>
                {/* Scroll op */}
                <div className="scroll">
                  <li id="scroll-li-1"><a href="#" className="op" id="scroll-li-a"> page1 </a></li>
                  <li id="scroll-li-2"><a href="#" className="op" id="scroll-li-a"> page2 </a></li>
                  <li id="scroll-li-3"><a href="#" className="op" id="scroll-li-a"> page3 </a></li>
                  <li id="scroll-li-4"><a href="#" className="op" id="scroll-li-a"> page4 </a></li>
                  <li id="scroll-li-5"><a href="#" className="op" id="scroll-li-a"> page5 </a></li>
                  <li id="scroll-li-p"><a href="#" className="op" id="scroll-li-a"> page6 </a></li>
                  <li id="scroll-li-l"><a href="#" className="op" id="scroll-li-a"> page7 </a></li>
                  <li id="scroll-li-m"><a href="#" className="op" id="scroll-li-a"> page8 </a></li>
                  <li id="scroll-li-n"><a href="#" className="op" id="scroll-li-a"> page9 </a></li>
                  <li id="scroll-li-b"><a href="#" className="op" id="scroll-li-a"> page10 </a></li>
                  <li id="scroll-li-v"><a href="#" className="op" id="scroll-li-a"> page1 </a></li>
                  <li id="scroll-li-c"><a href="#" className="op" id="scroll-li-a"> page2 </a></li>
                  <li id="scroll-li-x"><a href="#" className="op" id="scroll-li-a"> page3 </a></li>
                  <li id="scroll-li-z"><a href="#" className="op" id="scroll-li-a"> page4 </a></li>
                  <li id="scroll-li-a"><a href="#" className="op" id="scroll-li-a"> page5 </a></li>
                  <li id="scroll-li-s"><a href="#" className="op" id="scroll-li-a"> page6 </a></li>
                  <li id="scroll-li-d"><a href="#" className="op" id="scroll-li-a"> page7 </a></li>
                  <li id="scroll-li-f"><a href="#" className="op" id="scroll-li-a"> page8 </a></li>
                  <li id="scroll-li-h"><a href="#" className="op" id="scroll-li-a"> page9 </a></li>
                  <li id="scroll-li-h"><a href="#" className="op" id="scroll-li-a"> page10 </a></li>
                 
                  <div id="marker" />
                </div>
                <div id="line" />
            </div>
            </div>
          </nav>
            {/* /////////////////////////  End  ///////////////////////////*/}
            
            
          {/* Nav2 */}
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" id="navbar2">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Emon</a>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                  <li className="nav-item">
                    <link href="/" />
                    <a className="nav-link active" aria-current="page">Home</a>
                  </li>
                  <li className="nav-item">
                    <link href="redux" />
                    <a className="nav-link active" aria-current="page">Redux</a>
                  </li>
                  <li className="nav-item">
                    <link href="/login" />
                    <a className="nav-link active" aria-current="page">Login</a>
                  </li>
                  <li className="nav-item">
                    <link href="/django" />
                    <a className="nav-link active" aria-current="page">Django</a>
                  </li>
                  <li className="nav-item">
                    <link href="/goals" />
                    <a className="nav-link active" aria-current="page">Goals</a>
                  </li>
                </ul>
                <form className="d-flex">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-primary" type="submit">Search</button>
                </form>
              </div>
            </div>
          </nav>
            {/* /////////////////////////  End  ///////////////////////////*/}
        </>
    );
};


export default Navbar6;





