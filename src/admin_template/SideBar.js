import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function SideBar(props) {
  const { dataUser } = props;
  return (
    <div className="app-sidebar sidebar-shadow">
      <div className="app-header__logo">
        <div className="logo-src" />
        <div className="header__pane ml-auto">
          <div>
            <button
              type="button"
              className="hamburger close-sidebar-btn hamburger--elastic"
              data-class="closed-sidebar"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="app-header__mobile-menu">
        <div>
          <button
            type="button"
            className="hamburger hamburger--elastic mobile-toggle-nav"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
      </div>
      <div className="app-header__menu">
        <span>
          <button
            type="button"
            className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
          >
            <span className="btn-icon-wrapper">
              <i className="fa fa-ellipsis-v fa-w-6" />
            </span>
          </button>
        </span>
      </div>
      <div className="scrollbar-sidebar">
        <div className="app-sidebar__inner">
          <ul className="vertical-nav-menu">
            {dataUser.role === "super_admin" ? (
              <Fragment>
                <li className="app-sidebar__heading">Dashboards Directeur</li>

                <li>
                  <Link to="/" className="mm-active">
                    <i className="metismenu-icon pe-7s-rocket" />
                    Analyse_dashboard
                  </Link>
                </li>
                <li className="app-sidebar__heading">UI Components</li>
                <li>
                  <a>
                    <i className="metismenu-icon pe-7s-user" />
                    Analyse des données
                    <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                  </a>
                  <ul>
                    <li>
                      <Link to="/Analyse">
                        <i className="metismenu-icon" />
                        Analyse
                      </Link>
                    </li>
                  
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="metismenu-icon pe-7s-user" />
                    Conseiller des ventes
                    <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                  </a>
                  <ul>
                    <li>
                      <Link to="/Add_conseilleur">
                        <i className="metismenu-icon" />
                        Ajouter conseiller
                      </Link>
                    </li>
                    <li>
                      <Link to="/Table_conseilleur">
                        <i className="metismenu-icon" />
                        Tableau conseiller
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="metismenu-icon pe-7s-user" />
                    Utilisateur
                    <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                  </a>
                  <ul>
                    <li>
                      <Link to="Table_user">
                        <i className="metismenu-icon" />
                        tableau d'utilisateur
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="metismenu-icon pe-7s-user" />
                    Orders
                    <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                  </a>
                  <ul>
                    <li>
                      <Link to="Table_orders">
                        <i className="metismenu-icon" />
                        tableau d'orders
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="metismenu-icon pe-7s-user" />
                    Payment
                    <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                  </a>
                  <ul>
                    <li>
                      <Link to="Table_Payment">
                        <i className="metismenu-icon" />
                        tableau de payment
                      </Link>
                    </li>
                  </ul>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="app-sidebar__heading">Dashboards Conseilleur</li>
                <li>
                  <a>
                    <i className="metismenu-icon pe-7s-user" />
                    Analyse  
                    <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                  </a>
                  <ul>
                    <li>
                      <Link to="/Analyse">
                        <i className="metismenu-icon" />
                        Analyse des données
                      </Link>
                    </li>
                  
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="metismenu-icon pe-7s-cart" />
                    Produit
                    <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                  </a>
                  <ul>
                    <li>
                      <Link to="/Add_Product">
                        <i className="metismenu-icon" />
                        Ajouter Produit
                      </Link>
                    </li>
                    <li>
                      <Link to="/Table_Product">
                        <i className="metismenu-icon" />
                        Tableau de Produit
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <a>
                    <i className="metismenu-icon pe-7s-user" />
                    Utilisateur
                    <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                  </a>
                  <ul>
                    <li>
                      <Link to="Table_user">
                        <i className="metismenu-icon" />
                        tableau d'utilisateur
                      </Link>
                    </li>
                  </ul>
                </li>
                
                <li>
                  <a>
                    <i className="metismenu-icon pe-7s-user" />
                    Orders
                    <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                  </a>
                  <ul>
                    <li>
                      <Link to="Table_orders">
                        <i className="metismenu-icon" />
                        tableau d'orders
                      </Link>
                    </li>
                  </ul>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
