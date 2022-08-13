# 🎢 CostInflator plugin for OpenRCT2
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)

*CostInflator* is a plug-in for OpenRCT2 that allows you to increase (or decrease) the cost of various expenses, such as staff wages or ride upkeep.

## Table of contents
  * [About](#about)
  * [Features](#features)
  * [Installation](#installation)
  * [Usage](#usage)
  * [How it works](#how-it-works)

## About


The purpose of the *CostInflator* plugin is to enable a player of OpenRCT2 to dynamically change the balance of the financial aspect of the Rollercoaster Tycoon by adjusting the cost of various expenses.

## Features

![(CostInflator settings window, with default settings)](https://danstevens.github.io/CostInflatorSettingsWindow.png)

The initial release of CostInflator can be used to adjust Ride and Stall/Facility running costs (upkeep) separately, each of which can be increased (or decreased) by specifying a multiplier in the settings window (shown above). When the game calculates the running costs for these cost categories, the plugin multiplies the result by the corresponding Multiplier setting. For example, a Ride Running Costs Multiplier of `2.00` will double the running costs for all rides, while a multiplier of `0.50` will half it. Multiplier settings can range from `0.00` (for no costs) up to `99.99`.

In addition to the Multiplier setting, the Inflation setting determines the 'inflation rate' of the corresponding multiplier: At the start of each month, the value of the Inflation setting is added to the multiplier. For example, a Ride Running Costs Inflation of '0.10' will increase the Ride Running Cost Multiplier by 0.1 at the start of every month. Inflation settings can range from `-99.99` to `99.99`.

### Cost categories

The initial release of CostInflator supports the following categories:

 - Ride running costs (upkeep)
 - Stall/facility running costs (upkeep)

More will be added in future releases.

## Installation and usage

The plugin has been tested with OpenRCT2 version 0.4.0. It hasn't been tested with earlier releases.

  1. Download the latest version of the plugin from the [Releases](https://github.com/DanStevens/openrct2-CostInflator/releases) page.
  2. To install it, copy the downloaded `*.js` file into your `/OpenRCT2/`plugin folder.
      - The easiest way to find the OpenRCT2-folder is by launching the OpenRCT2 game, click and hold on the red toolbox in the main menu, and select "Open custom content folder".
      - Otherwise this folder is commonly found in `C:/Users/<YOUR NAME>/Documents/OpenRCT2/plugin` on Windows.
      - If you already had this plugin installed before, you can safely overwrite the old file.
  3. Once installed, find the 'Cost Inflator' menu item within the map menu in the toolbar to open the settings window

## Building the source code

This project is based on [wisnia74's Typescript modding template](https://github.com/wisnia74/openrct2-typescript-mod-template) and uses [Nodemon](https://nodemon.io/), [ESLint](https://eslint.org/) and [TypeScript](https://www.typescriptlang.org/) from this template.

1. Install latest version of [Node](https://nodejs.org/en/) and make sure to include NPM in the installation options.
2. Clone the project to a location of your choice on your PC.
3. Open command prompt, use `cd` to change your current directory to the root folder of this project and run `npm install`.
4. Open the file `src/registerPlugin.ts` and adjust the path to `openrct2.d.ts` appropriate for your environment (for example, `C:/Program Files/OpenRCT2/bin/openrct2.d.ts`).
6. Run `npm run build` (release build) or `npm run build:dev` (develop build) to build the project.
    - The default output folder is `./dist` for release and `./dev-build` for development and can be changed in `rollup.config.prod.js` and `rollup.config.dev.js` respectively.

## How it works

The plugin subscribes to the `'ride.ratings.calculate'` API hook, which the OpenRCT2 game engine invokes each time the running cost of a ride, stall or facility is calculated. The ride object is retrieved by ID via the `map.getRide` plugin API method and the `runningCost` property is adjusted according to the multiplier.

The plugin also subscribes to the `'interval.day'` API hook, which the OpenRCT2 game engine invokes once per day in-game time. If `date.monthProgress` is zero (meaning the month has just begun), the plugin updates the Multiplier setting for each cost category, according to the corresponding Inflation setting.

Whenever settings are changed, they are stored in the park file (via `parkStorage` API object).