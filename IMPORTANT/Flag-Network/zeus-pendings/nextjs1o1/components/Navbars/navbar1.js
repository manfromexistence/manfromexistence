import Link from 'next/link'
// import Head from 'next/head'
import Image from 'next/image'





function Navbar1() {
  return (<>

    {/* ///////////////////////////////// Pc /////////////////////////////////////*/}
    {/* Top navigation */}
    <div id="pro-navbartop-container">
      <nav id="pro-navbar-top" className="Hello bro">
        <li className="pntli" id="pntli1">
          <ion-icon className="pntic" name="menu-outline" />
        </li>
        <li className="pntli" id="pntli2">
          <ion-icon className="pntic" name="caret-down-outline" />
        </li>
        <li className="pntli" id="pntli3">
          <ion-icon className="pntic" name="move-outline" />
        </li>
        <li className="pntli" id="pntli4">
          <h1>LWBD</h1>
          {/* <ion-icon class="pntic" name="musical-note-outline"></ion-icon> */}
        </li>
        <li className="pntli" id="pntli5">
          <ion-icon className="pntic" name="mic-outline" />
        </li>
        <li className="pntli" id="pntli6">
          <ion-icon className="pntic" name="rocket-outline" />
        </li>
        <li className="pntli" id="pntli7">
          <ion-icon className="pntic" name="person-add-outline" />
        </li>
      </nav>
    </div>
    
    
    <nav id="pro_navbar_top" className="bg-dark">
      <div id="pntcg1" className="pntc">
        <ion-icon name="menu-outline" />
      </div>
      <div id="pntlc">
        <h1> Freelancrs </h1>
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
        <div className="pnti" id="upload">
          <ion-icon name="cloud-upload-outline" />
        </div>
        <div className="pnti" id="notifications">
          <ion-icon name="notifications-outline" />
        </div>
      </div>
      <div id="pntcg2" className="pntc">
        <ion-icon name="person-add-outline" />
      </div>
    </nav>
    
    
    <div id="pro-navbarbottom-container">
      <nav id="pro-navbar-bottom">
        <li className="pnbli" id="pnbli1">
          <ion-icon className="pftic" name="menu-outline" />
        </li>
        <li className="pnbli" id="pnbli2">
          <ion-icon className="pftic" name="rocket-outline" />
        
        </li>
        <li className="pnbli" id="pnbli3">
          <ion-icon className="pftic" name="add" />
        </li>
        <li className="pnbli" id="pnbli4">
          <ion-icon className="pftic" name="caret-down-outline" />
        </li>
        <li className="pnbli" id="pnbli5">
          <ion-icon className="pftic" name="move-outline" />
        
        </li>
      </nav>
       <div className="" id="pnbcc">
           <div id="pnbli-circle" />
       </div>
    </div>
    
    
    {/* Left navigation 🧭🧭🧭🧭🧭🧭🧭*/}
    <nav className="sclass" id="pc_navbar_left">
      <ul>

        <li>

          <Link passHref href="/contract">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/web3">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/about">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/addpost">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/addvideo">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/home">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/profile1">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/profile2">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/resgister1">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/resgister2">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/subscription">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/login">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/library">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/reupload1">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/upload">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/upload2">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/xyz1">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/xyz2">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/xyz3">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/xyz4">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/xyz5">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/django">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/contract">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/goals">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/op">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/contract">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/contract">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/contract">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/contract">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>
        <li>

          <Link passHref href="/contract">

            <ion-icon className="pc-navbarleft-pages" name="albums-outline" />

          </Link>

        </li>


      </ul>
    </nav>
    {/* ///////////////////////////////// Pc Navbar End /////////////////////////////////////*/}
    
    {/* ///////////////////////////////// Mb /////////////////////////////////////*/}
    <nav id="mb_navbar_top">
      <div id="mb_navbartop_header">
        {/* Profile */}
        <ion-icon name="person-circle-outline" className="mb-navbartop-icons" id="profile-icon-mb" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" />
        {/* Dropdown */}
        <ion-icon name="caret-down-outline" className="mb-navbartop-icons" id="dropdown-icon-mb" />
        
        <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">Offcanvas left</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
          </div>
        </div>
        {/* <ion-icon name="apps-outline" class="mb-navbartop-icons" id="allapps-icon-mb"></ion-icon> */}
        {/* Brand 🐥🐥🐥 */}
        <h1 id="mb_navbartop_brand">
          LWBD
        </h1>
        {/* Notifications */}
        <ion-icon name="notifications-outline" className="mb-navbartop-icons" id="notifications-icon-mb" />
        {/* Menu icon  will update soon...*/}
        <ion-icon name="menu-outline" className="mb-navbartop-icons" id="menu-icon-mb" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" />
        {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button> */}
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">Offcanvas right</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
          </div>
          <div className="offcanvas-body">
            ...
            y8vy8c7y7tc8tct7c7tt7c8tc7t
          </div>
        </div>
      </div>
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      





        <div id="mb_navbartop_scroll">
          <li>

            <Link passHref href="/">
              <a href="#" className="mb_navbartopscroll_pages"> Index </a>
            </Link>

          </li>

          <li>

            <Link passHref href="/contract">
              <a href="#" className="mb_navbartopscroll_pages"> Contract </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/about ">
              <a href="#" className="mb_navbartopscroll_pages"> about </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/addpost ">
              <a href="#" className="mb_navbartopscroll_pages"> addpost </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/addvideo ">
              <a href="#" className="mb_navbartopscroll_pages"> addvideo </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/contract">
              <a href="#" className="mb_navbartopscroll_pages"> contract </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/cookie">
              <a href="#" className="mb_navbartopscroll_pages"> cookie </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/django">
              <a href="#" className="mb_navbartopscroll_pages"> django </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/fileupload1">
              <a href="#" className="mb_navbartopscroll_pages"> fileupload1 </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/goals">
              <a href="#" className="mb_navbartopscroll_pages"> goals </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/home">
              <a href="#" className="mb_navbartopscroll_pages"> Home </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/login">
              <a href="#" className="mb_navbartopscroll_pages"> Login </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/library">
              <a href="#" className="mb_navbartopscroll_pages"> Library </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/profile1">
              <a href="#" className="mb_navbartopscroll_pages"> Profile1 </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/profile2">
              <a href="#" className="mb_navbartopscroll_pages"> Profile2 </a>
            </Link>

          </li>
          
          <li>

            <Link passHref href="/register1">
              <a href="#" className="mb_navbartopscroll_pages"> Register1 </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/register2">
              <a href="#" className="mb_navbartopscroll_pages"> Register2 </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/reupload1">
              <a href="#" className="mb_navbartopscroll_pages"> Reupload1 </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/subscription">
              <a href="#" className="mb_navbartopscroll_pages"> Subscription </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/upload">
              <a href="#" className="mb_navbartopscroll_pages"> Upload </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/upload2">
              <a href="#" className="mb_navbartopscroll_pages"> Upload2 </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/web3">
              <a href="#" className="mb_navbartopscroll_pages"> Web3 </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/xyz1">
              <a href="#" className="mb_navbartopscroll_pages"> Xyz1 </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/xyz2">
              <a href="#" className="mb_navbartopscroll_pages"> Xyz2 </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/xyz3">
              <a href="#" className="mb_navbartopscroll_pages"> Xyz3 </a>
            </Link>

          </li>
          <li>

            <Link passHref href="/xyz4">
              <a href="#" className="mb_navbartopscroll_pages"> Xyz4 </a>
            </Link>

          </li>

          <li id="mb_navbartopscroll_pages_last">

            <Link passHref href="/xyz5">
              <a href="#" className="mb_navbartopscroll_pages"> Xyz5 </a>
            </Link>

          </li>


        </div>
    </nav>
    
    
    
    
    
    
    <nav id="mb_navbar_bottom">
      <ul>
        <li>
          {/* Home */}
          <ion-icon name="home-outline" className="mb_navbarbottom_icons mb_navbarbottom_icons_hovering" />
          {/* <ion-icon name="home" class="mb_navbarbottom_icons mb_navbarbottom_icons_hovered"></ion-icon> */}
        </li>
        <li>
          {/* Shorts */}
          <ion-icon name="flash-outline" className="mb_navbarbottom_icons mb_navbarbottom_icons_hovering" />
          {/* <ion-icon name="flash" class="mb_navbarbottom_icons  mb_navbarbottom_icons_hovered"></ion-icon> */}
        </li>
        <li>
          {/* Add */}
          <ion-icon name="add-outline" className="mb_navbarbottom_icons mb_navbarbottom_icons_hovering" />
          {/* <ion-icon name="add" class="mb_navbarbottom_icons mb_navbarbottom_icons_hovered"></ion-icon> */}
        </li>
        <li>
          {/* Subscription */}
          <ion-icon name="earth-outline" className="mb_navbarbottom_icons mb_navbarbottom_icons_hovering" />
          {/* <ion-icon name="earth" class="mb_navbarbottom_icons mb_navbarbottom_icons_hovered"></ion-icon> */}
        </li>
        <li>
          {/* Library */}
          <ion-icon name="library-outline" className="mb_navbarbottom_icons mb_navbarbottom_icons_hovering" />
          {/* <ion-icon name="library" class="mb_navbarbottom_icons mb_navbarbottom_icons_hovered"></ion-icon> */}
        </li>
      </ul>
    </nav>


    {/* ///////////////////////////////// Navbar /////////////////////////////////////*/}
    <nav className="sidebar close" id="pro-navbartop-sidebar">
      <header>
        <div className="image-text">
          <span className="image">
            <Image src="/logo.png" alt="Vercel Logo" width={50} height={50} />
          </span>
          <div className="text logo-text">
            <span className="name">Codinglab</span>
            <span className="profession">Web developer</span>
          </div>
        </div>
        <i className="bx bx-chevron-right toggle" id='toogle' />
      </header>
      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <i className="bx bx-search icon" />
            <input type="text" placeholder="Search..." />
          </li>
          <ul className="menu-links">
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-home-alt icon" />
                <span className="text nav-text">Dashboard</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-bar-chart-alt-2 icon" />
                <span className="text nav-text">Revenue</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-bell icon" />
                <span className="text nav-text">Notifications</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-pie-chart-alt icon" />
                <span className="text nav-text">Analytics</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-heart icon" />
                <span className="text nav-text">Likes</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-wallet icon" />
                <span className="text nav-text">Wallets</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li className>
            <a href="#">
              <i className="bx bx-log-out icon" />
              <span className="text nav-text">Logout</span>
            </a>
          </li>
          <li className="mode">
            <div className="sun-moon">
              <i className="bx bx-moon icon moon" />
              <i className="bx bx-sun icon sun" />
            </div>
            <span className="mode-text text">Dark mode</span>
            <div className="toggle-switch">
              <span className="switch" />
            </div>
          </li>
        </div>
      </div>
    </nav>

    {/* ///////////////////////////////// Mb Navbar End /////////////////////////////////////*/}






  </>);
};


export default Navbar1;






