/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.css';

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
  };

  onClick: Function = () => {
    const { disabled, onClick, value } = this.props;
    console.log(value);
    if (!disabled) {
      onClick(value);
    }
  };

  // onToggle: Function = () => {
  //   const { disabled, value} = this.props;
  //   switch(value) {
  //     case: 'bold'
       
  //   }
  // }

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
        {children}    
     </div>
    );
  }
}
