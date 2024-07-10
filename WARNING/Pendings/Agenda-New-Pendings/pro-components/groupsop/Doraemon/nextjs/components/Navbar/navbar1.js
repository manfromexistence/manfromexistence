import Head from 'next/head'




function Navbar1() {
    return (
        <>
            <nav className="pro_navbar_main_container">
                <div className="pro_navbar_pc_sm pro_navbar_pc_lg pro_navbar_pc_xl">
                    <h1 className="pro_navbar_brand_pc">Thapapay</h1>
                    <div className="pc_item"><a href="#" className="ancar">Home</a></div>
                    <div className="pc_item"><a href="#" className="ancar">Shorts</a></div>
                    <div className="pc_item"><a href="#" className="ancar">Subscriptions</a></div>
                    <div className="pc_item"><a href="#" className="ancar">Notifications</a></div>
                    <div className="pc_item"><a href="#" className="ancar">Library</a></div>
                    <div className="pc_item"></div>
                </div>
                <div className="pro_navbar_mb_sm pro_navbar_mb_lg pro_navbar_mb_lg">
                    <div className="pro_navbar_mb_header">
                        <h1 className="pro_navbar_brand_mb">Thapapay</h1>
                        <span className="pro_navbar_mb_btn">
                            <ion-icon id="icon_menu" name="menu-outline"></ion-icon>
                            <ion-icon id="icon_close" name="close-outline"></ion-icon>
                        </span>
                    </div>
                    <div className="pro_navbar_mb_main-content">
                        <ul className="pro_navbar_page-menu_mb">
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="home-outline" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Home</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="logo-tiktok" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Sorts</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="chatbubbles-outline" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Messages</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="notifications-outline" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Notifications</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="library-outline" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Library</span>
                                </div>
                            </li>
                        </ul>
                        <ul className="pro_navbar_toggle-menu_mb">
                            <div className="wrapper"></div>
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="home-outline" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Home</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="logo-tiktok" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Sorts</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="chatbubbles-outline" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Messages</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="notifications-outline" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Notifications</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="library-outline" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Library</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="albums-outline" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Time</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="ellipsis-horizontal" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Menu</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="crop" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Crop</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb">
                                    <ion-icon name="move" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Move</span>
                                </div>
                            </li>
                        </ul>
                        <ul className="pro_navbar_sub-menu_mb">
                            <li>
                                <div className="pro_toggle_navbar_mb mb_list1">
                                    <ion-icon name="home-outline" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Home</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb mb_list2">
                                    <ion-icon name="ellipsis-horizontal" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Menu</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb mb_list3">
                                    <span className="color">Colors</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb mb_list4">
                                    <ion-icon name="crop" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Crop</span>
                                </div>
                            </li>
                            <li>
                                <div className="pro_toggle_navbar_mb mb_list5">
                                    <ion-icon name="move" className="mb_icons"></ion-icon>
                                    <span className="mb_items">Move</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}


export default Navbar1;