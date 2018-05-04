/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.css';
import boldOrange from '../../../images/typ-bold-orange.svg';

export default class Option extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.any,
    value: PropTypes.string,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    src: PropTypes.string,
  };

  state = {
    src: '',
  };

  componentWillReceiveProps(nextProps) {
    const { active, value, src } = nextProps;
    switch(value) {
      case 'bold': active ? this.setOptionIcon(boldOrange) : this.setOptionIcon(src);
        break;
      case 'italic': active ? this.setOptionIcon(src) : this.setOptionIcon(src);
        break;
      case 'underline': active ? this.setOptionIcon(src) : this.setOptionIcon(src);
        break;
      case 'left': active ? this.setOptionIcon(src) : this.setOptionIcon(src);
        break;
      case 'center': active ? this.setOptionIcon(src) : this.setOptionIcon(src);
        break;
      case 'right': active ? this.setOptionIcon(src) : this.setOptionIcon(src);
        break;
      case 'justify': active ? this.setOptionIcon(src) : this.setOptionIcon(src);
        break;
      case 'unordered': active ? this.setOptionIcon(src) : this.setOptionIcon(src);
        break;
      case 'ordered': active ? this.setOptionIcon(src) : this.setOptionIcon(src);
        break;
      case 'ordered-list-item': active ? this.setOptionIcon(src) : this.setOptionIcon(src);
        break;
      case 'unordered-list-item': active ? this.setOptionIcon(src) : this.setOptionIcon(src);
        break;
      default:
        this.setOptionIcon(src);
        break;
    }
  }

  onClick: Function = () => {
    const { disabled, onClick, value } = this.props;
    if (!disabled) {
      onClick(value);
    }
  };

  setOptionIcon(src: string) {
    this.setState({
      src
    });
  }

  render() {
    const { children, className, activeClassName, active, disabled, title } = this.props;
    return (
      <div
        className={classNames(
          'rdw-option-wrapper',
          className,
          {
            [`rdw-option-active ${activeClassName}`]: active,
            'rdw-option-disabled': disabled,
          },
        )}
        onClick={this.onClick}
        aria-selected={active}
        title={title}
      >
        <img
          alt=""
          src={this.state.src}
        />
        {children}
     </div>
    );
  }
}
