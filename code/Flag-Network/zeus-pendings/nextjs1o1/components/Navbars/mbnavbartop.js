import React from 'react'
import Link from 'next/link'




function Mb2() {    
  return (
    <>
        
        
        
        
        
        {/* Top navigation */}
    
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
        
        
        
        
    </>
  )
}







export default Mb2;

