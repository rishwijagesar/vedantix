import React from 'react';
import Shell from './Shell';
import adminNavigation from '../../config/adminNavigation';

export default function AdminShell(props) {
  return React.createElement(
    Shell,
    { navigation: adminNavigation },
    props.children,
  );
}
