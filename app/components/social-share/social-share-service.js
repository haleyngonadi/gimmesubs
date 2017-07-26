define(function () {
  'use strict';

  var SocialShareService = function ($location, $helpers) {
    var services = {
      gplus: {
        url: 'https://plus.google.com/share?url=ITEM_LINK'
      },
      twitter: {
        url: 'https://twitter.com/share?text=ITEM_TITLE ITEM_LINK'
      },
      facebook: {
        url: 'https://www.facebook.com/sharer/sharer.php?u=ITEM_LINK'
      },
      linkedin: {
        url: 'https://www.linkedin.com/shareArticle?mini=true&url=ITEM_LINK&title=ITEM_TITLE&summary=ITEM_SNIPPET'
      }
    };

    this.share = function (item, service) {
      var shareUrl = services[service].url.replace('ITEM_LINK', item.link).replace('ITEM_TITLE', item.title).replace('ITEM_SNIPPET', item.contentSnippet);

      chrome.tabs.create({ url: $helpers.urlAddUtmCampaign(shareUrl) });
    };
  };

  return [
    '$location',
    '$helpers',
    SocialShareService
  ];
});
