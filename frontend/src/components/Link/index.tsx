import React from 'react';
import Link from 'next/link';
import { linkVariants } from './variants';
import { LinkPropsTypes } from './@types/LinkProps';


const LinkComponent = ({ route, label, color}: LinkPropsTypes) => {
  return <Link href={route} className={linkVariants({color})}>{label}</Link>;
}

export default LinkComponent;