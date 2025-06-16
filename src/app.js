import * as Backbone from "./js/backbone.js";
// import * as _ from "./js/underscore";
import * as Handlebars from "./js/handlebars.js";
import * as $ from "./js/jquery.js";

let refreshBtnEl = $("#refresh");
let tbodyEl = $("#table tbody");
const API_URL = "http://localhost:5000/api/v2";

// Backbone.Collection
const Stock = Backbone.Model.extend({
  // urlRoot: function () {
  //     return 'https:.../posts' + '/' +
  //       this.get('postId')
  //         + "/" + this.get('tag');
  // },
  // date: Date,
  // code: String,
  // short_name: String,
  // bid: Number,
  // offer: Number,
  // last: Number,
  // close: Number,
  // high: Number,
  // low: Number,
  // open: Number,
  // chg_today: Number,
  // vol_today: Number,
  // num_trades: Number
});

const Stocks = Backbone.Collection.extend({
  model: Stock,
  url: `${API_URL}/stocks`,
  parse: function (data) {
    return data.data;
  },
});

const StocksView = Backbone.View.extend({
  template: Handlebars.compile($("#dashboard-view-template").html()),
  initialize: function () {
    this.render();
  },
  render: function () {
    this.$el.html(
      this.template({ greeting: "This will display a list of our blog posts" })
    );
  },
});

let AppRouter = Backbone.Router.extend({
  routes: {
    '': 'dashboardRoute',
    'dashboard': 'dashboardRoute',
    'create-blog': 'createBlogRoute',
  },
  dashboardRoute: function () {
    let dashboardView = new DashboardView();
    $("#content-container").html(dashboardView.el);
  },
  createBlogRoute: function () {
    let createBlogView = new CreateBlogView();
    $("#content-container").html(createBlogView.el);
  }
});

// let appRouter = new AppRouter();
// Backbone.history.start();

let stock = new Stock();
let stocks = new Stocks();

stocks.fetch();
populateTable(stocks);

// Poll every 10 seconds to keep the stock model up-to-date.
// setInterval(function() {
//     stock.fetch();
// }, 10000);

refreshBtnEl.on("click", function (e) {
  stocks.fetch();

  populateTable(stocks.toJSON());
});

function populateTable(data) {
  let d = "";

  data.forEach(function (quote) {
    let isPositiveChange = quote["chg_today"] > 0;
    let changeColor = isPositiveChange ? "green" : "red";
    let indicator = isPositiveChange ? "🔺" : "🔻";
    let percentChange =
      ((quote["last"] - quote["close"]) / quote["close"]) * 100;

    // ↗️⬇️↘️⬆️➡️📈📉

    d += `
            <tr>
                <td>${quote["code"]}</td>
                <td class="${changeColor}">${quote["bid"]} (${percentChange} ${indicator})</td>
                <td class="${changeColor}">${quote["offer"]} (${percentChange} ${indicator})</td>
                <td>${quote["open"]}</td>
                <td>${quote["close"]}</td>
                <td>${quote["last"]}</td>
                <td>${quote["high"]}</td>
                <td>${quote["low"]}</td>
                <td>${quote["chg_today"]}</td>
                <td>${quote["vol_today"]}</td>
                <td>${quote["num_trades"]}</td>
            </tr>
        `;
  });

  tbodyEl.html(d);
}
