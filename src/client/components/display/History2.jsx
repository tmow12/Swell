import React, { Component } from 'react';
import historyController from '../../controllers/historyController';

class History extends Component {
  constructor(props) {
		super(props);
		
    this.state = {};
    this.addHistoryToNewRequest = this.addHistoryToNewRequest.bind(this);
    this.deleteHistory = this.deleteHistory.bind(this);
  }

  addHistoryToNewRequest() {
    const requestFieldObj = {
      // restUrl: this.props.newRequestFields.restUrl,
      // wsUrl: this.props.newRequestFields.wsUrl,
      // gqlUrl: this.props.newRequestFields.gqlUrl,
      // grpcUrl: this.props.newRequestFields.grpcUrl,
      method: this.props.content.request.method ? this.props.content.request.method : 'GET',
      protocol: this.props.content.protocol ? this.props.content.protocol : 'http://',
      url: this.props.content.url ? this.props.content.url : 'http://',
      // url: this.props.newRequestFields.url,
      graphQL: this.props.content.graphQL ? this.props.content.graphQL : false,
      gRPC: this.props.content.gRPC ? this.props.content.gRPC : false
    }
    let headerDeeperCopy;
    if (this.props.content.request.headers) {
      headerDeeperCopy = JSON.parse(JSON.stringify(this.props.content.request.headers));
      headerDeeperCopy.push({
        id: this.props.content.request.headers.length + 1,
        active: false,
        key: '',
        value: '',
      })
    }
    let cookieDeeperCopy;
    if (this.props.content.request.cookies && !/ws/.test(this.props.content.protocol)) {
      cookieDeeperCopy = JSON.parse(JSON.stringify(this.props.content.request.cookies));
      cookieDeeperCopy.push({
        id: this.props.content.request.cookies.length + 1,
        active: false,
        key: '',
        value: '',
      })
    }
    const requestHeadersObj = {
      headersArr: headerDeeperCopy || [],
      count: headerDeeperCopy ? headerDeeperCopy.length : 1,
    }
    const requestCookiesObj = {
      cookiesArr: cookieDeeperCopy || [],
      count: cookieDeeperCopy ? cookieDeeperCopy.length : 1,
    }
    const requestBodyObj = {
      bodyType: this.props.content.request.bodyType ? this.props.content.request.bodyType : 'raw',
      bodyContent: this.props.content.request.body ? this.props.content.request.body : '',
      bodyVariables: this.props.content.request.bodyVariables ? this.props.content.request.bodyVariables : '',
      rawType: this.props.content.request.rawType ? this.props.content.request.rawType : 'Text (text/plain)',
      JSONFormatted: this.props.content.request.JSONFormatted ? this.props.content.request.JSONFormatted : true,
      bodyIsNew: false,
    }
    this.props.setNewRequestFields(requestFieldObj);
    this.props.setNewRequestHeaders(requestHeadersObj);
    this.props.setNewRequestCookies(requestCookiesObj);
    this.props.setNewRequestBody(requestBodyObj);
    // for gRPC 
    if (this.props.content && this.props.content.gRPC) {
      const streamsDeepCopy = JSON.parse(JSON.stringify(this.props.content.streamsArr));
      const contentsDeepCopy = JSON.parse(JSON.stringify(this.props.content.streamContent));
      // construct the streams obj from passed in history content & set state in store
      const requestStreamsObj = {
        streamsArr: streamsDeepCopy,
        count: this.props.content.queryArr.length,
        streamContent: contentsDeepCopy,
        selectedPackage: this.props.content.packageName,
        selectedRequest: this.props.content.rpc,
        selectedService:  this.props.content.service,
        selectedStreamingType: this.props.content.request.method,
        initialQuery: this.props.content.initialQuery,
        queryArr: this.props.content.queryArr,
        protoPath: this.props.content.protoPath,
        services: this.props.content.servicesObj,
        protoContent: this.props.content.protoContent,
      }
      this.props.setNewRequestStreams(requestStreamsObj)
      // need to place logic in callback otherwise code won't work and returns null
      this.setState({
        ...this.state
      }, () => {
        // grab the dropdown lists and set its selected value to equal what is in the history
        const dropdownService = document.getElementById('dropdownService').options;
        for (const option of dropdownService) {
          if (option.text === this.props.content.service) {
            option.selected = true;
          }
        }
        const dropdownRequest = document.getElementById('dropdownRequest').options;
        for (const option of dropdownRequest) {
          if (option.text === this.props.content.rpc) {
            option.selected = true;
          }
        }
        // update streaming type button displayed next to the URL
        document.getElementById('stream').innerText = this.props.content.request.method;
      })
    }
  }

  deleteHistory(e) {
    this.props.deleteFromHistory(this.props.content);
    historyController.deleteHistoryFromIndexedDb(e.target.id);
  }

  render() {
    return (
      <div className="history-container" onClick={this.props.focusOnForm} >
        <div className="history-text-container" onClick={this.addHistoryToNewRequest}>
          <div className="history-method">{this.props.content.request.method}
          </div>
          <div className="history-url"> {this.props.content.url}
          </div>
        </div>
        <div className='history-delete-container'>
          <div className="history-delete-button" onClick={this.deleteHistory}>
            X
          </div>
        </div>
      </div>
    )
  }
}

export default History;








/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import historyController from '../../controllers/historyController';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addHistoryToNewRequest = this.addHistoryToNewRequest.bind(this);
    this.deleteHistory = this.deleteHistory.bind(this);
  }

  addHistoryToNewRequest() {
    const requestFieldObj = {
      method: method || 'GET',
      protocol: protocol || 'http://',
      url: url || 'http://',
      graphQL: graphQL || false,
      gRPC: gRPC || false
    }
    let headerDeeperCopy;
    if (headers) {
      headerDeeperCopy = JSON.parse(JSON.stringify(headers));
      headerDeeperCopy.push({
        id: headers.length + 1,
        active: false,
        key: '',
        value: '',
      })
    }
    let cookieDeeperCopy;
    if (cookies && !/ws/.test(protocol)) {
      cookieDeeperCopy = JSON.parse(JSON.stringify(cookies));
      cookieDeeperCopy.push({
        id: cookies.length + 1,
        active: false,
        key: '',
        value: '',
      })
    }
    const requestHeadersObj = {
      headersArr: headerDeeperCopy || [],
      count: headerDeeperCopy ? headerDeeperCopy.length : 1,
    }
    const requestCookiesObj = {
      cookiesArr: cookieDeeperCopy || [],
      count: cookieDeeperCopy ? cookieDeeperCopy.length : 1,
    }
    const requestBodyObj = {
      bodyType: bodyType || 'raw',
      bodyContent: body || '',
      bodyVariables: bodyVariables || '',
      rawType: rawType || 'Text (text/plain)',
      JSONFormatted: JSONFormatted || true,
      bodyIsNew: false,
    }
    setNewRequestFields(requestFieldObj);
    setNewRequestHeaders(requestHeadersObj);
    setNewRequestCookies(requestCookiesObj);
    setNewRequestBody(requestBodyObj);
    // for gRPC 
    if (content && gRPC) {
      const streamsDeepCopy = JSON.parse(JSON.stringify(streamsArr));
      const contentsDeepCopy = JSON.parse(JSON.stringify(streamContent));
      // construct the streams obj from passed in history content & set state in store
      const requestStreamsObj = {
        streamsArr: streamsDeepCopy,
        count: queryArr.length,
        streamContent: contentsDeepCopy,
        selectedPackage: packageName,
        selectedRequest: rpc,
        selectedService:  service,
        selectedStreamingType: method,
        initialQuery,
        queryArr,
        protoPath,
        services: servicesObj,
        protoContent,
      }
      setNewRequestStreams(requestStreamsObj)
      // need to place logic in callback otherwise code won't work and returns null
      this.setState({
        ...this.state
      }, () => {
        // grab the dropdown lists and set its selected value to equal what is in the history
        const dropdownService = document.getElementById('dropdownService').options;
        for (const option of dropdownService) {
          if (option.text === service) {
            option.selected = true;
          }
        }
        const dropdownRequest = document.getElementById('dropdownRequest').options;
        for (const option of dropdownRequest) {
          if (option.text === rpc) {
            option.selected = true;
          }
        }
        // update streaming type button displayed next to the URL
        document.getElementById('stream').innerText = method;
      })
    }
  }

  deleteHistory(e) {
    deleteFromHistory(content);
    historyController.deleteHistoryFromIndexedDb(e.target.id);
  }

  render() {
    const { content, content: { request, request : { method, headers, cookies, bodyType, body, bodyVariables, 
      rawType, JSONFormatted }, protocol, url, graphQL, gRPC, streamsArr, streamContent, queryArr, packageName,
      rpc, service, initialQuery, protoPath, servicesObj, protoContent }, setNewRequestFields, setNewRequestHeaders, 
      setNewRequestCookies, setNewRequestBody, setNewRequestStreams, deleteFromHistory, focusOnForm } = this.props;
    return (
      <div className="history-container" onClick={() => focusOnForm()} >
        <div className="history-text-container" onClick={() => addHistoryToNewRequest()}>
          <div className="history-method"> {method} </div>
          <div className="history-url"> {url} </div>
        </div>
        <div className='history-delete-container'>
          <div className="history-delete-button" onClick={(e) => deleteHistory(e)}>
            X
          </div>
        </div>
      </div>
    )
  }
}

export default History;