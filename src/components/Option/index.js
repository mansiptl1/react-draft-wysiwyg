/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.css';
import boldOrange from '../../../images/typ-bold-orange.svg';
import italicActive from '../../../images/typ_italic_active.svg';
import leftActive from '../../../images/typ_align_left_active.svg';
import centerActive from '../../../images/typ_align_centre_active.svg';
import rightActive from '../../../images/typ_align_right_active.svg';
import justifyActive from '../../../images/typ_align_justified_active.svg';
import sizeplusActive from '../../../images/typ_size_increase_active.svg';
import sizeminusActive from '../../../images/typ_size_decrease_active.svg';
import unlinkActive from '../../../images/ui_link_minus_active.svg';
import linkActive from '../../../images/ui_link_plus_active.svg';
import underlineActive from '../../../images/typ_underline_active.svg';

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
    src: this.props.src,
  };

  componentWillReceiveProps(nextProps) {
    const { active, value, src } = nextProps;
    switch(value) {
      case 'bold': active ? this.setOptionIcon(boldOrange) : this.setOptionIcon(src);
        break;
      case 'italic': active ? this.setOptionIcon(italicActive) : this.setOptionIcon(src);
        break;
      case 'underline': active ? this.setOptionIcon(underlineActive) : this.setOptionIcon(src);
        break;
      case 'left': active ? this.setOptionIcon(leftActive) : this.setOptionIcon(src);
        break;
      case 'center': active ? this.setOptionIcon(centerActive) : this.setOptionIcon(src);
        break;
      case 'right': active ? this.setOptionIcon(rightActive) : this.setOptionIcon(src);
        break;
      case 'justify': active ? this.setOptionIcon(justifyActive) : this.setOptionIcon(src);
        break;
      case 'unordered': active ? this.setOptionIcon(sizeplusActive) : this.setOptionIcon(src);
        break;
      case 'ordered': active ? this.setOptionIcon(sizeminusActive) : this.setOptionIcon(src);
        break;
      case 'ordered-list-item': active ? this.setOptionIcon(unlinkActive) : this.setOptionIcon(src);
        break;
      case 'unordered-list-item': active ? this.setOptionIcon(linkActive) : this.setOptionIcon(src);
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
