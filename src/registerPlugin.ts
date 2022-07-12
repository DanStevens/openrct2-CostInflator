/// <reference path="../../OpenRCT2.repo/distribution/openrct2.d.ts" />
/// <reference path="./types.d.ts" />

import main from './main';

registerPlugin({
  name: 'CostInflator',
  version: '0.1.0',
  authors: ['DanStevens'],
  type: 'local',
  licence: 'MIT',
  main,
});
