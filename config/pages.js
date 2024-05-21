const _ = require("lodash");

class PageConfig {
  constructor() {
    this.pages = [
      {
        name: "login",
        entypoint: "./src/layouts/login",
        store: {
          title: "Login",
          scripts: [
            "js/jquery.js",
            "js/vendor-all.min.js",
            "js/plugins/bootstrap.min.js",
            "js/pcoded.min.js",
            "js/moment.js",
            "js/common.js",
            "js/login.js"
          ],
          styles: ["css/bootstrap.min.css","css/new_style.css", "font-awesome/css/font-awesome.min.css", "css/login.css"],
          navDisplay: true
        },
      },
      {
        name: "dashboard",
        entypoint: "./src/layouts/dashboard",
        store: {
          title: "Dashboard",
          scripts: [
            "js/vendor-all.min.js",
            "js/plugins/bootstrap.min.js",
            "js/pcoded.min.js",
            "js/moment.js",
            "js/plugins/apexcharts.min.js",
            "js/pages/chart-apex.js",
            "js/common.js",
            "js/dashboard.js"
          ],
          styles: ["css/bootstrap.min.css",
            "css/theme.css",
            "css/new_style.css",
            "font-awesome/css/font-awesome.min.css"],
        }
      },
      {
        name: "tour",
        entypoint: "./src/layouts/tour",
        store: {
          title: "Tour",
          scripts: [
            "js/vendor-all.min.js",
            "js/plugins/bootstrap.min.js",
            "js/pcoded.min.js",
            "js/moment.js",
            "js/plugins/apexcharts.min.js",
            "js/pages/chart-apex.js",
            "js/common.js",
            "js/tour.js"
          ],
          styles: ["css/bootstrap.min.css",
            "css/theme.css",
            "css/new_style.css",
            "font-awesome/css/font-awesome.min.css"],
        }
      },
      {
        name: "add-senderid",
        entypoint: "./src/layouts/add-senderid",
        store: {
          title: "Add Sender ID",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../js/common.js",
            "../js/moment.js",
            "../js/add-senderid.js"
          ],
          // styles: ["../css/bootstrap.css"],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "bulk-upload",
        entypoint: "./src/layouts/bulk-upload",
        store: {
          title: "Bulk Upload",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../js/common.js",
            "../js/moment.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../datepicker/js/datetimepicker.js",
            "../js/pages/bulk_upload.js",
            "../js/translation/component.js",
            "../js/translation/jsapi.js",
            "../js/translation/texteditor_custom.js",
            "../js/select2.min.js",
            "../js/bulk-upload.js",
            "../js/combodate.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../datepicker/css/datetimepicker.css",
            "../css/theme.css",
            "../css/custom.css",
            "../css/new_style.css",
            "../css/select2.min.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "quick-message",
        entypoint: "./src/layouts/quick-message",
        store: {
          title: "Quick Message",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../js/moment.js",
            "../js/common.js",
            "../js/translation/component.js",
            "../js/translation/jsapi.js",
            "../js/translation/texteditor_custom.js",
            "../js/pages/bulk_upload.js",
            "../js/select2.min.js",
            "../js/quick-message.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../css/custom.css",
            "../css/select2.min.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "summary-report",
        entypoint: "./src/layouts/summary-report",
        store: {
          title: "Summary Report",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../datepicker/js/datetimepicker.js",
            "../js/common.js",
            "../js/moment.js",
            // "../js/datetimepicker.js",
            "../js/summary-report.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../datepicker/css/datetimepicker.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "detailed-report",
        entypoint: "./src/layouts/detailed-report",
        store: {
          title: "Detailed Report",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../datepicker/js/datetimepicker.js",
            "../js/common.js",
            "../js/moment.js",
            "../js/detailed-report.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../datepicker/css/datetimepicker.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]

        }
      },
      {
        name: "scheduled-campaign",
        entypoint: "./src/layouts/scheduled-campaign",
        store: {
          title: "Scheduled Champaign",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../js/vendor.js",
            "../js/common.js",
            "../js/moment.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            // "../datatable/js/responsive.bootstrap4.min.js",
            "../js/plugins/apexcharts.min.js",
            "../js/pages/chart-apex.js",
            "../datepicker/js/jquery-ui.js",
            "../datepicker/js/datetimepicker.js",
            "../js/scheduled-campaign.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../datepicker/css/datetimepicker.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "detailed-analysis",
        entypoint: "./src/layouts/detailed-analysis",
        store: {
          title: "Detailed Analysis",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../js/vendor.js",
            "../js/common.js",
            "../js/moment.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            // "../datatable/js/responsive.bootstrap4.min.js",
            "../js/plugins/apexcharts.min.js",
            "../js/pages/chart-apex.js",
            "../datepicker/js/jquery-ui.js",
            "../datepicker/js/datetimepicker.js",
            "../js/detailed-analysis.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../datepicker/css/datetimepicker.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "campaign-report",
        entypoint: "./src/layouts/campaign-report",
        store: {
          title: "Campaign Report",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../js/vendor.js",
            "../js/common.js",
            "../js/moment.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            // "../datatable/js/responsive.bootstrap4.min.js",
            "../js/plugins/apexcharts.min.js",
            "../js/pages/chart-apex.js",
            "../datepicker/js/jquery-ui.js",
            "../datepicker/js/datetimepicker.js",
            "../js/campaign-report.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../datepicker/css/datetimepicker.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "downloadReport",
        entypoint: "./src/layouts/downloadReport",
        store: {
          title: "Download Report",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../datepicker/js/datetimepicker.js",
            "../js/common.js",
            "../js/moment.js",
            "../js/downloadReport.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../datepicker/css/datetimepicker.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "overview",
        entypoint: "./src/layouts/overview",
        store: {
          title: "Overview",
          scripts: [
            "../js/jquery.js",
            "../js/popper.js",
            "../js/bootstrap.js",
            "../js/common.js",
            "../js/overview.js"
          ],
          styles: ["../css/bootstrap.css"],
          campaignReport: false,
          senderIdReport: false,
          summaryReport: false,
          quickMessage: false,
          bulkUpload: false,
          detailedReport: false,
          overview: true,
          pushSms: false,
          pullDlr: false,
          blacklist: false
        }
      },
      {
        name: "services",
        entypoint: "./src/layouts/services",
        store: {
          title: "services",
          scripts: [
            "../js/jquery.js",
            "../js/popper.js",
            "../js/bootstrap.js",
            "../js/common.js",
            "../js/services.js"
          ],
          styles: ["../css/bootstrap.css"],
          campaignReport: false,
          senderIdReport: false,
          summaryReport: false,
          quickMessage: false,
          bulkUpload: false,
          detailedReport: false,
          overview: false,
          services: true,
          pushSms: false,
          pullDlr: false,
          blacklist: false
        }
      },
      {
        name: "contact-us",
        entypoint: "./src/layouts/contact-us",
        store: {
          title: "Contact Us",
          scripts: [
            "../js/jquery.js",
            "../js/popper.js",
            "../js/bootstrap.js",
            "../js/common.js",
            "../js/contact-us.js"
          ],
          styles: ["../css/bootstrap.css"],
          campaignReport: false,
          senderIdReport: false,
          summaryReport: false,
          quickMessage: false,
          bulkUpload: false,
          detailedReport: false,
          overview: false,
          services: false,
          contactUs: true,
          pushSms: false,
          pullDlr: false,
          blacklist: false
        }
      },
      {
        name: "blacklist",
        entypoint: "./src/layouts/blacklist",
        store: {
          title: "Blacklist",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../js/pages/group_msg.js",
            "../js/common.js",
            "../js/contact-us.js",
	    "../js/moment.js",
            "../js/blacklist.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "phonebook",
        entypoint: "./src/layouts/phonebook",
        store: {
          title: "Phonebook",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../js/pages/group_msg.js",
            "../js/common.js",
            "../js/contact-us.js",
	    "../js/moment.js",
            "../js/phonebook.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "group-management",
        entypoint: "./src/layouts/group-management",
        store: {
          title: "Group Management",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../js/common.js",
            "../js/contact-us.js",
            "../js/group-management.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "template-management",
        entypoint: "./src/layouts/template-management",
        store: {
          title: "Template Management",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../js/common.js",
            "../js/contact-us.js",
            "../js/template-management.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "template-mgmt",
        entypoint: "./src/layouts/template-mgmt",
        store: {
          title: "Template Management",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../js/common.js",
            "../js/contact-us.js",
            "../js/template-mgmt.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "group-message",
        entypoint: "./src/layouts/group-message",
        store: {
          title: "Group Message",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/pcoded.min.js",
            "../js/plugins/bootstrap.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../datepicker/js/datetimepicker.js",
            "../js/moment.js",
            "../js/common.js",
            "../js/combodate.js",
            "../js/translation/component.js",
            "../js/translation/jsapi.js",
            "../js/translation/texteditor_custom.js",
            "../js/select2.min.js",
            "../js/pages/bulk_upload.js",
            "../js/pages/group_msg.js",
            "../js/group-message.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../css/theme.css",
            "../css/custom.css",
            "../css/new_style.css",
            "../css/select2.min.css",
            "../font-awesome/css/font-awesome.min.css",
            "../datepicker/css/datetimepicker.css",
          ]
        }
      },
      {
        name: "template-message",
        entypoint: "./src/layouts/template-message",
        store: {
          title: "Template Message",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/pcoded.min.js",
            "../js/plugins/bootstrap.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../datepicker/js/datetimepicker.js",
            "../js/pages/group_msg.js",
            "../js/moment.js",
            "../js/common.js",
            "../js/combodate.js",
            "../js/template-message.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../css/theme.css",
            "../css/custom.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css",
            "../datepicker/css/datetimepicker.css",
          ]
        }
      },
      {
        name: "dynamic-message",
        entypoint: "./src/layouts/dynamic-message",
        store: {
          title: "Dynamic Message",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/pcoded.min.js",
            "../js/plugins/bootstrap.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            // "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../datepicker/js/datetimepicker.js",
            "../js/pages/bulk_upload.js",
            "../js/pages/group_msg.js",
            "../js/select2.min.js",
            "../js/common.js",
            "../js/moment.js",
            "../js/dynamic-message.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../css/theme.css",
            "../css/custom.css",
            "../css/new_style.css",
            "../css/select2.min.css",
            "../font-awesome/css/font-awesome.min.css",
            "../datepicker/css/datetimepicker.css",
          ]
        }
      },
      {
        name: "short-url",
        entypoint: "./src/layouts/short-url",
        store: {
          title: "New Short URL",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../js/common.js",
            "../js/short-url.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "domain-manager",
        entypoint: "./src/layouts/domain-manager",
        store: {
          title: "Domain Manager",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../js/common.js",
            "../js/contact-us.js",
            "../js/domain-manager.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "credits-management",
        entypoint: "./src/layouts/credits-management",
        store: {
          title: "Credits Management",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../datepicker/js/datetimepicker.js",
            "../js/common.js",
            "../js/moment.js",
            // "../js/datetimepicker.js",
            "../js/credits-management.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../datepicker/css/datetimepicker.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
    {
        name: "user-profile",
        entypoint: "./src/layouts/user-profile",
        store: {
          title: "User Profile",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../datepicker/js/datetimepicker.js",
            "../js/common.js",
            "../js/moment.js",
            // "../js/datetimepicker.js",
            "../js/user-profile.js"
          ],
          styles: ["../css/bootstrap.min.css",
            "../datatable/css/dataTables.bootstrap4.min.css",
            "../datatable/css/responsive.bootstrap4.min.css",
            "../datepicker/css/jquery-ui.css",
            "../datepicker/css/datetimepicker.css",
            "../css/theme.css",
            "../css/new_style.css",
            "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
      {
        name: "senderidReport",
        entypoint: "./src/layouts/senderidReport",
        store: {
          title: "Sender ID Report",
          scripts: [
            "../js/vendor-all.min.js",
            "../js/plugins/bootstrap.min.js",
            "../js/pcoded.min.js",
            "../datatable/js/jquery.dataTables.min.js",
            "../datatable/js/dataTables.bootstrap4.min.js",
            "../datatable/js/dataTables.responsive.min.js",
            "../datatable/js/responsive.bootstrap4.min.js",
            "../datepicker/js/jquery-ui.js",
            "../datepicker/js/datetimepicker.js",
            "../js/common.js",
            "../js/moment.js",
            "js/senderidReport.js"
          ],
          styles: [
            "../css/bootstrap.min.css",
              "../datatable/css/dataTables.bootstrap4.min.css",
              "../datatable/css/responsive.bootstrap4.min.css",
              "../datepicker/css/jquery-ui.css",
              "../datepicker/css/datetimepicker.css",
              "../css/theme.css",
              "../css/new_style.css",
              "../font-awesome/css/font-awesome.min.css"
          ]
        }
      },
    ];
  }

  getPageList() {
    return this.pages;
  }

  getStore(pageName) {
    return _.find(this.getPageList(), { name: pageName }).store;
  }

  getWebPackEntry() {
    let webPackEntry = {};
    this.getPageList().forEach(page => {
      webPackEntry[page.name] = page.entypoint;
    });
    return webPackEntry;
  }
}

module.exports = new PageConfig();
