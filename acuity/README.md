# Acuity

A formsort [custom question](https://github.com/formsort/oss/tree/master/packages/custom-question-api) implementing an [Acuity Scheduling](https://acuityscheduling.com/) embed.

It's helpful for prompting a responder to schedule a meeting within a flow, without needing redirects.

## Usage

The question itself is hosted on Github Pages: https://formsort.github.io/custom-question-examples/acuity/. If you want to customize it, you'd need to the built version of this package somewhere yourself.

1. Add your Acuity URL (for example, as the `?url=` parameter for this page. So, if your Acuity URL is normally `https://testxyz.as.me/`, you'd have `https://formsort.github.io/custom-question-examples/acuity/?url=https://testxyz.as.me`
1. The above URL can be set as the _Source URL_ for a [custom question](https://docs.formsort.com/building-flows/content-types/custom) within the Formsort Studio, and should work out of the box.
1. The Acuity embed is rather tall - you may want to set the _Default width_ to 100% so that it takes up the full width of the form, and the _Default height_ to something like 800px. The embed should resize as you navigate through the pages.

## Note on the scheduled event

NOTE: Acuity does not provide a well-documented way to determine the details of what was scheduled in an embedded scheduler. This question attempts to just read the "load:" event, which seems to be an internal API.

For this reason, ideally your Acuity question would be optional, so that users can continue even if they didn't actually schedule.

Unfortunately it seems that Acuity does not natively support redirects at the end of forms either, so it is rather difficult to make this a truly well-integrated scheduler.

## Developing

```bash
yarn
yarn dev
```

## Building

```bash
yarn build
```
