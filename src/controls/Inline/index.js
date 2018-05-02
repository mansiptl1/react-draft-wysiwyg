/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSelectionInlineStyle } from 'draftjs-utils';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import { forEach } from '../../utils/common';
import boldOrange from './Component/typ-bold-orange.svg';
import LayoutComponent from './Component';
import bold from '../../../images/typ-bold.svg';
import italic from '../../../images/typ-italic.svg';
import underline from '../../../images/typ-underline.svg';

export default class Inline extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    currentStyles: {},
  };

  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentStyles: this.changeKeys(getSelectionInlineStyle(editorState)),
      });
    }
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentStyles: this.changeKeys(getSelectionInlineStyle(properties.editorState)),
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

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  }

  toggleBold: Function = (style: string): void => {
    if (this.state.currentStyles.bold)
    {
      this.props.config[style].icon = bold;
    }
    else {
      this.props.config[style].icon = boldOrange;
    }  
  }

  toggleItalic: Function = (style: string): void => {
    if (this.state.currentStyles.italic)
    {
      this.props.config[style].icon = italic;
    }
    else {
      this.props.config[style].icon = italic;
    }  
  }

  toggleUnderline: Function = (style: string): void => {
    if (this.state.currentStyles.underline)
    {
      this.props.config[style].icon = underline;
    }
    else {
      this.props.config[style].icon = underline;
    }  
  }

  toggleInlineStyle: Function = (style: string): void => {
    console.log('under inline toggle:', this.state.currentStyles);
    switch (style) {
      case 'bold':
        this.toggleBold(style);
        break;
      case 'italic':
        this.toggleItalic(style);
        break;
      case 'underline':
        this.toggleUnderline(style);
        break;
      default: break;
    }
    const newStyle = style === 'monospace' ? 'CODE' : style.toUpperCase();
    const { editorState, onChange } = this.props;
    let newState = RichUtils.toggleInlineStyle(
      editorState,
      newStyle,
    );

    if (style === 'subscript' || style === 'superscript') {
      // const { config } = this.props;
      const removeStyle = style === 'subscript' ? 'SUPERSCRIPT' : 'SUBSCRIPT';
      const contentState = Modifier.removeInlineStyle(
        newState.getCurrentContent(),
        newState.getSelection(),
        removeStyle,
      );
      newState = EditorState.push(newState, contentState, 'change-inline-style');
    }
    if (newState) {
      onChange(newState);
    }
    console.log('{config[style].icon}', this.props.config[style].icon);
  };

  changeKeys = (style) => {
    if (style) {
      const st = {};
      forEach(style, (key, value) => {
        st[key === 'CODE' ? 'monospace' : key.toLowerCase()] = value;
      });
      return st;
    }
    return undefined;
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

  render(): Object {
    const { config, translations } = this.props;
    const { expanded, currentStyles } = this.state;
    const InlineComponent = config.component || LayoutComponent;
    return (
      <InlineComponent
        config={config}
        translations={translations}
        currentState={currentStyles}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        onChange={this.toggleInlineStyle}
      />
    );
  }
}
// make subscript less low
