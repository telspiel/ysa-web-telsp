class Endpoints {
  constructor() {
    // this.serverAddress = "https://uatbackend1.gmstool.com";
    //this.serverAddress = "https://backend2.telsp.in";
    // this.serverAddress = "https://backend3.telsp.in";
    this.serverAddress = "https://backend2.telsp.in";
    this.endpoints = {
      login: "file-uploader/userService/login",
      verifyOtp: "file-uploader/userService/verifyotp",
      dashboard: "file-uploader/mis/dashboard",
      uploadFile: "file-uploader/uploadFile",
      scheduleFile: "file-uploader/scheduleFile",
      quickMessage: "file-uploader/sendSMSService/sendQuickSMS",
      summaryReport: "file-uploader/reportService/summaryReport",
      senderIdWiseReport: "file-uploader/reportService/senderIdWiseReport",
      detailedReport: "file-uploader/reportService/detailedReport",
      campaignReport: "file-uploader/reportService/campaignReport",
      downloadReport: "file-uploader/mis/viewGeneratedReports",
      getActiveSenderIdList: "file-uploader/senderIdService/viewSenderIdList",
      getAllSenderIdList: "file-uploader/senderIdService/viewAllSenderIdList",
      generateReport: "file-uploader/mis/generateReport",
      addSenderId: "file-uploader/senderIdService/addSenderId",
      deleteSenderId: "file-uploader/senderIdService/deleteSenderId",
      getHourlyReport: "file-uploader/reportService/getHourlySummaryReport",
      addBlackList: "file-uploader/userBlackListService/addNumberInUserBlackList",
      removeBlackList: "file-uploader/userBlackListService/removeNumberFromUserBlackList",
      uploadBlacklist: "file-uploader/userBlackListService/uploadUserBlackListNumberFile",
      getAllBlacklist: "file-uploader/userBlackListService/getAllBlacklistNumbersForUser",
      searchBlacklist: "file-uploader/userBlackListService/searchUserBlacklistNumber",
      allGroupList: "file-uploader/groupService/getAllGroupsList",
      addGroup: "file-uploader/groupService/addGroup",
      deleteGroup: "file-uploader/groupService/deleteGroup",
      addNumber: "file-uploader/groupNumberDetailsService/addNumberToGroup",
      searchNumber: "file-uploader/groupNumberDetailsService/searchNumber",
      deleteNumber: "file-uploader/groupNumberDetailsService/removeNumberFromGroup",
      addTemplate: "file-uploader/templateService/addTemplate",
      viewTemplate: "file-uploader/templateService/viewAllTemplateList",
      deleteTemplate: "file-uploader/templateService/deleteTemplate",
      sendGroupSMS: "file-uploader/groupSMSService/sendGroupSMS",
      uploadTemplateMsg: "file-uploader/templateSmsService/uploadTemplateParamFile",
      sendTemplateSMS: "file-uploader/templateSMSService/sendTemplateSMS",
      getTemplatePreview: "file-uploader/templateSMSService/getPreview",
      uploadDynamicMessage: "file-uploader/dynamicSMSService/uploadDynamicMessageFile",
      sendDynamicSMS: "file-uploader/dynamicSMSService/sendDynamicSMS",
      getDynamicPreview: "file-uploader/dynamicSMSService/getPreview",
      addShortUrl: "file-uploader/shortUrlService/addShortUrl",
      editShortUrl: "file-uploader/shortUrlService/editShortUrl",
      listShortUrl: "file-uploader/shortUrlService/viewAllActiveShortUrlForUser",
      deleteShortUrl: "file-uploader/shortUrlService/deleteShortUrl",
      listDomains: "file-uploader/shortUrlService/viewAllActiveHostNameForUser",
      getApprovedDomainList: "file-uploader/shortUrlService/getAllActiveAndApprovedHostNameForUser",
      deleteDomain: "file-uploader/shortUrlService/deleteHostName",
      addHost: "file-uploader/shortUrlService/addHostName",
      detailedAnalysis: "file-uploader/reportService/detailedAnalytics",
      detailedAnalysisReport: "file-uploader/reportService/detailedAnalyticsReport",
      clickerAnalysis: "file-uploader/reportService/clickerAnalytics",
      viewAllScheduledCampaign: "file-uploader/campaignService/viewAllScheduledCampaignForUser",
      // deleteScheduledCampaign :"file-uploader/campaignService/deleteScheduledCampaignForUser",
      deleteScheduledCampaign: "file-uploader/campaignService/deleteConsolidateScheduledCampaignForUser",
      viewAllScheduledTemplateCampaign: "file-uploader/campaignService/viewAllScheduledTemplateCampaignForUser",
      deleteScheduledTemplateCampaign: "file-uploader/campaignService/deleteScheduledTemplateCampaignForUser",
      viewAllScheduledDynamicCampaign: "file-uploader/campaignService/viewAllScheduledDynamicCampaignForUser",
      deleteScheduledDynamicCampaign: "file-uploader/campaignService/deleteScheduledDynamicCampaignForUser",
      creditHistory: "file-uploader/creditService/getCreditHistory",
      updatedPassword: "file-uploader/userProfile/updatedPassword",
      profileDetails: "file-uploader/userProfile/userProfileDetails",
      getAllNumbers: "file-uploader/groupNumberDetailsService/getAllNumbersInGroup",
      uploadContacts: "file-uploader/groupService/uploadNumberInUserGroup",
      translateText: "file-uploader/service/translateText",
      saveTemplate: "file-uploader/contentTemplateService/saveContentTemplate",
      viewAllTemplates: "file-uploader/contentTemplateService/viewAllContentTemplateList",
      deleteContentTemplate: "file-uploader/contentTemplateService/deleteContentTemplate",
      searchTemplate: "file-uploader/contentTemplateService/searchContentTemplate",
      getAllChildsForUser: "file-uploader/staticService/getAllChildsForUser",
      viewSenderIdListByMessageType: "file-uploader/senderIdService/viewSenderIdListByMessageType",
      senderIdListByMessageType: 'file-uploader/senderIdService/viewSenderIdListByMessageType',
      dltDataFile: "file-uploader/uploadDltDataFile",
      viewAllContentTemplateListByMessageType: "file-uploader/contentTemplateService/viewAllContentTemplateListByMessageType",
      senderIdListByMessageType: 'file-uploader/senderIdService/viewSenderIdListByMessageType',
      scheduledCampaign: "file-uploader/campaignService/viewConsolidateScheduledCampaignForUser",
      getAllEntityIdForSenderIdType : "file-uploader/senderIdService/getAllEntityIdForSenderIdType"
    };
  }

  get(name) {
    return `${this.serverAddress}/${this.endpoints[name]}`;
  }

  validateResponse(data) {
    if (data && typeof data === "object" && data.constructor === Object) {
      switch (data.code) {
        case 1001:
          window.location.pathname !== "/login"
            ? (window.location.href = "/login")
            : alert(data.message || "Login failed. Please try again!");
          return false;
        default:
          return data;
      }
    } else {
      alert("Something went wrong. Please try again!");
      return false;
    }
  }
}

export default new Endpoints();
