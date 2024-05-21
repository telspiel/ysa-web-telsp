const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const exphbs = require("express-handlebars");
const PageConfig = require("./../config/pages.js");

const app = express();
const hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "layouts"),
  partialsDir: path.join(__dirname, "partials")
});

app.use(bodyParser.json({ type: "application/*+json" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "./../dist")));
app.use(function(req, res, next) {
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-Frame-Options", "DENY");
  res.header("X-XSS-Protection", "1; mode=block");
  res.header("X-Powered-By", "IR");
  next();
});

app.engine("hbs", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "layouts"));

app.get("/", function(req, res) {
  res.redirect("/login");
});

app.get("/login", function(req, res) {
  res.render("login/index.hbs", PageConfig.getStore("login"));
});

app.get("/bulk-upload", function(req, res) {
  res.render("bulk-upload/index.hbs", {
    ...PageConfig.getStore("bulk-upload")
  });
});

app.get("/quick-message", function(req, res) {
  res.render("quick-message/index.hbs", {
    ...PageConfig.getStore("quick-message")
  });
});


app.get("/summary-report", function(req, res) {
  res.render("summary-report/index.hbs", {
    ...PageConfig.getStore("summary-report")
  });
});

app.get("/add-senderid", function(req, res) {
  res.render("add-senderid/index.hbs", {
    ...PageConfig.getStore("add-senderid")
  });
});

app.get("/dashboard", function(req, res) {
  res.render("dashboard/index.hbs", {
  ...PageConfig.getStore("dashboard")
 });
});

app.get("/tour", function(req, res) {
  res.render("tour/index.hbs", {
  ...PageConfig.getStore("tour")
 });
});


app.get("/detailed-report", function(req, res) {
  res.render("detailed-report/index.hbs", {
    ...PageConfig.getStore("detailed-report")
  });
});

app.get("/campaign-report", function(req, res) {
  res.render("campaign-report/index.hbs", {
    ...PageConfig.getStore("campaign-report")
  });
});
app.get("/scheduled-campaign", function(req, res) {
  res.render("scheduled-campaign/index.hbs", {
    ...PageConfig.getStore("scheduled-campaign")
  });
});
app.get("/downloadReport", function(req, res) {
  res.render("downloadReport/index.hbs", {
    ...PageConfig.getStore("downloadReport")
  });
});
app.get("/blacklist", function(req, res) {
  res.render("blacklist/index.hbs", {
    ...PageConfig.getStore("blacklist")
  });
});

app.get("/phonebook", function(req, res) {
  res.render("phonebook/index.hbs", {
    ...PageConfig.getStore("phonebook")
  });
});

app.get("/group-management", function(req, res) {
  res.render("group-management/index.hbs", {
    ...PageConfig.getStore("group-management")
  });
});

// app.get("/template-management", function(req, res) {
//   res.render("template-management/index.hbs", {
//     ...PageConfig.getStore("template-management")
//   });
// });

app.get("/group-message", function(req, res) {
  res.render("group-message/index.hbs", {
    ...PageConfig.getStore("group-message")
  });
});

// app.get("/template-message", function(req, res) {
//   res.render("template-message/index.hbs", {
//     ...PageConfig.getStore("template-message")
//   });
// });

app.get("/template-mgmt", function(req, res) {
  res.render("template-mgmt/index.hbs", {
    ...PageConfig.getStore("template-mgmt")
  });
});

app.get("/dynamic-message", function(req, res) {
  res.render("dynamic-message/index.hbs", {
    ...PageConfig.getStore("dynamic-message")
  });
});

app.get("/short-url", function(req, res) {
  res.render("short-url/index.hbs", {
    ...PageConfig.getStore("short-url")
  });
});

app.get("/domain-manager", function(req, res) {
  res.render("domain-manager/index.hbs", {
    ...PageConfig.getStore("domain-manager")
  });
});

app.get("/detailed-analysis", function(req, res) {
  res.render("detailed-analysis/index.hbs", {
    ...PageConfig.getStore("detailed-analysis")
  });
});

app.get("/clicker-analysis", function(req, res) {
  res.render("clicker-analysis/index.hbs", {
    ...PageConfig.getStore("clicker-analysis")
  });
});
app.get("/credits-management", function(req, res) {
  res.render("credits-management/index.hbs", {
    ...PageConfig.getStore("credits-management")
  });
});
app.get("/senderidReport", function(req, res) {
  res.render("senderidReport/index.hbs", PageConfig.getStore("senderidReport"));
});
app.get("/user-profile", function(req, res) {
  res.render("user-profile/index.hbs", PageConfig.getStore("user-profile"));
});
app.get("*", function(req, res) {
  res.status(404).send("404 - Not Found!!!");
});

var server = app.listen(8189, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Genesis listening at http://%s:%s", host, port);
});
