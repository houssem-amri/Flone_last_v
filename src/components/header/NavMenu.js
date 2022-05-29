import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {strings["home"]}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="mega-menu mega-menu-padding">
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link to={process.env.PUBLIC_URL + "/"}>
                      {strings["home_group_one"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-fashion"}>
                      {strings["home_fashion"]}
                    </Link>
                  </li>
              
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-kids-fashion"}>
                      {strings["home_kids_fashion"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-cosmetics"}>
                      {strings["home_cosmetics"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-furniture"}>
                      {strings["home_furniture"]}
                    </Link>
                  </li>
                  {/* <li>
                    <Link to={process.env.PUBLIC_URL + "/home-furniture-two"}>
                      {strings["home_furniture_two"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-furniture-three"}>
                      {strings["home_furniture_three"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-furniture-four"}>
                      {strings["home_furniture_four"]}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link to={process.env.PUBLIC_URL + "/"}>
                      {strings["home_group_two"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-furniture-five"}>
                      {strings["home_furniture_five"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-furniture-six"}>
                      {strings["home_furniture_six"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-furniture-seven"}>
                      {strings["home_furniture_seven"]}
                    </Link>
                  </li> */}
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-electronics"}>
                      {strings["home_electronics"]}
                    </Link>
                  </li>
                  {/* <li>
                    <Link to={process.env.PUBLIC_URL + "/home-electronics-two"}>
                      {strings["home_electronics_two"]}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={process.env.PUBLIC_URL + "/home-electronics-three"}
                    >
                      {strings["home_electronics_three"]}
                    </Link>
                  </li> */}
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-book-store"}>
                      {strings["home_book_store"]}
                    </Link>
                  </li>
                  {/* <li>
                    <Link to={process.env.PUBLIC_URL + "/home-book-store-two"}>
                      {strings["home_book_store_two"]}
                    </Link>
                  </li> */}
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-plants"}>
                      {strings["home_plants"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-flower-shop"}>
                      {strings["home_flower_shop"]}
                    </Link>
                  </li>
                  {/* <li>
                    <Link to={process.env.PUBLIC_URL + "/home-flower-shop-two"}>
                      {strings["home_flower_shop_two"]}
                    </Link>
                  </li> */}
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-organic-food"}>
                      {strings["home_organic_food"]}
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to={process.env.PUBLIC_URL + "/home-organic-food-two"}
                    >
                      {strings["home_organic_food_two"]}
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link to={process.env.PUBLIC_URL + "/home-onepage-scroll"}>
                      {strings["home_onepage_scroll"]}
                    </Link>
                  </li> */}
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link to={process.env.PUBLIC_URL + "/"}>
                      {strings["home_group_three"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-auto-parts"}>
                      {strings["home_auto_parts"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-cake-shop"}>
                      {strings["home_cake_shop"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-handmade"}>
                      {strings["home_handmade"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-pet-food"}>
                      {strings["home_pet_food"]}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={process.env.PUBLIC_URL + "/home-medical-equipment"}
                    >
                      {strings["home_medical_equipment"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-christmas"}>
                      {strings["home_christmas"]}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-black-friday"}>
                      {strings["home_black_friday"]}
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to={process.env.PUBLIC_URL + "/home-black-friday-two"}
                    >
                      {strings["home_black_friday_two"]}
                    </Link>
                  </li> */}
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-valentines-day"}>
                      {strings["home_valentines_day"]}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              {" "}
              {strings["shop"]}
             
            </Link>
            
          </li>
        
  
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {strings["pages"]}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/cart"}>
                  {strings["cart"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/checkout"}>
                  {strings["checkout"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/wishlist"}>
                  {strings["wishlist"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/compare"}>
                  {strings["compare"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  {strings["my_account"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  {strings["login_register"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/about"}>
                  {strings["about_us"]}
                </Link>
              </li>
           
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
              {strings["blog"]}
           
            </Link>
            {/* <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                  {strings["blog_standard"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-no-sidebar"}>
                  {strings["blog_no_sidebar"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-right-sidebar"}>
                  {strings["blog_right_sidebar"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  {strings["blog_details_standard"]}
                </Link>
              </li>
            </ul> */}
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {strings["contact_us"]}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object
};

export default multilanguage(NavMenu);
