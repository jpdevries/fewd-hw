# Front End Programming Assignment

This is a coding assignment&nbsp;submission.

> Implement any changes that you deem necessary, so that this chart could support rendering real&ndash;time&nbsp;data.

From this I derived that the chart should support both the current "month" view as well as real&ndash;time and current day&nbsp;views.

## Getting Started
```bash
cd ~/Desktop
git clone https://github.com/jpdevries/fewd-hw.git
cd fewd-hw
npm install # install stuff for the mock server
npm run prestart #just to be safe
npm run start # launch the server
open http://localhost:3001 # here we go
```

Run the server on a custom `PORT` like&nbsp;so:
```bash
PORT=3042 npm run serve
```

## Architectural Decisions
I hooked `create-react-app` up to an Express Node server. The charts are done with `recharts` which is a React wrapper for&nbsp;D3. I didn't include the rightmost yAxis (change in segment) because there didn't see to be any example data for it, but I did verify that two yAxes are possible with&nbsp;`recharts`.

A CSS Grid / flexbox layout is used to ensure the chart takes up as much space as it can. Since this layout utilizes modern CSS, the assignment is best viewed in&nbsp;Chrome.

## Month Preview
The month view mode has a scrubber that allows you to zoom in on particular sets of the given&nbsp;month.

<details open>
  <summary>GIF Preview</summary>
  <img src="http://j4p.us/0c2t05161G39/scrubber.gif" />
</details>

## Month View
The month view has a scrubber that allows you to zoom in on particular sets of the given&nbsp;month.

<details open>
  <summary>GIF Preview</summary>
  <img src="http://j4p.us/0c2t05161G39/scrubber.gif" />
</details>

## Today View
The today view displays a sample point for each hour of the day. It reaches out periodically to the API to keep the data&nbsp;fresh.

<details open>
  <summary>GIF Preview</summary>
  <img src="http://j4p.us/0R191l1j2M1T/today.gif" />
</details>

## Real&ndash;time View
The real&ndash;time view displays a sample point for every few seconds. It reaches out to the API every ten seconds or so to keep the data&nbsp;fresh.

<details open>
  <summary>GIF Preview</summary>
  <img src="http://j4p.us/0w1M2H3v321u/realtime.gif" />
</details>

## Accessible Components
Above the chart is located an accessible `<fieldset>` of radio inputs to change the view&nbsp;mode.  

Even if the design called for custom tabs, I would use an HTML&ndash;first design process so that such customizations are progressively enhanced from semantic and accessible HTML. Specifically, I'd visually hide the inputs themselves with the `.visually-hidden` pattern and then use CSS to style the `<label>` elements of the corresponding inputs as needed. Then, any user, sighted, low&ndash;vision, non&ndash;sighted, keyboard or mouse alike would all be able to change the view&nbsp;mode!

_Note: The month scrubber and SVG Graphic itself are not accessible. In a real world environment and budget depending I would make additional measures to ensure they are inclusively architected as&nbsp;well._
