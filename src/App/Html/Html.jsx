import HtmlBase from 'lego-starter-kit/ReactApp/Html'
import { Provider } from 'mobx-react'

require('./Html.global.css')

// export class Root extends HtmlBase.Root {
//   render() {
//     const stores = this.props.ctx.provider && this.props.ctx.provider.provide() || this.props.ctx.stores || {}
//     return <Provider { ...stores } >
//       {this.props.component}
//     </Provider>
//   }
// }

export default class Html extends HtmlBase {

  // static Root = Root;
  renderStyle() {
    return `<style id="css"></style>`
  }

  renderHead() {
    return `\
${super.renderHead()}
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.5/css/bootstrap-flex.min.css" rel="stylesheet"/>
`
  }

  renderFooter() {
    return `\
${super.renderFooter()}
${require('raw!./footer.html')}
`
  }

}
