import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { format } from "date-fns";
import Banner from "../Banner";

export default function Analyse_dashboard() {
  const [serieOrder, setSerieOrder] = useState([]);
  const [seriesProduct, setseriesProduct] = useState([]);
  const [optionsProduct, setoptionsProduct] = useState({});
  const [orders, setOrders] = useState([]);
  const [ordersPaye, setOrdersPaye] = useState([]);
  const [product, setproduct] = useState([]);
  const [users, setusers] = useState([]);

  const optionsOrder = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "50%",
      },
    },

    stroke: {
      width: 2,
    },

    grid: {
      row: {
        colors: ["#fff", "#f2f2f2"],
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + " orders";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      type: "datetime",
      // position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },

      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + " orders";
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100],
      },
    },
  };

  useEffect(() => {
    async function getorders() {
      const results = await axios.get("http://localhost:3200/api/get_order");
      setOrders(results.data.data);
      sommeOrder(results.data.data)
      OrderDataChart(results.data.data);
    }
    async function getproduct() {
      const results = await axios.get("http://localhost:3200/api/get_produit");
      setproduct(results.data.data);
      ProductDataChart(results.data.data);
    }
    async function getUsers() {
      let Sadmin = 0;
      let Sconseil = 0;
      let Sclient = 0;
      const results = await axios.get("http://localhost:3200/api/get_allUsers");
      let data = results.data.users;
      for (let i = 0; i < data.length; i++) {
        if (data[i].role === "client") {
          Sclient=Sclient+1
        }
        if (data[i].role === "super_admin") {
          Sadmin=Sadmin+1

        }
        if (data[i].role === "conseilleur") {
          Sconseil=Sconseil+1

        }
      }
      setusers({admin:Sadmin,client:Sclient,cons:Sconseil});
    }
    getorders();
    getproduct();
    getUsers();
  }, []);

  const sommeOrder=(data)=>{
    let s=0
    for (let i = 0; i < data.length; i++) {
      if (data[i].etat==="paye") {
        s=1+s
      }
    }
    setOrdersPaye(s)
  }

  const ProductDataChart = (data) => {
    let category = [];
    let series = [];
    const grouped = groupByCategorie(data, "category");
    for (let i = 0; i < Object.keys(grouped).length; i++) {
      category.push(Object.keys(grouped)[i]);
      series.push(Object.values(grouped)[i].length);
    }
    const options = {
      annotations: {
        points: [
          {
            x: "Bananas",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0",
              },
              text: "Bananas are good",
            },
          },
        ],
      },
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: category,
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Servings",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    };
    setoptionsProduct(options);
    setseriesProduct([{ name: "product", data: series }]);
  };
  const groupByCategorie = (tableauObjets, propriete) => {
    return tableauObjets.reduce(function (acc, obj) {
      var array = [];
      var cle = obj[propriete];
      if (!acc[cle]) {
        acc[cle] = [];
        array[cle] = [];
      }

      acc[cle].push(obj);
      return acc;
    }, {});
  };
  const OrderDataChart = (data) => {
    const groups = data.reduce((groups, game) => {
      let date = format(new Date(game.Order_date), "dd MMM yyyy");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(game);
      return groups;
    }, {});
    const groupArrays = Object.keys(groups).map((date) => {
      return [groups[date][0].Order_date, groups[date].length];
    });
    setSerieOrder([{ name: "Nombre d'order", data: groupArrays }]);
  };
  return (
    <div className="app-main__outer">
      <div className="app-main__inner">
        <Banner title="Analytics Dashboard" icon="pe-7s-graph2" />

        <div className="row">
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3 widget-content bg-midnight-bloom">
              <div className="widget-content-wrapper text-white">
                <div className="widget-content-left">
                  <div className="widget-heading">Total Orders</div>
                  <div className="widget-subheading">Total Orders</div>
                </div>
                <div className="widget-content-right">
                  <div className="widget-numbers text-white ml-3">
                    <span> {orders.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3 widget-content bg-arielle-smile">
              <div className="widget-content-wrapper text-white">
                <div className="widget-content-left">
                  <div className="widget-heading">Total Orders Payé</div>
                  <div className="widget-subheading">Total Orders Payé</div>
                </div>
                <div className="widget-content-right">
                  <div className="widget-numbers text-white ml-3">
                    <span>{ordersPaye}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3 widget-content bg-grow-early">
              <div className="widget-content-wrapper text-white">
                <div className="widget-content-left">
                  <div className="widget-heading"> Products</div>
                  <div className="widget-subheading"> Total Products </div>
                </div>
                <div className="widget-content-right">
                  <div className="widget-numbers text-white ml-3">
                    <span>{product.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-xl-none d-lg-block col-md-6 col-xl-4">
            <div className="card mb-3 widget-content bg-premium-dark">
              <div className="widget-content-wrapper text-white">
                <div className="widget-content-left">
                  <div className="widget-heading">Products Sold</div>
                  <div className="widget-subheading">Revenue streams</div>
                </div>
                <div className="widget-content-right">
                  <div className="widget-numbers text-warning">
                    <span>$14M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3 widget-content">
              <div className="widget-content-outer">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left">
                    <div className="widget-heading"> Client</div>
                    <div className="widget-subheading">Total Clients Account</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-success ml-3">{users.client}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3 widget-content">
              <div className="widget-content-outer">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left">
                    <div className="widget-heading">Conseilleur</div>
                    <div className="widget-subheading">Total Conseilleur Account</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-success ml-3">{users.cons}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3 widget-content">
              <div className="widget-content-outer">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left">
                    <div className="widget-heading">Admin</div>
                    <div className="widget-subheading">Total Admin Account</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-success ml-3">{users.admin}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-xl-none d-lg-block col-md-6 col-xl-4">
            <div className="card mb-3 widget-content">
              <div className="widget-content-outer">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left">
                    <div className="widget-heading">Income</div>
                    <div className="widget-subheading">Expected totals</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-focus">$147</div>
                  </div>
                </div>
                <div className="widget-progress-wrapper">
                  <div className="progress-bar-sm progress-bar-animated-alt progress">
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      aria-valuenow={54}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: "54%" }}
                    />
                  </div>
                  <div className="progress-sub-label">
                    <div className="sub-label-left">Expenses</div>
                    <div className="sub-label-right">100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="mb-3 card">
              <div className="card-header-tab card-header">
                <div className="card-header-title">
                  <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"></i>
                  Product analyse
                </div>
              </div>
              <div className="tab-content">
                <div className="widget-chart p-3">
                  <div id="chart">
                    <ReactApexChart
                      options={optionsProduct}
                      series={seriesProduct}
                      type="bar"
                      height={350}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="mb-3 card">
              <div className="card-header-tab card-header">
                <div className="card-header-title">
                  <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"></i>
                  Order analyse
                </div>
              </div>
              <div className="tab-content">
                <div className="widget-chart p-3">
                  <div id="chart">
                    <ReactApexChart
                      options={optionsOrder}
                      series={serieOrder}
                      type="bar"
                      height={350}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
