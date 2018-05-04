/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';

import { getFirstIcon } from '../../../utils/toolbar';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import Option from '../../../components/Option';
import './styles.css';

export default class LayoutComponent extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    currentState: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    defaultFontSize: undefined,
  };

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const editorStyles = window.getComputedStyle(editorElm[0]);
      let defaultFontSize = editorStyles.getPropertyValue('font-size');
      defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        defaultFontSize,
      });
    }
  }

  options: Array = ['unordered', 'ordered', 'indent', 'outdent'];

  increaseFontSize: Function = (): void => {
    const { onChange } = this.props;
    onChange('ordered');
  };

  decreaseFontSize: Function = (): void => {
    const { onChange } = this.props;
    onChange('unordered');
  };

  // todo: evaluate refactoring this code to put a loop there and in other places also in code
  // hint: it will require moving click handlers
  renderInFlatList(): Object {
    const {
      config,
      currentState: { listType },
      translations,
      indentDisabled,
      outdentDisabled,
    } = this.props;
    const { options, unordered, ordered, className } = config;
    return (
      <div className={classNames('rdw-list-wrapper', className)} aria-label="rdw-list-control">
        {options.indexOf('unordered') >= 0 && <Option
          value="unordered"
          onClick={this.decreaseFontSize}
          className={classNames(unordered.className)}
          active={listType === 'unordered'}
          title={unordered.title || translations['components.controls.list.unordered']}
          src={unordered.icon}
        >
          {/* <img
            src={unordered.icon}
            alt=""
          /> */}
        </Option>}
        {options.indexOf('ordered') >= 0 && <Option
          value="ordered"
          onClick={this.increaseFontSize}
          className={classNames(ordered.className)}
          active={listType === 'ordered'}
          title={ordered.title || translations['components.controls.list.ordered']}
          src={ordered.icon}
        >
          {/* <img
            src={ordered.icon}
            alt=""
          /> */}
        </Option>}
      </div>
    );
  }

  renderInDropDown(): Object {
    const {
      config,
      expanded,
      doCollapse,
      doExpand,
      onExpandEvent,
      onChange,
      currentState: { listType },
      translations,
    } = this.props;
    const { options, className, dropdownClassName, title } = config;
    return (
      <Dropdown
        className={classNames('rdw-list-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="rdw-list-control"
        title={title || translations['components.controls.list.list']}
      >
        <img
          src={getFirstIcon(config)}
          alt=""
        />
        { this.options
          .filter(option => options.indexOf(option) >= 0)
          .map((option, index) => (<DropdownOption
            key={index}
            value={option}
            disabled={this.props[`${option}Disabled`]}
            className={classNames('rdw-list-dropdownOption', config[option].className)}
            active={listType === option}
            title={config[option].title || translations[`components.controls.list.${option}`]}
          >
            <img
              src={config[option].icon}
              alt=""
            />
          </DropdownOption>))
        }
      </Dropdown>
    );
  }

  render(): Object {
    const { config: { inDropdown } } = this.props;
    if (inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}
