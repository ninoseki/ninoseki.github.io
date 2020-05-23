---
title: Random notes and tips about developing a browser extension
date: 2020-05-16
---

# {{$page.title}}

<span style="color: #999;">{{$page.readingTime.text}}...</span>

I'm developing a browser extension which is released on Chrome Web Store and Mozilla Add-ons. It has 2,000+ active users and somewhat good reputations.

- [https://github.com/ninoseki/mitaka](https://github.com/ninoseki/mitaka)

Here are random notes and tips from my experience.

## Tips#1. Use webextension-polyfill

[webextension-polyfill](https://github.com/mozilla/webextension-polyfill) is a polyfill to fill gaps between Chrome and Firefox and also it provides Promise-based APIs.

It makes easy to develop a cross-platform extension in single code base.

Also, there is a wrapper for TypeScript named [webextension-polyfill-ts](https://github.com/Lusito/webextension-polyfill-ts).

## Tips#2. Use a starter kit

Webpack is a de-facto standard tool for bundling assets, but learning how to configure webpack is not easy.

So I recommend to use a starter kit.

- [web-extension-starter](https://github.com/abhijithvijayan/web-extension-starter/tree/master)
  - A feature rich starter kit for TypeScript & webpack
- [chrome-extension-typescript-starter](https://github.com/chibat/chrome-extension-typescript-starter)
  - A simple starter kit for TypeScript & webpack
- [vue-web-extension](https://github.com/Kocal/vue-web-extension)
  - A starter kit for Vue.js & webpack

## Tips#3. Use a mock

Writing tests for background & content scripts is hard. Especially mocking APIs is troublesome. So you should use a proper mocking library for testing.

- [jest-webextension-mock](https://github.com/clarkbw/jest-webextension-mock)
  - A mock module for Jest
- [mockzilla-webextension](https://github.com/lusito/mockzilla-webextension)
  - A mock module for Jest & TypeScript
- [webextensions-api-mock](https://github.com/stoically/webextensions-api-mock)
  - A mock module for Sinon

## Tips#4. Know the differences

`webextension-polyfill` resolves most of the differences between Chrome and Firefox but still there are differences. So knowing the differences is very important.

- [Differences between API implementations](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Differences_between_API_implementations)

## Note#1. Publishing an extension is not easy

Publishing an extension is not easy. Especially publishing an extension on Chrome Web Store is difficult.

In Chrome Web Store:

- You should write a [privacy policy](https://developer.chrome.com/webstore/terms#use) to publish an extension.
- You should write justifications if you use potentially dangerous APIs and permissions.
  ![](https://i.imgur.com/z0EWN1v.png)
- The submission to Chrome Web Store requires a human review and it takes time.
  ![](https://i.imgur.com/gOfFQx8.png)

In contrast, Mozilla Add-ons doesn't have a strict policy like Chrome Web Store has.

Mozilla Add-ons doesn't demand a privacy policy and a human review. Mozilla Add-ons demands "Notes to Reviewer" for submission, but it is just an option.

![](https://i.imgur.com/3VdzXUs.png)

## Note#2. Chrome Web Store's rejection policy is unclear

I've got removal notifications from Chrome Web Store several times because of "Spam and Placement in the Store".

![](https://i.imgur.com/4Pbln8T.png)
![](https://i.imgur.com/9gLFsFb.png)

I swear that I haven't commit spamming. My extension is an OSS project and I don't have a way to monetize it. There is no reason to do spamming.

I asked the reason behind the removal, but there is no response from Chrome Web Store.

It is a little bit scary. Chrome dominates the market and it rejects an extension with an unclear reason.

I wish Chrome Web Store will have a clearer policy for rejection.
