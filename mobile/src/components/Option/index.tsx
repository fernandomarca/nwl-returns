import React from 'react';
import { ImageProps, TouchableOpacityProps, TouchableOpacity, Text, Image } from 'react-native';

import { styles } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  image: ImageProps;
}

export function Option({ title, image, ...rest }: Props) {
  return (
    <TouchableOpacity
      {...rest}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={image}
      />
      <Text
        style={styles.title}
      >{title}</Text>
    </TouchableOpacity>
  );
}