import { injectGlobal } from 'styled-components'
injectGlobal`

@font-face {font-family: "iconfont";
  src: url('./iconfont.eot?t=1532060228484'); /* IE9*/
  src: url('./iconfont.eot?t=1532060228484#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('./iconfont.ttf?t=1532060228484') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('./iconfont.svg?t=1532060228484#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-spin:before { content: "\e851"; }

.icon-like1:before { content: "\e61e"; }

.icon-moreif:before { content: "\e686"; }

.icon-fangdajing:before { content: "\e627"; }

.icon-like:before { content: "\e701"; }

.icon-Aa:before { content: "\e636"; }

.icon-comment:before { content: "\e719"; }

.icon-maobi:before { content: "\e6a4"; }




`
