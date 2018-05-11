/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';
import { changeDepth, getBlockBeforeSelectedBlock,
  getSelectedBlock, isListBlock, toggleCustomInlineStyle,
  getSelectionCustomInlineStyle } from 'draftjs-utils';

import LayoutComponent from './Component';

export default class List extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    expanded: false,
    currentBlock: undefined,
    currentFontSize: undefined,
  };

  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({ currentBlock: getSelectedBlock(editorState) });
    }
    const { currentFontSize } = this.state;
    this.setState({
      currentFontSize:
        getSelectionCustomInlineStyle(editorState, ['FONTSIZE']).FONTSIZE,
    });
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      const currentBlock = getSelectedBlock(properties.editorState);
      this.setState({ currentBlock: getSelectedBlock(properties.editorState) });
      this.setState({
        currentFontSize:
          getSelectionCustomInlineStyle(properties.editorState, ['FONTSIZE']).FONTSIZE,
      });
    }
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  onExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  onChange: Function = (value: string , fontSize: Number): void => {
    if (value === 'unordered') {
      this.toggleBlockType1(value);
    } else if (value === 'ordered') {
      this.toggleBlockType2(value);
    } else if (value === 'indent') {
      this.adjustDepth(1);
    } else {
      this.adjustDepth(-1);
    }
  };

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  }

  doExpand: Function = (): void => {
    this.setState({
      expanded: true,
    });
  };

  doCollapse: Function = (): void => {
    this.setState({
      expanded: false,
    });
  };

  toggleBlockType1: Function = (): void => {
    const { editorState, onChange } = this.props;
    const { currentFontSize } = this.state;
    this.setState({
      currentFontSize:
        getSelectionCustomInlineStyle(editorState, ['FONTSIZE']).FONTSIZE,
    });
    let fontSize = currentFontSize && Number(currentFontSize.substring(9));
    console.log(fontSize);
    if (fontSize === undefined || fontSize === 10 || fontSize === 20)
    {
      fontSize = 30;
    }
    else {
      fontSize = 20;
    }
    this.forceUpdate();
    console.log(fontSize);
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontSize',
      fontSize,
    );
    if (newState) {
      onChange(newState);
    }
    console.log('in main index');
  };

  toggleBlockType2: Function = (): void => {
    const { editorState, onChange } = this.props;
    const { currentFontSize } = this.state;
    this.setState({
      currentFontSize:
        getSelectionCustomInlineStyle(editorState, ['FONTSIZE']).FONTSIZE,
    });
    let fontSize = currentFontSize && Number(currentFontSize.substring(9));
    console.log(fontSize);
    if (fontSize === undefined || fontSize === 30 || fontSize === 20)
    {
      fontSize = 10;
    }
    else {
      fontSize = 20;
    }
    this.forceUpdate();
    console.log(fontSize);
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontSize',
      fontSize,
    );
    if (newState) {
      onChange(newState);
    }
    
    console.log('in main index');
  };

  adjustDepth: Function = (adjustment): void => {
    const { onChange, editorState } = this.props;
    const newState = changeDepth(
      editorState,
      adjustment,
      4,
    );
    if (newState) {
      onChange(newState);
    }
  };

  isIndentDisabled = () => {
    const { editorState } = this.props;
    const { currentBlock } = this.state;
    const previousBlock = getBlockBeforeSelectedBlock(editorState);
    if (!previousBlock ||
      !isListBlock(currentBlock) ||
      (previousBlock.get('type') !== currentBlock.get('type')) ||
      (previousBlock.get('depth') < currentBlock.get('depth'))
    ) {
      return true;
    }
    return false;
  }

  isOutdentDisabled = () => {
    const { currentBlock } = this.state;
    return !currentBlock || !isListBlock(currentBlock) || currentBlock.get('depth') <= 0;
  }

  render(): Object {
    const { config, translations } = this.props;
    const { expanded, currentBlock, currentFontSize } = this.state;
    const ListComponent = config.component || LayoutComponent;
    let listType;
    if ((currentFontSize && Number(currentFontSize.substring(9))) === 30) {
      listType = 'unordered';
    } else if ((currentFontSize && Number(currentFontSize.substring(9))) === 10) {
      listType = 'ordered';
    }
    const indentDisabled = this.isIndentDisabled();
    const outdentDisabled = this.isOutdentDisabled();
    return (
      <ListComponent
        config={config}
        translations={translations}
        currentState={{ listType }}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        onChange={this.onChange}
        indentDisabled={indentDisabled}
        outdentDisabled={outdentDisabled}
      />
    );
  }
}
